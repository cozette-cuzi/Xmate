<template>
    <div>
        <img :src="imageUrl" height="150" v-if="imageUrl"/>
        <v-text-field :label="label"
                      :rules="rules"
                      ref="hinter"
                      @click='$refs.image.click()'
                      v-model='imageName'
                      append-icon='attach_file'
                      readonly
        ></v-text-field>
        <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
        >
    </div>
</template>

<script>
    export default {
        name: "ChooseImage",
        props: {
            'value': {},
            'rules': {
                type: Array,
                default: () => []
            },
            label: {}
        },
        data() {
            return {
                imageUrl: typeof this.value === 'string' ? this.api.GET_IMAGE(this.value) : '',
                imageName: '',
                imageFile: ''
            }
        },
        mounted() {
            this.$emit('input', undefined);
        },
        methods: {
            validate() {

            },
            onFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    this.imageName = files[0].name;
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0];
                        this.$emit('input', this.imageFile);

                    })
                } else {
                    this.imageName = '';
                    this.imageFile = '';
                    this.imageUrl = '';
                }
            },

        },
        watch: {
            value(value) {
                if (typeof value === 'string') {
                    this.imageUrl = this.api.GET_IMAGE(this.value);
                } else {
                    this.imageFile = value;
                }
            }
        }
    }
</script>

<style scoped>

</style>