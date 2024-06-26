const CubeTimer = require('./Cube')
const ResultTree = require('./timeResultTree')
const Solve = require('./solve')

import {
  ScrambleGenerator2x2, ScrambleGenerator3x3, ScrambleGenerator4x4,
  ScrambleGenerator5x5, ScrambleGenerator6x6, ScrambleGenerator7x7,
  ScrambleGeneratorClock,
  ScrambleGeneratorMegaminx,
  ScrambleGeneratorPyraminx, ScrambleGeneratorSkewb, ScrambleGeneratorSquare1
} from "./scrambler"
import { CUBE_2X2X2, CUBE_3X3X3, CUBE_4X4X4, CUBE_5X5X5, CUBE_6X6X6, CUBE_7X7X7, CUBE_CLOCK, CUBE_LABEL, CUBE_MEGAMINX, CUBE_PYRAMINX, CUBE_SKEWB, CUBE_SQUARE, dnfTime } from "./constant"

var msDisplay = document.querySelector("#milliSec");
var secDisplay = document.querySelector("#second");
var minDisplay = document.querySelector("#minute");
var minColon = document.querySelector("#minColon");
var resutlTable = document.querySelector(".resultTable")
var eventSelected = document.querySelector("#eventSelected");
var puzzle = document.querySelector("#puzzle");
var scramble = document.querySelector("#scramble");
var clearAll = document.querySelector("#clear");
var scrambleGeneratorEl = document.getElementById("scrambleGenerator")

var minAo5 = document.querySelector(".minAo5");
var minAo12 = document.querySelector(".minAo12");
var meanTime = document.querySelector(".meanTime");


var puzzleSelected;
// new variables stats
var averageOf5 = document.getElementById("ao5");
var averageOf12 = document.getElementById("ao12");
var bestOut = document.getElementById("best");
var numSolvesOut = document.querySelector(".solveNum");

var currentScramble = ""

// ends here

scrambleGenerator(true)

var running = false;
var milliSec = 0;
var second = 0;
var minute = 0;
var cs = 0;

// interval for timer
let interval;

var currentScramble = ""

var cubeTimer;

var resultTree = new ResultTree()

var bestSingle;

function timer() {
  milliSec++;
  cs++; //counts time in centiseconds
  msDisplay.textContent = milliSec;

  //once milliseconds === 100 we start increasing sec

  if (milliSec >= 100) {
    milliSec = 0;
    second++;

    //once sec > 59 we increase minute

    if (second > 59) {
      second = 0;
      minute++;
      minColon.innerHTML = ":";
      minDisplay.innerHTML = minute;
    }

    //for single digit seceonds we give an additional zero

    if (second <= 9 && minute > 0) {
      second = "0" + second;
    }
    secDisplay.innerHTML = second;
  }

  // for single digit milliseconds we give an additional second

  if (milliSec <= 9) {
    milliSec = "0" + milliSec;
    msDisplay.innerHTML = milliSec;
  }
}

//.............timer function ends here..................
//.......................................................
//.............Run function starts here..................

function run() {
  if (!running) {
    milliSec = 0;
    second = 0;
    minute = 0;
    cs = 0;
    secDisplay.innerHTML = "0";
    minDisplay.innerHTML = "";
    minColon.innerHTML = "";
    running = true;

    interval = setInterval(timer, 10);

  } else if (running) {
    running = false;
    clearInterval(interval);

    createResultList()

    calculateStats();
    creatTimeResult(cubeTimer.timeList.length, false);
    storeValue();
    scrambleGenerator(false)
  }
}

function creatTimeResult(no, isFromStoreValue) {
  let trEl = document.createElement("tr")
  let noThEl = document.createElement("th")
  noThEl.innerHTML = no

  trEl.appendChild(noThEl)

  let timeThEl = document.createElement("th")
  timeThEl.className = "solve"
  timeThEl.id = no

  if (isFromStoreValue) {

    if (cubeTimer.timeList[no - 1].isPlusTwo) timeThEl.innerHTML = cubeTimer.timeList[no - 1].time.toFixed(2) + "+"
    else if (cubeTimer.timeList[no - 1].isDNF) timeThEl.innerHTML = "DNF(" + cubeTimer.timeList[no - 1].time.toFixed(2) + ")"
    else timeThEl.innerHTML = cubeTimer.timeList[no - 1].time.toFixed(2)

  } else {
    timeThEl.innerHTML = " " + displayTime.innerText.split(" ").join("") + " "
  }

  timeThEl.addEventListener("click", function (e) {
    createResultDialog(e.target.id - 1)
  })
  trEl.appendChild(timeThEl)

  let ao5thEl = document.createElement("th")
  ao5thEl.className = "solve"
  if (no >= 5) {
    cubeTimer.computeAverage(5, no - 1)
    ao5thEl.id = cubeTimer.averageOf5 !== "DNF" ? cubeTimer.averageOf5.toFixed(2) : "DNF"
    ao5thEl.innerHTML = ao5thEl.id
    ao5thEl.addEventListener("click", function (e) {
      createAverageDialog(ao5thEl.id, no - 1, 5)
    })

    minAo5.innerHTML = "Best Ao5: " + cubeTimer.bestAo5[0].toFixed(2)
    minAo5.id = cubeTimer.bestAo5[1]
    minAo5.addEventListener("click", function (e) {
      createAverageDialog(cubeTimer.bestAo5[0], cubeTimer.bestAo5[1], 5)
    })

  } else {
    ao5thEl.innerHTML = "-"
  }
  trEl.appendChild(ao5thEl)

  let ao12thEl = document.createElement("th")
  ao12thEl.className = "solve"
  if (no >= 12) {
    cubeTimer.computeAverage(12, no - 1)
    ao12thEl.id = cubeTimer.averageOf12 !== "DNF" ? cubeTimer.averageOf12.toFixed(2) : "DNF"
    ao12thEl.innerHTML = ao12thEl.id
    ao12thEl.addEventListener("click", function (e) {
      createAverageDialog(ao12thEl.id, no - 1, 12)
    })

    minAo12.innerHTML = "Best Ao12: " + cubeTimer.bestAo12[0].toFixed(2)
    minAo12.id = cubeTimer.bestAo12[1]
    minAo12.addEventListener("click", function (e) {
      createAverageDialog(cubeTimer.bestAo12[0], cubeTimer.bestAo12[1], 12)
    })

  } else {
    ao12thEl.innerHTML = "-"
  }
  trEl.appendChild(ao12thEl)

  resutlTable.insertBefore(trEl, resutlTable.children[1])

}

function createAverageDialog(avgTime, id, avgCounting) {
  let min = cubeTimer.timeList[id].time
  let minIndex = id
  let max = cubeTimer.timeList[id].time
  let maxIndex = id

  let counting = 1

  for (let i = id - avgCounting + 1; i < id; i++) {

    if (cubeTimer.timeList[i].isDNF || cubeTimer.timeList[i].time >= max) {
      max = cubeTimer.timeList[i].isDNF ? dnfTime : cubeTimer.timeList[i].time
      maxIndex = i
    }

    if (cubeTimer.timeList[i].time <= min) {
      min = cubeTimer.timeList[i].time
      minIndex = i
    }
  }

  let resultDisplayText = ""
  for (let i = id - 4; i <= id; i++) {
    let displayTime = cubeTimer.timeList[i].time.toFixed(2)
    if (cubeTimer.timeList[i].isPlusTwo) {
      displayTime = cubeTimer.timeList[i].time.toFixed(2) + "+"
    } else if (cubeTimer.timeList[i].isDNF) {
      displayTime = "DNF(" + cubeTimer.timeList[i].time.toFixed(2) + ")"
      resultDisplayText += counting.toString() + ".\u00A0\u00A0(" + displayTime + ")\u00A0\u00A0\u00A0\u00A0\u00A0"
      resultDisplayText += cubeTimer.timeList[i].scramble + "\n\n"
      counting++
      continue
    }

    if (i === minIndex || i === maxIndex) {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0(" + displayTime + ")\u00A0\u00A0\u00A0\u00A0\u00A0"
    } else {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0" + displayTime + "\u00A0\u00A0\u00A0\u00A0\u00A0"
    }
    resultDisplayText += cubeTimer.timeList[i].scramble + "\n\n"
    counting++
  }

  swal({
    title: avgTime === "DNF" ? "DNF" : parseFloat(avgTime).toFixed(2),
    text: resultDisplayText,
    buttons: { cancel: "Cancel" }
  }).then(() => {
    swal.close()
  })

}

function createResultDialog(id) {
  let thisTime = cubeTimer.timeList[id]
  let displayTime = thisTime.time.toFixed(2)
  if (thisTime.isPlusTwo) displayTime += "+"
  else if (thisTime.isDNF) displayTime = "DNF(" + thisTime.time.toFixed(2) + ")"
  swal({
    title: displayTime,
    text: thisTime.scramble,
    buttons: {
      delete: "Delete",
      plusTwo: "+2",
      dnf: "Make this DNF",
      cancel: "Cancel"
    }
  })
    .then((value) => {
      switch (value) {
        case "delete":
          swal({
            title: "Confirm ?",
            text: "Are you sure to delete this result ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                handleAfterDeleteResult(id);
                storeValue();
              }
            });
          break;
        case "plusTwo":
          if (!thisTime.isPlusTwo) {
            if (thisTime.isDNF) {
              thisTime.isDNF = false
            }
            cubeTimer.timeList[id].time += 2;
            handleAfterPlusTwo(id);
            storeValue()
          }
          break;

        case "dnf":
          if (!thisTime.isDNF) {
            if (thisTime.isPlusTwo) {
              thisTime.isPlusTwo = false
              thisTime.time -= 2
            }
            handleDNF(id)
            storeValue()
          }
          break;

        default:
          swal.close();
      }
    })
}

function handleDNF(id) {
  let numSolves = cubeTimer.timeList.length
  resutlTable.rows[numSolves - id].cells[1].innerHTML = "DNF(" + cubeTimer.timeList[id].time.toFixed(2) + ")"
  cubeTimer.timeList[id].isDNF = true

  handleAfterPenalty()
  reCalculateAverage(id, numSolves)
  currentAverage(numSolves)
}

function reCalculateAverage(id, numSolves) {
  for (let i = id - 11; i <= id + 11; i++) {
    if (cubeTimer.timeList[i]) {
      let cellAo5 = resutlTable.rows[numSolves - i].cells[2]
      let cellAo12 = resutlTable.rows[numSolves - i].cells[3]
      if (i >= 4) {
        cubeTimer.computeAverage(5, i)
        cellAo5.innerHTML = cubeTimer.averageOf5 !== "DNF" ? cubeTimer.averageOf5.toFixed(2) : "DNF"
        cellAo5.removeEventListener("click", createAverageDialog, false);
        cellAo5.addEventListener("click", function () {
          createAverageDialog(cubeTimer.averageOf5, i, 5)
        })
      }
      if (i >= 11) {
        cubeTimer.computeAverage(12, i)
        cellAo12.innerHTML = cubeTimer.averageOf12 !== "DNF" ? cubeTimer.averageOf12.toFixed(2) : "DNF"
        cellAo12.removeEventListener("click", createAverageDialog, false);
        cellAo12.addEventListener("click", function () {
          createAverageDialog(cubeTimer.averageOf12, i, 12)
        })
      }
    }
  }
}

function convertStringToTime(timeAsString) {
  let minutes = timeAsString.split(":");
  var seconds = minutes[minutes.length - 1]

  var minute = minutes.length == 2 ? parseFloat(minutes[0]) : 0

  return minute * parseFloat(60) + parseFloat(seconds)
}

function createResultList() {
  let resultTime = displayTime.innerText.split(" ").join("")
  let solveInfo = new Solve(convertStringToTime(resultTime), currentScramble, false, false)
  cubeTimer.timeList.push(solveInfo)
  resultTree.insert(solveInfo)
  if (cubeTimer.timeList.length === 1) {
    bestSingle = solveInfo
  } else {
    if (solveInfo.time < bestSingle.time) {
      bestSingle = solveInfo
      swal("Congratulations", "You just set a new PB.", "success", {
        buttons: { ok: "OK" }
      }).then(() => {
        swal.close()
      });
    }
  }
}

function scrambleGenerator(isNewSession) {
  switch (puzzleSelected) {
    case CUBE_2X2X2:
      currentScramble = ScrambleGenerator2x2();
      break;
    case CUBE_3X3X3:
      currentScramble = ScrambleGenerator3x3();
      break;
    case CUBE_4X4X4:
      currentScramble = ScrambleGenerator4x4();
      break;
    case CUBE_5X5X5:
      currentScramble = ScrambleGenerator5x5();
      break;
    case CUBE_6X6X6:
      currentScramble = ScrambleGenerator6x6();
      break;
    case CUBE_7X7X7:
      currentScramble = ScrambleGenerator7x7();
      break;
    case CUBE_PYRAMINX:
      currentScramble = ScrambleGeneratorPyraminx();
      break;
    case CUBE_SKEWB:
      currentScramble = ScrambleGeneratorSkewb();
      break;
    case CUBE_MEGAMINX:
      currentScramble = ScrambleGeneratorMegaminx()
      break;
    case CUBE_SQUARE:
      currentScramble = ScrambleGeneratorSquare1()
      break;
    case CUBE_CLOCK:
      currentScramble = ScrambleGeneratorClock()
      break;
    default:
      currentScramble = ScrambleGenerator3x3();
      puzzleSelected = CUBE_3X3X3
  }
  drawScramble(currentScramble)
  if (isNewSession) {
    cubeTimer = newCuberTimer()
    if (localStorage) {
      viewStoreValue(puzzleSelected)
    }
  }
}

function drawScramble(scram) {
  scrambleGeneratorEl.setAttribute("event", puzzleSelected)
  scrambleGeneratorEl.setAttribute("scramble", scram.replaceAll("&nbsp;", " "))
  scrambleGeneratorEl.setAttribute("visualization", "2D")
}

puzzle.addEventListener("change", function () {
  storeValue();
  puzzleSelected = puzzle.value;
  cubeTimer = newCuberTimer()
  clearTimes()
  if (localStorage) {
    viewStoreValue(puzzleSelected)
  }
  switch (puzzleSelected) {
    case CUBE_2X2X2:
      currentScramble = ScrambleGenerator2x2()
      break;
    case CUBE_3X3X3:
      currentScramble = ScrambleGenerator3x3()
      break;
    case CUBE_4X4X4:
      currentScramble = ScrambleGenerator4x4()
      break;
    case CUBE_5X5X5:
      currentScramble = ScrambleGenerator5x5()
      break;
    case CUBE_6X6X6:
      currentScramble = ScrambleGenerator6x6()
      break;
    case CUBE_7X7X7:
      currentScramble = ScrambleGenerator7x7()
      break;
    case CUBE_PYRAMINX:
      currentScramble = ScrambleGeneratorPyraminx()
      break;
    case CUBE_MEGAMINX:
      currentScramble = ScrambleGeneratorMegaminx()
      break;
    case CUBE_SQUARE:
      currentScramble = ScrambleGeneratorSquare1()
      break;
    case CUBE_SKEWB:
      currentScramble = ScrambleGeneratorSkewb();
      break;
    case CUBE_CLOCK:
      currentScramble = ScrambleGeneratorClock()
      break;
  }

  eventSelected.textContent = CUBE_LABEL[puzzleSelected]
  drawScramble(currentScramble)

  document.querySelector(".display-time-container").focus()
});

clearAll.addEventListener("click", function () {
  if (cubeTimer.timeList.length > 0) {
    swal({
      title: "Confirm ?",
      text: "Are you sure to clear all your " + CUBE_LABEL[puzzleSelected] + " result ?",
      buttons: {
        delete: "Delete",
        cancel: "Cancel"
      },
      icon: "warning",
      dangerMode: true
    })
      .then((value) => {
        switch (value) {
          case "delete":
            cubeTimer = newCuberTimer()
            storeValue()
            clearTimes()
            break;
          default:
            swal.close();
        }
      })
  }
});

// clear times function
function clearTimes() {
  resutlTable.innerHTML = `<thead>
  <th>No.</th>
  <th>time</th>
  <th>ao5</th>
  <th>ao12</th>
</thead>`
  numSolvesOut.innerHTML = "Solves: ";
  bestOut.innerHTML = "Best: ";
  averageOf12.innerHTML = "Ao12: ";
  averageOf5.innerHTML = "Ao5: ";
  minAo5.innerHTML = "Best Ao5: "
  minAo12.innerHTML = "Best Ao12: "
}

function handleAfterPenalty() {
  if (cubeTimer.timeList.length > 0) {
    resultTree.removeAll(cubeTimer.timeList[0])
    for (let re of cubeTimer.timeList) {
      resultTree.insert(re)
    }
    bestSingle = resultTree.findMinNode(cubeTimer.timeList[0])
    createBestSingleElement()
  }
}

function createBestSingleElement() {
  if (cubeTimer.timeList.length > 0) {
    bestOut.innerHTML = "Best: " + formatTime(bestSingle.time)
    bestOut.addEventListener("click", function () {
      swal({
        title: bestSingle.time.toFixed(2),
        text: bestSingle.scramble,
        buttons: {
          cancel: "Cancel"
        }
      })
        .then(() => {
          swal.close();
        })
    })
  }
}

function handleAfterDeleteResult(id) {
  cubeTimer.timeList.splice(id, 1)
  let numSolves = cubeTimer.timeList.length

  resutlTable.deleteRow(numSolves + 1 - id)

  for (let i = 1, row; row = resutlTable.rows[i], i <= numSolves - id; i++) {
    row.cells[1].id = row.cells[1].id - 1
    row.cells[0].innerHTML = row.cells[1].id

    if (numSolves >= 12) {
      cubeTimer.computeAverage(12, numSolves - i)
      row.cells[3].innerHTML = cubeTimer.averageOf12.toFixed(2)
      row.cells[3].removeEventListener("click", createAverageDialog, false);
      row.cells[3].addEventListener("click", function () {
        createAverageDialog(cubeTimer.averageOf12, numSolves - i, 12)
      })
    } else if (numSolves >= 5) {
      cubeTimer.computeAverage(5, numSolves - i)
      row.cells[2].innerHTML = cubeTimer.averageOf5.toFixed(2)
      row.cells[2].removeEventListener("click", createAverageDialog, false);
      row.cells[2].addEventListener("click", function () {
        createAverageDialog(cubeTimer.averageOf5, numSolves - i, 5)
      })
      row.cells[3].innerHTML = "-"
      row.cells[3].removeEventListener("click", createAverageDialog, false);
    } else {
      row.cells[2].innerHTML = "-"
      row.cells[3].innerHTML = "-"
      row.cells[3].removeEventListener("click", createAverageDialog, false);
      row.cells[2].removeEventListener("click", createAverageDialog, false);
    }

  }

  numSolvesOut.innerHTML = "Solves: " + numSolves;

  handleAfterPenalty()
  currentAverage(numSolves)
}

function handleAfterPlusTwo(id) {
  let numSolves = cubeTimer.timeList.length
  resutlTable.rows[numSolves - id].cells[1].innerHTML = cubeTimer.timeList[id].time.toFixed(2) + "+"
  cubeTimer.timeList[id].isPlusTwo = true

  handleAfterPenalty()
  reCalculateAverage(id, numSolves)
  currentAverage(numSolves)
}

function currentAverage(numSolves) {
  averageOf5.innerHTML = "Ao5: "
  averageOf12.innerHTML = "Ao12: "
  if (numSolves >= 5) {
    cubeTimer.computeAverage(5, numSolves - 1)
    averageOf5.innerHTML += cubeTimer.averageOf5 !== "DNF" ? formatTime(cubeTimer.averageOf5) : "DNF"
  }
  if (numSolves >= 12) {
    cubeTimer.computeAverage(12, numSolves - 1)
    averageOf12.innerHTML += cubeTimer.averageOf12 !== "DNF" ? formatTime(cubeTimer.averageOf12) : "DNF"
  }
}

//stats
function calculateStats() {
  let numSolves = cubeTimer.timeList.length
  numSolvesOut.innerHTML = "Solves: " + numSolves;

  createBestSingleElement()
  currentAverage(numSolves)
}

function formatTime(t) {
  //m = minute, s = second, c = centisecond
  var m = ~~(t / 60)
  var s = Math.round((t - 60 * m) * 100) / 100
  var out = ""

  if (m >= 1) {
    out = m.toString() + ":" + s.toString()
  } else {
    out = s.toString()
  }

  if (Number.isInteger(s)) out += ".00"

  return out;
}

document.addEventListener("keydown", (e) => {
  let popup = document.getElementsByClassName("swal-overlay--show-modal")
  if (e.code === "Space" && popup.length === 0) {
    displayTime.style.color = "brown"
  }
});

document.addEventListener("keyup", (e) => {
  let popup = document.getElementsByClassName("swal-overlay--show-modal")
  if (e.code === "Space" && popup.length === 0) {
    displayTime.style.color = ""
    currentScramble = scramble.innerText
    run();
  }
});

function storeValue() {
  localStorage.setItem(puzzleSelected, cubeTimer.toJson())
}

function viewStoreValue(puzzleName) {
  var storeResult = localStorage.getItem(puzzleName)
  if (storeResult) {
    cubeTimer = fromJson(storeResult)
    resultTree = new ResultTree()
    handleAfterPenalty()

    numSolvesOut.innerHTML = "Solves: " + cubeTimer.timeList.length;
    if (cubeTimer.averageOf12 > 0) averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12);
    if (cubeTimer.averageOf5 > 0) averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5);

    for (let i = 0; i < cubeTimer.timeList.length; i++) {
      creatTimeResult(i + 1, true)
    }
  }
}

function newCuberTimer() {
  return new CubeTimer(puzzleSelected, [], 0, 0, new ResultTree())
}

function fromJson(jData) {
  var data = JSON.parse(jData)
  return new CubeTimer(
    data.cubeName,
    data.timeList,
    data.averageOf5,
    data.averageOf12,
    data.resultTree
  )
}

