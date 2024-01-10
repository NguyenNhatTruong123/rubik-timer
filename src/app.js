// const CubeTimer = require('./Cube')
// import { ScrambleGenerator2x2, ScrambleGenerator3x3, ScrambleGenerator4x4, ScrambleGenerator5x5, ScrambleGenerator6x6, ScrambleGenerator7x7 } from "./scrambler"
// import { CUBE_2X2X2, CUBE_3X3X3, CUBE_4X4X4, CUBE_5X5X5, CUBE_6X6X6, CUBE_7X7X7, CUBE_LABEL, move2x2x2, move3x3x3, move4x4x4, move5x5x5, move6x6x6, move7x7x7 } from "./constant"

var msDisplay = document.querySelector("#milliSec");
var secDisplay = document.querySelector("#second");
var minDisplay = document.querySelector("#minute");
var minColon = document.querySelector("#minColon");
var timeList = document.querySelector("#listOfTime");
var eventSelected = document.querySelector("#eventSelected");
var puzzle = document.querySelector("#puzzle");
var scramble = document.querySelector("#scramble");
var clearAll = document.querySelector("#clear");
var scrambleGeneratorEl = document.getElementById("scrambleGenerator")

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

    timeList.scrollTop = timeList.scrollHeight;
    interval = setInterval(timer, 10);

  } else if (running) {
    running = false;
    clearInterval(interval);

    createResultList()

    let timeElement = document.createElement("span")
    timeElement.className = "timeResult"
    // timeElement.id = cubeTimer.scrambleList.length
    timeElement.id = cubeTimer.timeList.length
    timeList.appendChild(timeElement)
    timeElement.innerText = " " + displayTime.innerText.split(" ").join("") + " "

    timeElement.addEventListener("click", function (e) {
      createResultDialog(e.target.id - 1)
    })
    calculateStats();
    timeList.scrollTop = timeList.scrollHeight;
    storeValue();
    scrambleGenerator(false)
  }
}

function createResultDialog(id) {
  var thisTime = cubeTimer.timeList[id].time
  swal({
    title: thisTime,
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
                cubeTimer.deleteResult(id);
                handleAfterDeleteResult(id);
                storeValue();
              }
            });
          break;
        case "plusTwo":
          cubeTimer.timeList[id] += 2;
          handleAfterDeleteResult();
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
    cubeTimer = new CubeTimer(puzzleSelected, [], 10000000, 0, 0, 0)
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

timeList.scrollTop = timeList.scrollHeight;

puzzle.addEventListener("change", function () {
  puzzleSelected = puzzle.value;
  clearTimes()
  cubeTimer = new CubeTimer(puzzleSelected, [], [], Infinity, -Infinity, 0, 0, 0)
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
  cubeTimer.clearAll()
  timeList.innerHTML = [];
  numSolvesOut.innerHTML = "Solves: ";
  bestOut.innerHTML = "Best: ";
  averageOf12.innerHTML = "Ao12: ";
  averageOf5.innerHTML = "Ao5: ";
  storeValue();
}

function handleAfterDeleteResult(id) {

  let numSolves = cubeTimer.timeList.length

  let spanTimeList = document.querySelectorAll(".timeResult")
  timeList.removeChild(spanTimeList[id])

  numSolvesOut.innerHTML = "Solves: " + numSolves;
  bestOut.innerHTML = "Best: " + formatTime(cubeTimer.bestSingle)

  if (numSolves >= 5) {
    cubeTimer.computeAverage(5)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (numSolves >= 12) {
    cubeTimer.computeAverage(12)
    averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12)
  }
}

function handleAfterPlusTwo(id) {

}

//stats
function calculateStats() {
  let numSolves = cubeTimer.timeList.length
  numSolvesOut.innerHTML = "Solves: " + numSolves;

  let start = numSolves - 1
  let currentTime = cubeTimer.timeList[start].time

  if (numSolves === 1) {
    cubeTimer.bestSingle = currentTime
    cubeTimer.worstSingle = currentTime
  } else {
    if (currentTime < cubeTimer.bestSingle) {
      cubeTimer.bestSingle = currentTime
      if (numSolves > 1) {
        swal("Congratulations", "You just set a new PB.", "success", {
          buttons: true,
          timer: 10000,
        });
      }
    }
  }
  if (currentTime > cubeTimer.worstSingle) cubeTimer.worstSingle = currentTime
  bestOut.innerHTML = "Best: " + formatTime(cubeTimer.bestSingle)

  if (numSolves >= 5) {
    cubeTimer.computeAverage(5)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (numSolves >= 12) {
    cubeTimer.computeAverage(12)
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

// window.onkeyup = run;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
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
    if (cubeTimer.bestSingle > 0) bestOut.innerHTML = "Best: " + formatTime(cubeTimer.bestSingle)
    if (cubeTimer.averageOf12 > 0) averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12);
    if (cubeTimer.averageOf5 > 0) averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5);

    for (let i = 0; i < cubeTimer.timeList.length; i++) {
      let timeElement = document.createElement("span")
      timeElement.className = "timeResult"
      timeElement.id = i
      timeList.appendChild(timeElement)
      timeElement.innerText = " " + formatTime(cubeTimer.timeList[i]) + " "

      timeElement.addEventListener("click", function (e) {
        createResultDialog(e.target.id)
      })
    }
  }
}

function fromJson(jData) {
  var data = JSON.parse(jData)
  return new CubeTimer(
    data.cubeName,
    data.timeList,
    data.bestSingle,
    data.worstSingle,
    data.averageOf5,
    data.averageOf12,
  )
}

