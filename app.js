var msDisplay = document.querySelector("#milliSec");
var secDisplay = document.querySelector("#second");
var minDisplay = document.querySelector("#minute");
var minColon = document.querySelector("#minColon");
var displayTimeContainer = document.querySelector('.display-time-container');
var displayTime = document.querySelector("#displayTime");
var displayReset = document.querySelector("#displayReset");
var timeList = document.querySelector("#listOfTime");
var puzzleSelected = document.querySelector("#puzzleSelected");
var puzzle = document.querySelector("#puzzle");
var scramble = document.querySelector("#scramble");
var newScramGenerate = document.querySelector("#newScramGenerate");
var clearAll = document.querySelector("#clear");
var showHtl = document.querySelector(".showHtl");
var showTimes = document.querySelector("#showTimes");
var splitRight = document.querySelector(".split-right");
var splitLeft = document.querySelector(".split-left");

var puzzleSelect;
var currentPuzzle;
var savedTimes;
// new variables stats
var averageOf5 = document.getElementById("ao5");
var averageOf12 = document.getElementById("ao12");
var bestOut = document.getElementById("best");
var numSolvesOut = document.querySelector(".solveNum");

// ends here

var timeDisplay = [];

scrambleGenerator(isNewSession = true)

var running = false;
var milliSec = 0;
var second = 0;
var minute = 0;
var cs = 0;

let interval;

var currentScramble = ""

var sumOf5 = 0
var sumOf12 = 0

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
    timeElement.id = cubeTimer.scrambleList.length
    timeList.appendChild(timeElement)
    timeElement.innerText = " " + displayTime.innerText.split(" ").join("") + " "

    timeElement.addEventListener("click", function (e) {
      createResultDialog(e.target.id - 1)
    })
    calculateStats();
    timeList.scrollTop = timeList.scrollHeight;
    storeValue();
    scrambleGenerator(isNewSession = false)
  }
}

function createResultDialog(id) {
  swal("Scramble", cubeTimer.scrambleList[id], {
    buttons: {
      delete: "Delete"
    }
  }).then((value) => {
    switch (value) {
      case "delete":
        swal({
          title: "Confirm?",
          text: "Are you sure to delete this result?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              cubeTimer.deleteResult(id);
              handleAfterDeleteResult();
              storeValue();
            }
          });
        break;
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
  cubeTimer.timeList.push(convertStringToTime(resultTime))
  cubeTimer.scrambleList.push(currentScramble)
}

function scrambleGenerator(isNewSession) {
  switch (puzzleSelect) {
    case CUBE_2X2X2:
      ScrambleGenerator2x2();
      break;
    case CUBE_3X3X3:
      ScrambleGenerator3x3();
      break;
    case CUBE_4X4X4:
      ScrambleGenerator4x4();
      break;
    case CUBE_5X5X5:
      ScrambleGenerator5x5();
      break;
    case CUBE_6X6X6:
      ScrambleGenerator6x6();
      break;
    case CUBE_7X7X7:
      ScrambleGenerator7x7();
      break;
    default:
      ScrambleGenerator3x3();
      puzzleSelect = CUBE_3X3X3
  }
  currentPuzzle = puzzleSelect
  if (isNewSession) {
    cubeTimer = new CubeTimer(puzzleSelect, [], [], Infinity, -Infinity, 0, 0, 0)
    if (localStorage) {
      viewStoreValue(puzzleSelect)
    }
  }
}

// timeList.onload = view();
timeList.scrollTop = timeList.scrollHeight;

//function to store the value of selected puzzle
function puzzle_select() {
  puzzleSelect = puzzle.value;
}

puzzle.addEventListener("change", function () {
  storeValue()
  clearTimes()
  cubeTimer = new CubeTimer(puzzleSelect, [], [], Infinity, -Infinity, 0, 0, 0)
  if (localStorage) {
    viewStoreValue(puzzleSelect)
  }
  if (puzzleSelect === CUBE_2X2X2) {
    ScrambleGenerator2x2();
    puzzleSelected.textContent = CUBE_2X2X2;
  }
  if (puzzleSelect === CUBE_3X3X3) {
    ScrambleGenerator3x3();
    puzzleSelected.textContent = CUBE_3X3X3;
  }
  if (puzzleSelect === CUBE_4X4X4) {
    ScrambleGenerator4x4();
    puzzleSelected.textContent = CUBE_4X4X4;
  }
  if (puzzleSelect === CUBE_5X5X5) {
    ScrambleGenerator5x5();
    puzzleSelected.textContent = CUBE_5X5X5;
  }
  if (puzzleSelect === CUBE_6X6X6) {
    ScrambleGenerator6x6();
    puzzleSelected.textContent = CUBE_6X6X6;
  }
  if (puzzleSelect === CUBE_7X7X7) {
    ScrambleGenerator7x7();
    puzzleSelected.textContent = CUBE_7X7X7;
  }
  currentPuzzle = puzzleSelect
});

clearAll.addEventListener("click", function () {
  clearTimes()
});

// clear times function
function clearTimes() {
  cubeTimer.clearAll()
  timeList.innerHTML = [];
  numSolvesOut.innerHTML = "Solves: " + cubeTimer.numberSolves;
  bestOut.innerHTML = "Best: ";
  averageOf12.innerHTML = "Ao12: ";
  averageOf5.innerHTML = "Ao5: ";
  storeValue();
}

function handleAfterDeleteResult() {
  timeList.innerHTML = [];
  for (let i = 0; i < cubeTimer.numberSolves; i++) {
    let timeElement = document.createElement("span")
    timeElement.className = "timeResult"
    timeElement.id = i
    timeList.appendChild(timeElement)
    timeElement.innerText = " " + cubeTimer.timeList[i].toString() + " ";

    timeElement.addEventListener("click", function () {
      createResultDialog(i)
    })
  }

  numSolvesOut.innerHTML = "Solves: " + cubeTimer.numberSolves;
  bestOut.innerHTML = "Best: " + formatTime(cubeTimer.bestSingle)

  if (cubeTimer.numberSolves >= 5) {
    cubeTimer.computeAverage(5)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (cubeTimer.numberSolves >= 12) {
    cubeTimer.computeAverage(12)
    averageOf12.innerHTML = "Ao12: " + formatTime(cubeTimer.averageOf12)
  }
}

//stats
function calculateStats() {
  // numSolves++;
  cubeTimer.numberSolves++;
  numSolvesOut.innerHTML = "Solves: " + cubeTimer.numberSolves;

  let start = cubeTimer.numberSolves - 1
  let currentTime = cubeTimer.timeList[start]
  if (currentTime < cubeTimer.bestSingle) {
    cubeTimer.bestSingle = currentTime
    if (cubeTimer.numberSolves > 1) {
      swal("Congratulations", "You just set a new PB.", "success", {
        buttons: true,
        timer: 10000,
      });
    }
  }
  if (currentTime > cubeTimer.worstSingle) cubeTimer.worstSingle = currentTime
  bestOut.innerHTML = "Best: " + formatTime(cubeTimer.bestSingle)

  if (cubeTimer.numberSolves >= 5) {
    cubeTimer.computeAverage(5)
    averageOf5.innerHTML = "Ao5: " + formatTime(cubeTimer.averageOf5)
  }
  if (cubeTimer.numberSolves >= 12) {
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
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 32) {
    currentScramble = scramble.innerText
    run();
  }
});



window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

function storeValue() {
  localStorage.setItem(currentPuzzle, cubeTimer.toJson())
}

function viewStoreValue(puzzleName) {
  var storeResult = localStorage.getItem(puzzleName)
  if (storeResult) {
    cubeTimer = fromJson(storeResult)

    numSolvesOut.innerHTML = "Solves: " + cubeTimer.numberSolves;
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
    data.scrambleList,
    data.timeList,
    data.bestSingle,
    data.worstSingle,
    data.averageOf5,
    data.averageOf12,
    data.numberSolves
  )
}