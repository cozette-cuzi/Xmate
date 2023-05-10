<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-select
                    :items="groupByOptions"
                    label="Group By"
                    v-model="groupBy"
                    :style="!canGroupBy ? 'visibility:hidden;' : ''"
            ></v-select>
        </v-flex>
        <v-flex xs12 md6>
            <ChooseDate clearable v-model="startDate" label="Start Date"/>
        </v-flex>
        <v-flex xs12 md6>
            <ChooseDate clearable v-model="endDate" label="End Date"/>
        </v-flex>
        <v-flex xs12>
            <bar-chart :x-labels="xLabels"
                       :datasets="datasets"
                       :stacked="stacked"
            />
        </v-flex>
    </v-layout>
</template>

<script>
    import BarChart from "@/components/widgets/statistic/BarChart";
    import moment from "moment";
    import ChooseDate from "@/components/utils/input/ChooseDate";

    export default {
        name: "BarWithGrouping",
        components: {BarChart, ChooseDate},
        data() {
            return {
                groupBy: this.defaultGroupBy,
                groupByOptions: ['day', 'week', 'month', 'quarter', 'year'],
                startDate: this.initialStartDate,
                endDate: this.initialEndDate
            }
        },
        watch: {
            defaultGroupBy(val) {
                if (this.canGroupBy)
                    this.groupBy = val;
            },
            initialStartDate(val) {
                this.startDate = val;
            },
            initialEndDate(val) {
                this.endDate = val;
            }
        },
        computed: {
            format() {
                let format = "";
                switch (this.groupBy) {
                    case "day":
                        format = "YYYY-MM-DD";
                        break;
                    case "week":
                        format = "YYYY Wo";
                        break;
                    case "month":
                        format = "YYYY-MM";
                        break;
                    case "quarter":
                        format = "YYYY Qo";
                        break;
                    case "year":
                        format = "YYYY";
                        break;
                }
                return format;
            },
            groupedData() {
                return this.data.map(arr => this.xLabels.map(
                    xLabel => {
                        const filtered = arr.filter(({date}) => (this.canGroupBy ? moment(date).format(this.format) : date) === xLabel);
                        let reduced = filtered.reduce((prev, {value}) => prev + value, 0);
                        if (this.groupFunction === 'avg')
                            reduced /= filtered.length;
                        return reduced;
                    }
                ));
            },
            xLabels() {
                let dates = [];
                for (const dataset of this.data)
                    for (const {date} of dataset)
                        if ((this.startDate != null ? moment(date) >= moment(this.startDate) : true) && (this.endDate != null ? moment(date) <= moment(this.endDate) : true))
                            if (dates.indexOf(date) === -1)
                                dates.push(date);
                if (this.canGroupBy)
                    dates = dates.reduce((prev, item) => {
                        const groupedValue = moment(item).format(this.format);
                        if (prev.indexOf(groupedValue) === -1)
                            prev.push(groupedValue);
                        return prev;
                    }, []);

                dates.sort();
                return dates;
            }
            ,
            datasets() {
                const datasets = [];
                for (let i = 0; i < this.groupedData.length; i++)
                    datasets.push(
                        {
                            "label": this.labels[i],
                            "data": this.groupedData[i].map(i => i.toFixed(2)),
                            "fill": false,
                            "backgroundColor": this.backgroundColors[i],
                            "borderColor": this.borderColors[i],
                            "borderWidth": 1
                        });
                return datasets;
            }
        },
        props: {
            groupFunction: {
                type: String,
                default: "sum"
            },
            defaultGroupBy: {
                type: String,
                default: "day",
                validator: (val) => ['day', 'week', 'month', 'quarter', 'year'].indexOf(val) !== -1
            },
            initialStartDate: {
                type: String,
                default: null
            },
            initialEndDate: {
                type: String,
                default: null
            },
            stacked: {
                type: Boolean,
                default: false
            },
            backgroundColors: {
                type: Array,
                required: true,
            },
            borderColors: {
                type: Array,
                required: true
            },
            canGroupBy: {
                type: Boolean,
                default: true
            },
            labels: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style>
</style>