<template>
    <v-select
            label="Gender"
            :items="[{text: 'Male',value: api.CONSTANTS.GENDER.MALE},{text: 'Female',value: api.CONSTANTS.GENDER.FEMALE}]"
            v-model="gender"
            :rules="rules"
            append-icon="fa fa-venus-mars"
    />
</template>

<script>
    export default {
        props: ['value', 'label', 'rules'],
        name: "choose-gender",
        data() {
            return {
                gender: this.value
            }
        },
        mounted() {
            if (this.value === undefined)
                this.$emit('input', this.api.CONSTANTS.GENDER.MALE);
        },
        watch: {
            gender(val) {
                this.$emit('input', val ? 1 : 0);
            },
            value(val) {
                this.gender = val;
            }
        }
    }
</script>

<style scoped>

</style>
