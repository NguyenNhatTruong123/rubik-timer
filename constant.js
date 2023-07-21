const CUBE_2X2X2 = "2x2x2"
const CUBE_3X3X3 = "3x3x3"
const CUBE_4X4X4 = "4x4x4"
const CUBE_5X5X5 = "5x5x5"

const move2x2x2 = ["R", "U", "F", "R'", "U'", "F'", "R2", "U2", "F2"]
const move3x3x3 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2"]
const move4x4x4 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Uw", "Fw", "Rw'", "Uw'", "Fw'", "Rw2", "Uw2", "Fw2"]
const move5x5x5 = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw", "Rw'", "Lw'", "Uw'", "Dw'", "Fw'", "Bw'", "Rw2", "Lw2", "Uw2", "Dw2", "Fw2", "Bw2"]

var DATA_RESULTS = {
    3: {
        "timeList": [],
        "best": Infinity,
        "worst": -Infinity,
        "averageOf5": 0,
        "averageOf12": 0,
        "scramble": []
    },
    2: {
        "timeList": [],
        "best": Infinity,
        "worst": -Infinity,
        "averageOf5": 0,
        "averageOf12": 0,
        "scramble": []
    },
    4: {
        "timeList": [],
        "best": Infinity,
        "worst": -Infinity,
        "averageOf5": 0,
        "averageOf12": 0,
        "scramble": []
    },
    5: {
        "timeList": [],
        "best": Infinity,
        "worst": -Infinity,
        "averageOf5": 0,
        "averageOf12": 0,
        "scramble": []
    }
}