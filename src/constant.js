const CUBE_2X2X2 = "222"
const CUBE_3X3X3 = "333"
const CUBE_4X4X4 = "444"
const CUBE_5X5X5 = "555"
const CUBE_6X6X6 = "666"
const CUBE_7X7X7 = "777"
const CUBE_PYRAMINX = "pyram"
const CUBE_SQUARE = "sq1"
const CUBE_MEGAMINX = "minx"
const CUBE_SKEWB = "skewb"
const CUBE_CLOCK = "clock"

const CUBE_LABEL = {
    CUBE_2X2X2: "2x2x2",
    CUBE_3X3X3: "3x3x3",
    CUBE_4X4X4: "4x4x4",
    CUBE_5X5X5: "5x5x5",
    CUBE_6X6X6: "6x6x6",
    CUBE_7X7X7: "7x7x7",
    CUBE_PYRAMINX: "Pyraminx",
    CUBE_SQUARE1: "Square-1",
    CUBE_MEGAMINX: "Megaminx",
    CUBE_SKEWB: "Skewb",
    CUBE_CLOCK: "Clock"
}


const move2x2x2 = ["R", "U", "F", "R'", "U'", "F'", "R2", "U2", "F2"]
const move3x3x3 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2"]
const move4x4x4 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Uw", "Fw", "Rw'", "Uw'", "Fw'", "Rw2", "Uw2", "Fw2"]
const move5x5x5 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw", "Rw'", "Lw'", "Uw'", "Dw'", "Fw'", "Bw'", "Rw2", "Lw2", "Uw2", "Dw2", "Fw2", "Bw2"]

const move6x6x6 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw", "Rw'", "Lw'", "Uw'", "Dw'", "Fw'", "Bw'", "Rw2", "Lw2", "Uw2", "Dw2", "Fw2", "Bw2",
    "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw", "3Rw'", "3Lw'", "3Uw'", "3Dw'", "3Fw'", "3Bw'", "3Rw2", "3Lw2", "3Uw2", "3Dw2", "3Fw2", "3Bw2"]

const move7x7x7 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw", "Rw'", "Lw'", "Uw'", "Dw'", "Fw'", "Bw'", "Rw2", "Lw2", "Uw2", "Dw2", "Fw2", "Bw2",
    "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw", "3Rw'", "3Lw'", "3Uw'", "3Dw'", "3Fw'", "3Bw'", "3Rw2", "3Lw2", "3Uw2", "3Dw2", "3Fw2", "3Bw2"]

const movePyram = ["R", "L", "U", "B", "R'", "L'", "U'", "B'", "r", "l", "u", "b", "r'", "l'", "u'", "b'"]

const moveSkewb = ["R", "L", "U", "B", "R'", "L'", "U'", "B'"]

const dnfTime = 1e6

export {
    CUBE_2X2X2, CUBE_3X3X3, CUBE_4X4X4, CUBE_5X5X5, CUBE_6X6X6, CUBE_7X7X7,
    CUBE_CLOCK, CUBE_MEGAMINX, CUBE_PYRAMINX, CUBE_SKEWB, CUBE_SQUARE, CUBE_LABEL,
    move2x2x2, move3x3x3, move4x4x4, move5x5x5, move6x6x6, move7x7x7, dnfTime,
    movePyram, moveSkewb
}