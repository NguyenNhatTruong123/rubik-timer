// 2x2 scram
function ScrambleGenerator2x2() {
  let scramble = ""
  let lastMoveIndex = -1
  var output = document.getElementById("scramble");
  for (var i = 0; i < 9; i++) {
    let randomIndex = Math.floor(move2x2x2.length);

    do {
      randomIndex = Math.floor(Math.random() * move2x2x2.length);
    } while (randomIndex % 3 === lastMoveIndex % 3)

    scramble += move2x2x2[randomIndex] + " "
    lastMoveIndex = randomIndex

  }
  output.innerHTML = `${scramble}`;
}

// 3x3 scram
function ScrambleGenerator3x3() {
  let scramble = ""
  let lastMoveIndex = -1
  let prevLastIndex = -1
  var output = document.getElementById("scramble");
  for (var i = 0; i < 25; i++) {
    [scramble, lastMoveIndex, prevLastIndex] = randomMove(scramble, move3x3x3, 0, 17, lastMoveIndex, prevLastIndex)
  }
  output.innerHTML = `${scramble}`;
}

// 4x4 scram
function ScrambleGenerator4x4() {
  let scramble = ""
  let lastMoveIndex = -1
  let prevLastIndex = -1
  var output = document.getElementById("scramble");
  let scrambleLength = Math.floor(Math.random() * 7) + 40
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
}

// 5x5 scram
function ScrambleGenerator5x5() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  for (var i = 0; i < 60; i++) {
    randomIndex = Math.floor(Math.random() * move5x5x5.length)
    do {
      randomIndex = Math.floor(Math.random() * move5x5x5.length)
    } while (!checkValidNextMove(move5x5x5[randomIndex], move5x5x5[lastMoveIndex], move5x5x5[lastPrevIndex]))
    scramble += move5x5x5[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
}

// 6x6 scram
function ScrambleGenerator6x6() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  for (var i = 0; i < 80; i++) {
    randomIndex = Math.floor(Math.random() * move6x6x6.length)
    do {
      randomIndex = Math.floor(Math.random() * move6x6x6.length)
    } while (!checkValidNextMove(move6x6x6[randomIndex], move6x6x6[lastMoveIndex], move6x6x6[lastPrevIndex]))
    scramble += move6x6x6[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
}

// 7x7 scram
function ScrambleGenerator7x7() {
  let scramble = ""
  let lastMoveIndex = -1
  let lastPrevIndex = -1
  var output = document.getElementById("scramble");
  let randomIndex = 0

  for (var i = 0; i < 100; i++) {
    randomIndex = Math.floor(Math.random() * move7x7x7.length)
    do {
      randomIndex = Math.floor(Math.random() * move7x7x7.length)
    } while (!checkValidNextMove(move7x7x7[randomIndex], move7x7x7[lastMoveIndex], move7x7x7[lastPrevIndex]))
    scramble += move7x7x7[randomIndex] + " "
    lastPrevIndex = lastMoveIndex
    lastMoveIndex = randomIndex
  }
  output.innerHTML = `${scramble}`;
}


// Pyraminx Scrambler
function pyraminx() {
  var move; //includes face to turn and how to turn it. Ex. 2F
  var face; //Face to turn. Either R, L, F, B, U, or D
  var faceNum; //1-6, corresponds to face R-D
  var lastFaceNum = 10; //The face of the previous turn
  var turn; //How to turn a face. Either ', 2, or nothing.
  var scramble = ""; //inlucdes 25 moves
  var output = document.getElementById("scram");
  for (var x = 0; x < 6; x++) {
    do {
      faceNum = Math.floor(Math.random() * 4) + 1;
    } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
    lastFaceNum = faceNum;
    if (faceNum === 1) {
      face = "R";
    }
    if (faceNum === 2) {
      face = "L";
    }
    if (faceNum === 3) {
      face = "U";
    }
    if (faceNum === 4) {
      face = "B";
    }

    turn = Math.floor(Math.random() * 6) + 1;
    if (turn === 1) {
      move = face;
    }
    if (turn === 2) {
      move = face + "'";
    }
    if (turn === 3) {
      move = face + " r";
    }
    if (turn === 4) {
      move = face + " u";
    }
    if (turn === 5) {
      move = face + " l";
    }
    if (turn === 6) {
      move = face + " b";
    }

    scramble += move + " ";
  }
  output.innerHTML = `${scramble}`;
}

// Skewb
function skewb() {
  var move; //includes face to turn and how to turn it. Ex. 2F
  var face; //Face to turn. Either R, L, F, B, U, or D
  var faceNum; //1-6, corresponds to face R-D
  var lastFaceNum = 10; //The face of the previous turn
  var turn; //How to turn a face. Either ', 2, or nothing.
  var scramble = ""; //inlucdes 25 moves
  var output = document.getElementById("scram");
  for (var x = 0; x < 10; x++) {
    do {
      faceNum = Math.floor(Math.random() * 4) + 1;
    } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
    lastFaceNum = faceNum;
    if (faceNum === 1) {
      face = "R";
    }
    if (faceNum === 2) {
      face = "L";
    }
    if (faceNum === 3) {
      face = "U";
    }
    if (faceNum === 4) {
      face = "B";
    }

    turn = Math.floor(Math.random() * 2) + 1;
    if (turn === 1) {
      move = face;
    }
    if (turn === 2) {
      move = face + "'";
    }

    scramble += move + " ";
  }
  output.innerHTML = `${scramble}`;
}

  //End of Scramble generator.......