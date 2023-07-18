const oppositeFace = [
    ["R", "R'", "R2", "L", "L'", "L2", "Rw", "Rw'", "Rw2", "Lw", "Lw'", "Lw2"],
    ["U", "U'", "U2", "D", "D'", "D2", "Uw", "Uw'", "Uw2", "Dw", "Dw'", "Dw2"],
    ["F", "F'", "F2", "B", "B'", "B2", "Fw", "Fw'", "Fw2", "Bw", "Bw'", "Bw2"]
]

function checkValidNextMove(currentMove, lastMove, prevLastMove) {
    if (currentMove === lastMove) return false
    else if (checkOppositeFace(lastMove, currentMove) && currentMove[0] === lastMove[0]) return false
    else if (checkOppositeFace(lastMove, prevLastMove) && checkOppositeFace(lastMove, currentMove)) return false

    return true
}

function checkOppositeFace(move1, move2) {
    for (let i = 0; i < 3; i++) {
        if (oppositeFace[i].includes(move1) && oppositeFace[i].includes(move2)) return true
    }
    return false
}

function randomMove(scramble, moves, startIndex, endIndex, lastMoveIndex, prevLastIndex) {
    let randomIndex = Math.floor(Math.random() * (endIndex - startIndex + 1) + startIndex)
    do {
        randomIndex = Math.floor(Math.random() * (endIndex - startIndex + 1) + startIndex)
    } while (!checkValidNextMove(moves[randomIndex], moves[lastMoveIndex], moves[prevLastIndex]))

    scramble += moves[randomIndex] + " "
    prevLastIndex = lastMoveIndex
    lastMoveIndex = randomIndex

    return [scramble, lastMoveIndex, prevLastIndex]
}

// Check valid next move for 5x5 or bigger
// function checkValidBigCubeNextMove(currentMove, lastMove, prevLastMove) {
//     if (!currentMove || !lastMove || !prevLastMove) return true
//     else {
//         if (currentMove[1] === lastMove[1] && currentMove[1] === prevLastMove[1]) checkValidNextMove(currentMove, lastMove, prevLastMove)
//         else {
//             if (currentMove !== lastMove) return true
//         }
//     }
//     return false
// }