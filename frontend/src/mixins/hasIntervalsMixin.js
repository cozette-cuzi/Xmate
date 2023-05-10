export default {
    data() {
        return {
            intervals: []
        }
    },
    computed: {
        intervalFunctions() {
            if (this.$options.intervals instanceof Function)
                return this.$options.intervals.bind(this)();
            return this.$options.intervals;
        }
    },
    mounted() {
        if (!this.intervalFunctions)
            return;
        for (let [func, timeout] of this.intervalFunctions) {
            this.intervals = [...this.intervals, setInterval(func, timeout)];
        }
    },
    beforeDestroy() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
};