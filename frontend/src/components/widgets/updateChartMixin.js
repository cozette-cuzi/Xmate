export default {
    watch: {
        data(_) {
            this.renderChart(_, this.options);
        }
    }
}