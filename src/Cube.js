class CubeTimer {
    constructor(cubeName, timeList, bestSingle, worstSingle, averageOf5, averageOf12) {
        this.cubeName = cubeName
        this.timeList = timeList
        this.bestSingle = bestSingle
        this.worstSingle = worstSingle
        this.averageOf5 = averageOf5
        this.averageOf12 = averageOf12
        this.bestAo5 = [Infinity, 0]
        this.bestAo12 = [Infinity, 0]
        this.meanTime = 0
    }

    clearAll() {
        this.timeList = []
        this.bestSingle = Infinity
        this.worstSingle = -Infinity
        this.averageOf5 = 0
        this.averageOf12 = 0
    }

    deleteResult(id) {
        let currentTime = this.timeList[id].time;
        this.timeList.splice(id, 1);
        if (currentTime === this.bestSingle) {
            this.bestSingle = Math.min.apply(null, this.timeList);
        }
    }

    computeAverage(counting, index) {
        var best = Infinity
        var worst = -Infinity

        var sum = 0
        for (let i = 1; i <= counting; i++) {
            let time = this.timeList[index].time
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
            bestSingle: this.bestSingle,
            worstSingle: this.worstSingle,
            averageOf5: this.averageOf5,
            averageOf12: this.averageOf12,
        });
    }
}
