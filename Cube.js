class CubeTimer {
    constructor(cubeName) {
        this.cubeName = cubeName
        this.scrambleList = []
        this.timeList = []
        this.bestSingle = Infinity
        this.worstSingle = -Infinity
        this.averageOf5 = 0
        this.averageOf12 = 0
        this.numberSolves = 0
    }

    clearAll() {
        this.scrambleList = []
        this.timeList = []
        this.bestSingle = Infinity
        this.averageOf5 = 0
        this.averageOf12 = 0
        this.numberSolves = 0
    }
}