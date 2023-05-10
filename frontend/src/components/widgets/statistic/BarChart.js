import {Bar} from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";
import updateChartMixin from "@/components/widgets/updateChartMixin";

export default {
    extends: Bar,
    mixins: [updateChartMixin],
    props: {
        xLabels: {
            type: Array,
            required: true
        },
        stacked: {
            type: Boolean,
            default: false,
        },
        datasets: {
            type: Array,
            required: true
        },
        backgroundColor: {
            type: String,
            default: "#F0F"
        },
        borderColor: {
            type: String,
            default: "#FFF"
        }
    },
    computed: {
        data() {
            return {
                labels: this.xLabels,
                datasets: this.datasets
            }
        },
        options() {
            return {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        ...(this.stacked ? {stacked: true} : {}),
                    }],
                    xAxes: [{
                        ...(this.stacked ? {stacked: true} : {}),
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                plugins: {
                    zoom: {
                        // pan: {
                        //     enabled: true,
                        //     mode: 'xy' // is panning about the y axis neccessary for bar charts?
                        // },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            sensitivity: 3
                        }
                    }
                }

            }
        }
    },
    mounted() {
        this.addPlugin(zoom);
        this.renderChart(this.data, this.options);
    }
};