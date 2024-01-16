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
  timeThEl.innerHTML = isFromStoreValue ? cubeTimer.timeList[no - 1].time.toFixed(2) : " " + displayTime.innerText.split(" ").join("") + " "
  timeThEl.addEventListener("click", function (e) {
    createResultDialog(e.target.id - 1)
  })
  trEl.appendChild(timeThEl)

  let ao5thEl = document.createElement("th")
  ao5thEl.className = "solve"
  if (no >= 5) {
    cubeTimer.computeAverage(5, no - 1)
    ao5thEl.id = cubeTimer.averageOf5.toFixed(2)
    ao5thEl.innerHTML = ao5thEl.id
    ao5thEl.addEventListener("click", function (e) {
      createAo5Dialog(ao5thEl.id, no - 1)
    })

    minAo5.innerHTML = "Best Ao5: " + cubeTimer.bestAo5[0].toFixed(2)
    minAo5.id = cubeTimer.bestAo5[1]
    minAo5.addEventListener("click", function (e) {
      createAo5Dialog(cubeTimer.bestAo5[0], cubeTimer.bestAo5[1])
    })

  } else {
    ao5thEl.innerHTML = "-"
  }
  trEl.appendChild(ao5thEl)

  let ao12thEl = document.createElement("th")
  ao12thEl.className = "solve"
  if (no >= 12) {
    cubeTimer.computeAverage(12, no - 1)
    ao12thEl.id = cubeTimer.averageOf12.toFixed(2)
    ao12thEl.innerHTML = ao12thEl.id
    ao12thEl.addEventListener("click", function (e) {
      createAo12Dialog(ao12thEl.id, no - 1)
    })

    minAo12.innerHTML = "Best Ao12: " + cubeTimer.bestAo12[0].toFixed(2)
    minAo12.id = cubeTimer.bestAo12[1]
    minAo12.addEventListener("click", function (e) {
      createAo12Dialog(cubeTimer.bestAo12[0], cubeTimer.bestAo12[1])
    })

  } else {
    ao12thEl.innerHTML = "-"
  }
  trEl.appendChild(ao12thEl)

  resutlTable.insertBefore(trEl, resutlTable.children[1])

}

function createAo12Dialog(avgTime, id) {
  let min = cubeTimer.timeList[id].time
  let minIndex = id
  let max = cubeTimer.timeList[id].time
  let maxIndex = id

  let counting = 1

  for (let i = id - 11; i < id; i++) {
    if (cubeTimer.timeList[i].time <= min) {
      min = cubeTimer.timeList[i].time
      minIndex = i
    }

    if (cubeTimer.timeList[i].time >= max) {
      max = cubeTimer.timeList[i].time
      maxIndex = i
    }
  }

  let resultDisplayText = ""
  for (let i = id - 11; i <= id; i++) {
    if (i === minIndex || i === maxIndex) {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0(" + cubeTimer.timeList[i].time.toFixed(2) + ")\u00A0\u00A0\u00A0\u00A0\u00A0"
    } else {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0" + cubeTimer.timeList[i].time.toFixed(2) + "\u00A0\u00A0\u00A0\u00A0\u00A0"
    }
    resultDisplayText += cubeTimer.timeList[i].scramble + "\n\n"
    counting++
  }

  swal({
    title: avgTime,
    text: resultDisplayText,
    buttons: { cancel: "Cancel" }
  }).then(() => {
    swal.close()
  })
}

function createAo5Dialog(avgTime, id) {
  let min = cubeTimer.timeList[id].time
  let minIndex = id
  let max = cubeTimer.timeList[id].time
  let maxIndex = id

  let counting = 1

  for (let i = id - 4; i < id; i++) {
    if (cubeTimer.timeList[i].time <= min) {
      min = cubeTimer.timeList[i].time
      minIndex = i
    }

    if (cubeTimer.timeList[i].time >= max) {
      max = cubeTimer.timeList[i].time
      maxIndex = i
    }
  }

  let resultDisplayText = ""
  for (let i = id - 4; i <= id; i++) {
    if (i === minIndex || i === maxIndex) {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0(" + cubeTimer.timeList[i].time.toFixed(2) + ")\u00A0\u00A0\u00A0\u00A0\u00A0"
    } else {
      resultDisplayText += counting.toString() + ".\u00A0\u00A0" + cubeTimer.timeList[i].time.toFixed(2) + "\u00A0\u00A0\u00A0\u00A0\u00A0"
    }
    resultDisplayText += cubeTimer.timeList[i].scramble + "\n\n"
    counting++
  }

  swal({
    title: avgTime,
    text: resultDisplayText,
    buttons: { cancel: "Cancel" }
  }).then(() => {
    swal.close()
  })

}

function createResultDialog(id) {
  var thisTime = cubeTimer.timeList[id].time
  swal({
    title: thisTime.toFixed(2),
    text: cubeTimer.timeList[id].scramble,
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
          cubeTimer.timeList[id].time += 2;
          handleAfterPlusTwo(id);
          storeValue()
          break;

        default:
          swal.close();
      }
    })
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
  scrambleGeneratorEl.setAttribute("scramble", scram)
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
  }

  eventSelected.textContent = CUBE_LABEL[puzzleSelected]
  drawScramble(currentScramble)
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
}

function handleAfterDeleteResult(id) {
  cubeTimer.timeList.splice(id, 1)
  let numSolves = cubeTimer.timeList.length

  if (id === cubeTimer.bestStackTraceIndex[0]) {
    cubeTimer.bestStackTraceIndex.shift()
    bestOut.innerHTML = "Best: " + formatTime(cubeTimer.timeList[cubeTimer.bestStackTraceIndex[0]].time)
  }

  resutlTable.deleteRow(numSolves + 1 - id)

  for (let i = 1, row; row = resutlTable.rows[i], i <= numSolves - id; i++) {
    row.cells[1].id = row.cells[1].id - 1
    row.cells[0].innerHTML = row.cells[1].id

    if (numSolves >= 12) {
      cubeTimer.computeAverage(12, numSolves - i)
      row.cells[3].innerHTML = cubeTimer.averageOf12.toFixed(2)
      row.cells[3].removeEventListener("click", createAo12Dialog, false);
      row.cells[3].addEventListener("click", function () {
        createAo12Dialog(cubeTimer.averageOf12.toFixed(2), numSolves - i)
      })
    } else if (numSolves >= 5) {
      cubeTimer.computeAverage(5, numSolves - i)
      row.cells[2].innerHTML = cubeTimer.averageOf5.toFixed(2)
      row.cells[2].removeEventListener("click", createAo5Dialog, false);
      row.cells[2].addEventListener("click", function () {
        createAo5Dialog(cubeTimer.averageOf5.toFixed(2), numSolves - i)
      })
      row.cells[3].innerHTML = "-"
      row.cells[3].removeEventListener("click", createAo12Dialog, false);
    } else {
      row.cells[2].innerHTML = "-"
      row.cells[3].innerHTML = "-"
      row.cells[3].removeEventListener("click", createAo12Dialog, false);
      row.cells[2].removeEventListener("click", createAo5Dialog, false);
    }

  }

  numSolvesOut.innerHTML = "Solves: " + numSolves;

  if (numSolves >= 5) {
    cubeTimer.computeAverage(5, numSolves - 1)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (numSolves >= 12) {
    cubeTimer.computeAverage(12, numSolves - 1)
    averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12)
  }
}

//stats
function calculateStats() {
  let numSolves = cubeTimer.timeList.length
  numSolvesOut.innerHTML = "Solves: " + numSolves;

  if (numSolves === 1) {
    cubeTimer.bestStackTraceIndex.unshift(0)
  } else {
    if (cubeTimer.timeList[numSolves - 1].time < cubeTimer.timeList[cubeTimer.bestStackTraceIndex[0]].time) {
      cubeTimer.bestStackTraceIndex.unshift(numSolves - 1)
      if (numSolves > 1) {
        swal("Congratulations", "You just set a new PB.", "success", {
          buttons: true,
          timer: 10000,
        });
      }
    }
  }
  bestOut.innerHTML = "Best: " + formatTime(cubeTimer.timeList[cubeTimer.bestStackTraceIndex[0]].time)

  if (numSolves >= 5) {
    cubeTimer.computeAverage(5, cubeTimer.timeList.length - 1)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (numSolves >= 12) {
    cubeTimer.computeAverage(12, cubeTimer.timeList.length - 1)
    averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12)
  }

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
  if (e.code === "Space") {
    displayTime.style.color = "brown"
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
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

    numSolvesOut.innerHTML = "Solves: " + cubeTimer.timeList.length;
    if (cubeTimer.timeList.length > 0 && cubeTimer.timeList[cubeTimer.bestStackTraceIndex[0]].time > 0) bestOut.innerHTML = "Best: " + formatTime(cubeTimer.timeList[cubeTimer.bestStackTraceIndex[0]].time)
    if (cubeTimer.averageOf12 > 0) averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12);
    if (cubeTimer.averageOf5 > 0) averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5);

    for (let i = 0; i < cubeTimer.timeList.length; i++) {
      creatTimeResult(i + 1, true)
    }
  }
}

function newCuberTimer() {
  return new CubeTimer(puzzleSelected, [], 0, 0, [])
}

function fromJson(jData) {
  var data = JSON.parse(jData)
  return new CubeTimer(
    data.cubeName,
    data.timeList,
    data.averageOf5,
    data.averageOf12,
    data.bestStackTraceIndex
  )
}

