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
                v-model="time"
                :rules="rules"
                append-icon="today"
                readonly
        ></v-text-field>
        <v-time-picker
                v-model="time"/>
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
        name: "choose-time",
        data() {
            return {
                time: this.value
            }
        },
        watch: {
            time(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.time = val;
            }
        }
    }
</script>

<style scoped>

</style>