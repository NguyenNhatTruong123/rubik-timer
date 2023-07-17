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
var savedTimes;
// new variables stats
var csTimes = [];
var avAll = 0;
var avAllOut = document.getElementById("overallAv");
var best = 999999999999999999;
var bestOut = document.getElementById("fastest");
var worst = 0;
var numSolves = 0;
var total = 0;
var numSolvesOut = document.querySelector(".solveNum");

// ends here

var timeDisplay = [];

scrambleGenerator()

var running = false;
var milliSec = 0;
var second = 0;
var minute = 0;
var cs = 0;

var csTimes = [];
let interval;

var currentScramble = ""

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
    timeElement.id = "timeResult"
    timeList.appendChild(timeElement)
    timeElement.innerText = " " + displayTime.innerText.split(" ").join("") + " "
    timeElement.setAttribute('href', "#");

    timeElement.addEventListener("click", function () {
      alert(currentScramble)
    })

    csTimes.push(cs);
    calculateStats();
    timeList.scrollTop = timeList.scrollHeight;

    createResultList()
    scrambleGenerator()
  }
}

function createResultList() {
  let resultTime = displayTime.innerText.split(" ").join("")
  DATA_RESULTS[puzzleSelect]["timeList"].push(resultTime)
  DATA_RESULTS[puzzleSelect]["scramble"].push(currentScramble)
}

function scrambleGenerator() {
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
    // case "6":
    //   pyraminx();
    //   break;
    // case "7":
    //   skewb();
    //   break;
    default:
      ScrambleGenerator3x3();
      puzzleSelect = 3
  }

}

// timeList.onload = view();
timeList.scrollTop = timeList.scrollHeight;

//function to store the value of selected puzzle
function puzzle_select() {
  puzzleSelect = parseInt(puzzle.value);
}

puzzle.addEventListener("change", function () {
  timeList.innerText = ""
  if (puzzleSelect === CUBE_2X2X2) {
    ScrambleGenerator2x2();
    puzzleSelected.textContent = "2x2x2";
  }
  if (puzzleSelect === CUBE_3X3X3) {
    ScrambleGenerator3x3();
    puzzleSelected.textContent = "3x3x3";
  }
  if (puzzleSelect === CUBE_4X4X4) {
    ScrambleGenerator4x4();
    puzzleSelected.textContent = "4x4x4";
  }
  if (puzzleSelect === CUBE_5X5X5) {
    ScrambleGenerator5x5();
    puzzleSelected.textContent = "5x5x5";
  }
  // if (puzzleSelect === "6") {
  //   pyraminx();
  //   puzzleSelected.textContent = "PYRAMINX";
  // }
  // if (puzzleSelect === "7") {
  //   skewb();
  //   puzzleSelected.textContent = "SKEWB";
  // }
});

clearAll.addEventListener("click", function () {
  clearTimes()
});

// clear times function
function clearTimes() {
  csTimes = [];
  timeDisplay = [];
  localStorage.clear();
  timeList.innerHTML = timeDisplay;
  numSolves = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  best = 99999999999;
  bestOut.innerHTML = "Best: ";
  worst = 0;
  avAll = 0;
  total = 0;
  avAllOut.innerHTML = "Average: ";
}

//stats
function calculateStats() {
  numSolves++;
  total = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  for (var x = 0; x < csTimes.length; x++) {
    if (csTimes[x] < best) {
      best = csTimes[x];
    }
    if (csTimes[x] > worst) {
      worst = csTimes[x];
    }
    total += csTimes[x];
  }
  avAll = formatTime(total / numSolves);
  best = formatTime(best)
  avAllOut.innerHTML = "Average: " + avAll;
  bestOut.innerHTML = "Best: " + best;
  DATA_RESULTS[puzzleSelect]["best"] = best
  DATA_RESULTS[puzzleSelect]["average"] = avAll
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