<template>
    <div>
        <loading :value="loading" message="Searching"></loading>
        <v-toolbar flat color="white">
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    @keyup.enter="getData"
            ></v-text-field>
        </v-toolbar>
        <v-card>

        </v-card>
        <transition name="fade">
            <v-data-table
                    :headers="headers" :items="data"
                    class="elevation-1">
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.username }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td class="text-xs-left">{{ props.item.first_name }}</td>
                    <td class="text-xs-left">{{ props.item.last_name }}</td>
                    <td class="text-xs-left">
                        {{ ! props.item.deleted_at ? (props.item.approved_at ? 'Active' : 'Inactive') : 'Archive' }}
                    </td>
                    <td class="text-xs-left">{{ moment(props.item.created_at).format('MMM YYYY') }}</td>
                    <td class="text-xs-left">{{ props.item.deleted_at ? moment(props.item.deleted_at).format('MMM YYYY')
                        : '-' }}
                    </td>
                    <td>
                        <v-icon @click="$router.push(`${provider}/${props.item.id}`)">info</v-icon>
                    </td>
                </template>
            </v-data-table>
        </transition>
    </div>
</template>

<script>
    import DataTable from "@/components/utils/DataTable";
    import loading from "@/components/LoadingComponent";

    export default {
        name: "Search",
        components: {loading, DataTable},
        props: ['provider'],
        data() {
            return {
                headers: [
                    {text: '#', value: 'id'},
                    {text: 'Username', value: 'username'},
                    {text: 'Email', value: 'email'},
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Status', value: 'status'},
                    {text: 'Created At', value: 'created_at'},
                    {text: 'Deleted At', value: 'deleted_at'}
                ],
                data: [],
                search: '',
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true;
                this.axios.get(`${this.provider.slice(0, -1)}?search=${this.search}`)
                    .then(res => {
                        this.data = res.data.data;
                        if (!Array.isArray(this.data)) {
                            this.data = this.data.data;
                        }
                    }).catch(err => console.log(err.message))
                    .finally(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>