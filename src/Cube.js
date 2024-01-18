class CubeTimer {
    constructor(cubeName, timeList, averageOf5, averageOf12, resultTree) {
        this.cubeName = cubeName
        this.timeList = timeList
        this.averageOf5 = averageOf5
        this.averageOf12 = averageOf12
        this.bestAo5 = [Infinity, 0]
        this.bestAo12 = [Infinity, 0]
        this.resultTree = resultTree
        this.meanTime = 0
    }

    clearAll() {
        this.timeList = []
        this.averageOf5 = 0
        this.averageOf12 = 0
        this.bestAo5 = [Infinity, 0]
        this.bestAo12 = [Infinity, 0]
        this.bestStackTraceIndex = []
    }

    computeAverage(counting, index) {
        let best = Infinity
        let worst = -Infinity

        let countDNF = 0

        let sum = 0
        for (let i = 1; i <= counting; i++) {
            let time = this.timeList[index].time
            if (this.timeList[index].isDNF) {
                countDNF++
                time = 10000000
            }

            if (countDNF === 2) {
                this.averageOf5 = "DNF"
                this.averageOf12 = "DNF"
                return
            }

            if (time < best) best = time
            if (time > worst) worst = time
            sum += time
            index--
        }

        sum = sum - best - worst
        if (counting === 5) {
            this.averageOf5 = Math.round((sum / 3) * 100) / 100
            if (this.averageOf5 < this.bestAo5[0]) {
                this.bestAo5 = [this.averageOf5, index + counting]
            }
        }
        if (counting === 12) {
            this.averageOf12 = Math.round((sum / 10) * 100) / 100
            if (this.averageOf12 < this.bestAo12[0]) {
                this.bestAo12 = [this.averageOf12, index + counting]
            }
        }

    }

    computeMean() {
        var meanOfTime = 0
        for (time of this.timeList.time) {
            meanOfTime += time
        }
        this.meanTime = Math.round((meanOfTime / this.timeList.length) * 100) / 100
    }

    toJson() {
        return JSON.stringify({
            cubeName: this.cubeName,
            timeList: this.timeList,
            averageOf5: this.averageOf5,
            averageOf12: this.averageOf12,
            bestAo5: this.bestAo5,
            bestAo12: this.bestAo12,
            bestAo5: this.bestAo5,
            bestAo12: this.bestAo12,
            bestStackTraceIndex: this.resultTree
        });
    }
}
