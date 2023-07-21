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
var numSolves = 0;
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
      displayTime.style.width = "350px";
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

    let timeElement = document.createElement("span")
    timeElement.className = "timeResult"
    // timeElement.id = DATA_RESULTS[puzzleSelect]["scramble"].length
    timeElement.id = cubeTimer.scrambleList.length
    timeList.appendChild(timeElement)
    timeElement.innerText = " " + displayTime.innerText.split(" ").join("") + " "

    timeElement.addEventListener("click", function (e) {
      createResultDialog(e.target.id)
    })

    createResultList()
    calculateStats();
    timeList.scrollTop = timeList.scrollHeight;
    scrambleGenerator(isNewSession = false)
  }
}

function createResultDialog(id) {
  alert(DATA_RESULTS[puzzleSelect]["scramble"][[id]])
}

function createResultList() {
  let resultTime = displayTime.innerText.split(" ").join("")
  // DATA_RESULTS[puzzleSelect]["timeList"].push(parseFloat(resultTime))
  // DATA_RESULTS[puzzleSelect]["scramble"].push(currentScramble)
  cubeTimer.timeList.push(parseFloat(resultTime))
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
    default:
      ScrambleGenerator3x3();
      puzzleSelect = CUBE_3X3X3
  }
  currentPuzzle = puzzleSelect
  if (isNewSession) cubeTimer = new CubeTimer(puzzleSelect)

}

// timeList.onload = view();
timeList.scrollTop = timeList.scrollHeight;

//function to store the value of selected puzzle
function puzzle_select() {
  puzzleSelect = parseInt(puzzle.value);
}

puzzle.addEventListener("change", function () {
  if (localStorage) {
    cubeTimer = localStorage.getItem(currentPuzzle)
  }
  timeList.innerText = ""
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
  storeValue()

  currentPuzzle = puzzleSelect
});

clearAll.addEventListener("click", function () {
  clearTimes()
});

// clear times function
function clearTimes() {
  timeDisplay = [];
  timeList.innerHTML = timeDisplay;
  numSolves = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  bestOut.innerHTML = "Best: ";
  avAllOut.innerHTML = "Average: ";

  cubeTimer.clearAll()
}

//stats
function calculateStats() {
  numSolves++;
  numSolvesOut.innerHTML = "Solves: " + numSolves;

  let start = numSolves - 1
  // let currentTime = DATA_RESULTS[puzzleSelect]["timeList"][start]
  // if (currentTime < DATA_RESULTS[puzzleSelect]["best"]) DATA_RESULTS[puzzleSelect]["best"] = currentTime
  // if (currentTime > DATA_RESULTS[puzzleSelect]["worst"]) DATA_RESULTS[puzzleSelect]["worst"] = currentTime
  let currentTime = cubeTimer.timeList[start]
  if (currentTime < cubeTimer.bestSingle) cubeTimer.bestSingle = currentTime
  if (currentTime > cubeTimer.worstSingle) cubeTimer.worstSingle = currentTime
  // bestOut.innerHTML = "Best: " + DATA_RESULTS[puzzleSelect]["best"]
  bestOut.innerHTML = "Best: " + cubeTimer.bestSingle

  sumOf12 += currentTime
  sumOf5 += currentTime

  if (numSolves >= 5) {
    // if (DATA_RESULTS[puzzleSelect]["timeList"][numSolves - 6]) sumOf5 -= DATA_RESULTS[puzzleSelect]["timeList"][numSolves - 6]
    // var average = (sumOf5 - DATA_RESULTS[puzzleSelect]["best"] - DATA_RESULTS[puzzleSelect]["worst"]) / 3
    // DATA_RESULTS[puzzleSelect]["averageOf5"] = Math.round(average * 100) / 100
    // averageOf5.innerHTML = "Ao5: " + DATA_RESULTS[puzzleSelect]["averageOf5"]
    if (cubeTimer.timeList[numSolves - 6]) sumOf5 -= cubeTimer.timeList[numSolves - 6]
    var average = (sumOf5 - cubeTimer.bestSingle - cubeTimer.worstSingle) / 3
    cubeTimer.averageOf5 = Math.round(average * 100) / 100
    averageOf5.innerHTML = "Ao5: " + cubeTimer.averageOf5
  }
  if (numSolves >= 12) {
    // if (DATA_RESULTS[puzzleSelect]["timeList"][numSolves - 13]) sumOf5 -= DATA_RESULTS[puzzleSelect]["timeList"][numSolves - 13]
    // var average = (sumOf5 - DATA_RESULTS[puzzleSelect]["best"] - DATA_RESULTS[puzzleSelect]["worst"]) / 10
    // DATA_RESULTS[puzzleSelect]["averageOf12"] = Math.round(average * 100) / 100
    // averageOf12.innerHTML = "Ao12: " + DATA_RESULTS[puzzleSelect]["averageOf12"]
    if (cubeTimer.timeList[numSolves - 13]) sumOf12 -= cubeTimer.timeList[numSolves - 13]
    var average = (sumOf12 - cubeTimer.bestSingle - cubeTimer.worstSingle) / 10
    cubeTimer.averageOf12 = Math.round(average * 100) / 100
    averageOf12.innerHTML = "Ao12: " + cubeTimer.averageOf12
  }

}

function formatTime(t) {
  //m = minute, s = second, c = centisecond
  var m = 0,
    s = 0,
    c = 0,
    out = "";
  m = Math.floor(t / 6000);
  t = t % 6000;
  s = Math.floor(t / 100);
  t = t % 100;
  c = Math.floor(t);
  if (m < 1) {
    m = "";
  } else {
    m = m + ":";
    if (s < 10) {
      s = "0" + s;
    }
  }
  if (c < 10) {
    c = "0" + c;
  }

  out = "" + m + s + "." + c;
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
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

function storeValue() {
  localStorage.setItem(currentPuzzle, cubeTimer)
}

function viewStoreValue(puzzleName) {

}