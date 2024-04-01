import { move2x2x2, move3x3x3, move4x4x4, move5x5x5, move6x6x6, move7x7x7, movePyram } from "./constant"
import { checkValidNextMove, randomMove } from "./utilities"

// 2x2 scram
function ScrambleGenerator2x2() {
  let scramble = ""
  let lastMoveIndex = -1
  var output = document.getElementById("scramble");

  let scrambleLength = Math.random() * (11 - 9) + 9;

  for (var i = 0; i < scrambleLength; i++) {
    let randomIndex = Math.floor(move2x2x2.length);

    do {
      randomIndex = Math.floor(Math.random() * move2x2x2.length);
    } while (randomIndex % 3 === lastMoveIndex % 3)

    scramble += move2x2x2[randomIndex] + " "
    lastMoveIndex = randomIndex

  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

// 3x3 scram
function ScrambleGenerator3x3() {
  let scramble = ""
  let lastMoveIndex = -1
  let prevLastIndex = -1
  var output = document.getElementById("scramble");

  let scrambleLength = Math.random() * (27 - 23) + 23;

  for (var i = 0; i < scrambleLength; i++) {
    [scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move3x3x3, 0, 17, lastMoveIndex, prevLastIndex)
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

// 4x4 scram
function ScrambleGenerator4x4() {
  let scramble = ""
  let lastMoveIndex = -1
  let prevLastIndex = -1
  var output = document.getElementById("scramble");
  let scrambleLength = Math.random() * (45 - 40) + 40;
  for (var i = 0; i < scrambleLength; i++) {
    if (i <= 19) {
      [scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move4x4x4, 0, 17, lastMoveIndex, prevLastIndex)
    }
    else {
      if (i === 20) [scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move4x4x4, 18, move4x4x4.length - 1, lastMoveIndex, prevLastIndex)
      else {
        let innerChance = Math.random()
        if (innerChance >= 0.6) [scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move4x4x4, 18, move4x4x4.length - 1, lastMoveIndex, prevLastIndex)
        else[scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move4x4x4, 0, 17, lastMoveIndex, prevLastIndex)
      }
    }
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

// 5x5 scram
function ScrambleGenerator5x5() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  let scrambleLength = Math.random() * (60 - 55) + 55;

  for (var i = 0; i < scrambleLength; i++) {
    randomIndex = Math.floor(Math.random() * move5x5x5.length)
    do {
      randomIndex = Math.floor(Math.random() * move5x5x5.length)
    } while (!checkValidNextMove(move5x5x5[randomIndex], move5x5x5[lastMoveIndex], move5x5x5[lastPrevIndex]))
    scramble += move5x5x5[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

// 6x6 scram
function ScrambleGenerator6x6() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  let scrambleLength = Math.random() * (80 - 75) + 75;

  for (var i = 0; i < scrambleLength; i++) {
    randomIndex = Math.floor(Math.random() * move6x6x6.length)
    do {
      randomIndex = Math.floor(Math.random() * move6x6x6.length)
    } while (!checkValidNextMove(move6x6x6[randomIndex], move6x6x6[lastMoveIndex], move6x6x6[lastPrevIndex]))
    scramble += move6x6x6[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

// 7x7 scram
function ScrambleGenerator7x7() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  let scrambleLength = Math.random() * (100 - 95) + 95;

  for (var i = 0; i < scrambleLength; i++) {
    randomIndex = Math.floor(Math.random() * move7x7x7.length)
    do {
      randomIndex = Math.floor(Math.random() * move7x7x7.length)
    } while (!checkValidNextMove(move7x7x7[randomIndex], move7x7x7[lastMoveIndex], move7x7x7[lastPrevIndex]))
    scramble += move7x7x7[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

function ScrambleGeneratorPyraminx() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  let scrambleLength = Math.floor(Math.random() * (13 - 11)) + 11;

  let cornerScambleLength = Math.random() * 4;

  for (var i = 0; i < scrambleLength; i++) {

    if (i < scrambleLength - cornerScambleLength) {
      randomIndex = Math.floor(Math.random() * 7)
    } else {
      randomIndex = Math.floor.apply(Math.random() * (15 - 8)) + 8
    }

    do {

      if (i < scrambleLength - cornerScambleLength) {
        randomIndex = Math.floor(Math.random() * 7)
      } else {
        randomIndex = Math.floor(Math.random() * (15 - 8)) + 8
      }

    } while (!checkValidNextMove(movePyram[randomIndex], movePyram[lastMoveIndex], movePyram[lastPrevIndex]))

    scramble += movePyram[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
  return scramble;
}

export {
  ScrambleGenerator2x2, ScrambleGenerator3x3, ScrambleGenerator4x4, ScrambleGenerator5x5, ScrambleGenerator6x6, ScrambleGenerator7x7,
  ScrambleGeneratorPyraminx
}