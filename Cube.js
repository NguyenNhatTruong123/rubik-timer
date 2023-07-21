class CubeTimer {
    constructor(cubeName, scrambleList, timeList, bestSingle, worstSingle, averageOf5, averageOf12, numberSolves) {
        this.cubeName = cubeName
        this.scrambleList = scrambleList
        this.timeList = timeList
        this.bestSingle = bestSingle
        this.worstSingle = worstSingle
        this.averageOf5 = averageOf5
        this.averageOf12 = averageOf12
        this.numberSolves = numberSolves
    }

    clearAll() {
        this.scrambleList = []
        this.timeList = []
        this.bestSingle = Infinity
        this.averageOf5 = 0
        this.averageOf12 = 0
        this.numberSolves = 0
    }

    computeAverage(counting) {
        var best = Infinity
        var worst = -Infinity

        var sum = 0
        var index = this.numberSolves - 1
        for (let i = 1; i <= counting; i++) {
            let time = this.timeList[index]
            if (time < best) best = time
            if (time > worst) worst = time
            sum += time
            index--
        }

        sum -= best - worst
        if (counting === 5) this.averageOf5 = Math.round((sum / 3) * 100) / 100
        if (counting === 12) this.averageOf12 = Math.round((sum / 10) * 100) / 100
    }

    toJson() {
        return JSON.stringify({
            cubeName: this.cubeName,
            scrambleList: this.scrambleList,
            timeList: this.timeList,
            bestSingle: this.bestSingle,
            worstSingle: this.worstSingle,
            averageOf5: this.averageOf5,
            averageOf12: this.averageOf12,
            numberSolves: this.numberSolves
        });
    }
}