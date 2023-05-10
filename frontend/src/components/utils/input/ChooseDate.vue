<template>
    <v-menu
            lazy
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-bottom="-24"
            max-width="290px"
    >
        <v-text-field
                slot="activator"
                :label="label"
                :clearable="clearable"
                v-model="date"
                :rules="rules"
                append-icon="today"
                readonly
        ></v-text-field>
        <v-date-picker
                v-model="date"/>
    </v-menu>
</template>

<script>
    export default {
        props: {
            'label': {}, 'value': {}, 'rules': {}, clearable: {
                type: Boolean,
                default: false
            }
        },
        name: "choose-date",
        data() {
            return {
                date: this.value
            }
        },
        watch: {
            date(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.date = val;
            }
        }
    }
</script>

<style scoped>

</style>