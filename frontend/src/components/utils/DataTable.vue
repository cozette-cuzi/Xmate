<template>
    <div>
        <v-toolbar flat color="white"
                   v-if="title || !disableSearch && items.length !== 0 || enableAdd || selected.length > 0">
            <v-toolbar-title v-if="title">{{title}}</v-toolbar-title>
            <v-divider
                    v-if="title"
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-text-field
                    v-if="!disableSearch && items.length !== 0"
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    @keyup.enter="getData"
            />
            <v-spacer v-if="enableAdd"></v-spacer>
            <v-btn v-if="enableAdd" color="primary" dark class="mb-2" @click='action(null,"add")'>New</v-btn>
            <template v-if="selected.length > 0">
                <v-btn v-for="action in selectedActions" :color="action.color" dark class="mb-2"
                       @click='selectAction(action)'>{{action.title}}
                </v-btn>
            </template>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form">
                                <v-layout wrap>
                                    <v-flex xs12 v-for="prop in activeHeaders">
                                        <component
                                                :is="prop.component"
                                                v-model="activeItem[prop.value]"
                                                :label="prop.text"
                                                :disabled="activeDisabled.indexOf(prop.value) !== -1"
                                                :rules="activeRules[prop.value]"
                                                v-bind="inputTypes && inputTypes[prop.value] ?( inputTypes[prop.value] instanceof Object ? inputTypes[prop.value] : {type: inputTypes[prop.value]} ): {}"
                                        ></component>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :expand="expand"
                :item-key="item_key"
                :headers="( items && items.length > 0 ) ? headers : []"
                :items="items"
                :must-sort="sortable"
                :loading="loading"
                :select-all="selectable ? 'Select' : undefined"
                :total-items="totalItems"
                :pagination.sync="pagination"
                :rows-per-page-items="pagination.rowsPerPageItems"
                :value="selected"
                @input="(val) => selectable ? selected = val : null"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <tr :class="rowCallBack(props.item)" :active="props.selected" @click="props.selected = !props.selected">
                    <td v-if="selectable !== undefined">
                        <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                        ></v-checkbox>
                    </td>
                    <td v-for='prop in headers.filter(x => x.value != "actions")'
                        v-html='format(prop.value,"show",props.item[prop.value],props.item)'></td>
                    <td class="justify-center layout px-0" v-if="enableEdit|| enableDelete || actionsExtraMain">
                        <v-icon
                                v-if="enableEdit && allowedAction('edit',props.item)"
                                small
                                class="mr-2"
                                @click='action(props.item,"edit")'
                        >
                            edit
                        </v-icon>
                        <v-icon
                                v-if="enableDelete && allowedAction('delete',props.item)"
                                small
                                @click='action(props.item,"delete")'
                        >
                            delete
                        </v-icon>
                        <template v-if="actionsExtraMain" v-for="(act,key) of actionsExtraMain">
                            <template v-if="allowedAction(key,props.item)">
                                <v-icon v-if="act.icon" class="mr-2" v-bind="!!act.extras ? act.extras : {small:true}"
                                        @click="action(props.item,key)">
                                    {{act.icon}}
                                </v-icon>
                                <v-btn v-else-if="act.title" :color='act.color ? act.color : "info"' class="mr-2"
                                       @click="action(props.item,key)"
                                       v-bind="!!act.extras ? act.extras : {small: true} ">
                                    {{act.title}}
                                </v-btn>
                            </template>
                        </template>
                        <template v-if="is_expanded">
                            <template>
                                <v-icon class="mr-2"
                                        @click="!tableClick(props.item.id) ? props.selected = !props.selected : props.expanded = !props.expanded">
                                    info
                                </v-icon>
                            </template>
                        </template>
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <template v-if="!loading">
                    <div class="text-sm-center">
                        <b>No data available</b>
                    </div>
                    <v-btn color="primary" @click="reset">Reset</v-btn>
                </template>
            </template>
            <template v-slot:expand="props" v-show="is_expanded">
                <v-card flat class="expanded">
                    <v-card-text v-if="selected_expand_row_id">
                        <DataTable
                                :url.sync="computed_expand_url"
                                :enable-edit="false"
                                :enable-delete="false"
                                :enable-add="false"
                                :disable-search="true"
                                :fieldsHiddenMain='["deleted_at"]'/>
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import globalComponents from "./globalComponents";

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    export default {
        name: "DataTable",
        components: {...globalComponents},
        props: {
            is_expanded: {type: Boolean, default: false},
            expand_url: {type: String, default: null},
            url: {type: String, required: true,},
            titles: Object, // key => title
            fieldsHiddenMain: Array,
            fieldsHiddenAdd: Array,
            fieldsHiddenEdit: Array,
            fieldsDisabledAdd: Array,
            fieldsDisabledEdit: Array,
            forceReload: {type: Boolean, default: false},
            selectedActions: Object, // key = { async do(items) // return {shouldReloadData: boolean , shouldClearSelected:boolean} , title , color }
            fieldsExtraAdd: Object, // key => component :even existing fields:
            fieldsExtraMain: Object, // key => function(item)
            fieldsExtraEdit: Object, // key => component :even existing fields:
            formatter: Object, // key => function(value) to format
            actionsExtraMain: Object, // key => {icon => "font awesome icon"  , action= function(item) , link = function(item) }
            inputTypesAdd: Object, // key => string
            inputTypesEdit: Object, // key => string
            addRules: Object,
            editRules: Object,
            initialUrlSearchParams: {type: URLSearchParams, default: () => new URLSearchParams()},
            selectable: {type: String, default: undefined},
            rowCallBack: {type: Function, default: () => []},// function ( item ) return classes
            loadBeforeEdit: Boolean,
            disableSearch: {type: Boolean, default: false},
            title: [String, Boolean],
            sortable: {type: Boolean, default: true},
            enableEdit: {type: Boolean, default: true},
            enableAdd: {type: Boolean, default: true},
            enableDelete: {type: Boolean, default: true},
            descending: {type: Boolean, default: false},
            sortBy: {type: String, default: "id"},
            conditionalAction: {type: Object, default: () => null},
            postExtraData: {type: Object, default: () => ({})},
            editExtraData: {type: Object, default: () => ({})},
            deleteExtraData: {type: Object, default: () => ({})},
        },
        data() {
            return {
                expand: false,
                item_key: '',
                selected_expand_row_id: null,
                selected: [],
                dialog: false,
                pagination: {
                    rowsPerPage: 10,
                    rowsPerPageItems: [5, 10, 15, 25, 100],
                    descending: this.descending,
                    sortBy: this.sortBy
                },
                headers: [],
                editHeaders: [],
                addHeaders: [],
                deleteHeaders: [],
                search: '',
                items: [],
                totalItems: 0,
                editedIndex: -1,
                oldEditedItem: {},
                editedItem: {},
                defaultItem: {},
                loading: false,
                apiShot: null,
                firstTime: true
            }
        },

        computed: {
            computed_expand_url() {
                return `payment/ride/${this.selected_expand_row_id}/bookings`;
            },
            inputTypes() {
                return this.editedIndex === -1 ? this.inputTypesAdd : this.inputTypesEdit;
            },
            formTitle() {
                return this.editedIndex === -1 ? 'New' : 'Edit'
            },
            activeHeaders() {
                return this.editedIndex === -1 ? this.addHeaders : this.editHeaders;
            },
            activeItem() {
                return this.editedIndex === -1 ? this.defaultItem : this.editedItem;
            },
            activeDisabled() {
                let arr = this.editedIndex === -1 ? this.fieldsDisabledAdd : this.fieldsDisabledEdit;
                if (!arr) arr = [];
                return arr;

            },
            activeRules() {
                const rules = this.editedIndex === -1 ? this.addRules : this.editRules;
                return !!rules ? rules : {};
            }
        },
        watch: {
            headers: {
                handler(val) {
                    if (val.length)
                        this.item_key = val[0].value;
                },
                deep: true
            },
            dialog(val) {
                val || this.close()
            },
            url(val) {
                this.data = [];
                this.reset();
            },
            initialUrlSearchParams() {
                this.reset();
            },
            pagination: {
                handler() {
                    this.getData();
                }
                ,
                deep: true
            }
            ,
        },
        methods: {
            tableClick(id) {
                if (this.is_expanded) {
                    this.selected_expand_row_id = id;
                    return true;
                }
                return false;
            },
            getData() {
                this.loading = true;
                const params = new URLSearchParams(this.initialUrlSearchParams);
                params.append('page', this.pagination.page);
                params.append("perPage", String(this.pagination.rowsPerPage));
                params.append("sortBy", String(this.pagination.sortBy));
                params.append("descending", String(this.pagination.descending));
                params.append("search", String(this.search));
                this.axios.get(this.url, {params}).then(response => {
                    const data = response.data.data;
                    this.loading = false;
                    this.setHeadersUp(data.data[0]);
                    this.items = data.data;
                    this.totalItems = data.total;
                    this.pagination.rowsPerPage = Number(data.per_page);
                }).catch(exc => {
                    console.log(exc);
                    // this.$router.push({name: "NotFound"});
                });
            },
            initializeHeadersObject(data, hiddenFields, ExtraFields, hasActions, withComponent = false) {
                const createObject = (sortable = true, align = 'left') => prop => ({
                    text: this.titles && this.titles[prop] ? this.titles[prop] : prop,
                    value: prop,
                    sortable: sortable && this.sortable,
                    align,
                    ...(withComponent ? ExtraFields && ExtraFields[prop] ? {component: ExtraFields[prop]} : {component: 'v-text-field'} : {})
                });
                return [
                    ...Object.keys(data).filter(key =>
                        !(hiddenFields && hiddenFields.indexOf(key) !== -1 || ExtraFields && ExtraFields[key])
                    ).map(createObject()),
                    ...(ExtraFields ? Object.keys(ExtraFields).map(createObject(false)) : []),
                    ...(hasActions ? [createObject(false, 'center')('actions')] : [])
                ];
            },
            setHeadersUp(data) {
                if (data === undefined) data = {};
                const hasActions = this.enableDelete || this.enableEdit || (this.actionsExtraMain && this.actionsExtraMain.length > 0);
                this.headers = this.initializeHeadersObject(data, this.fieldsHiddenMain, this.fieldsExtraMain, hasActions);
                this.editHeaders = this.initializeHeadersObject(data, this.fieldsHiddenEdit, this.fieldsExtraEdit, false, true);
                this.addHeaders = this.initializeHeadersObject(data, this.fieldsHiddenAdd, this.fieldsExtraAdd, false, true);
            },
            reset() {
                this.search = "";
                this.pagination.page = 1;
                this.getData();
            },
            editItem(item) {
                this.oldEditedItem = Object.assign({}, item);
                if (!this.loadBeforeEdit) {
                    this.editedIndex = this.items.indexOf(item);
                    this.editedItem = Object.assign({}, item);
                    this.dialog = true;
                } else {
                    this.loading = true;
                    this.axios.get(this.url + '/' + item.id).then(
                        ({data}) => {
                            this.editedIndex = this.items.indexOf(item);
                            this.editedItem = Object.assign({}, data.data);
                            this.dialog = true;
                            this.loading = false;
                        }
                    )
                }
            },
            addItemToTable(item, top = true) {
                this.items = top ? [item, ...this.items] : [...this.items, item];
                if (this.items.length === 1) this.setHeadersUp(item);
                this.totalItems++;
            },
            // object => exact match , function => return true if want to edit , else must be index
            editItemInTable(criteria, newFields) {
                if (typeof criteria === 'object')
                    this.items = this.items.map(item =>
                        (JSON.stringify(item) === JSON.stringify(criteria)) ? Object.assign({}, item, newFields) : item
                    );
                else if (typeof criteria === 'function')
                    this.items = this.items.map(item => criteria(item) ? Object.assign({}, item, newFields) : item);
                else
                    this.items[criteria] = Object.assign({}, this.items[criteria], newFields);
            },
            // object => exact match , int => index in items table , function(item) => should return false if want to remove
            removeItemFromTable(criteria) {
                if (typeof criteria === 'object')
                    this.items = this.items.filter(item => JSON.stringify(item) !== JSON.stringify(criteria));
                else if (typeof criteria === 'function')
                    this.items = this.items.filter(criteria);
                else
                    this.items.splice(criteria, 1);
                this.items.totalItems--;
            },
            deleteItem(item) {
                confirm('Are you sure you want to delete this item?') && (() => {
                    this.loading = true;
                    const props = this.getDeleteData(item);
                    this.axios.post(props.url, props.data).then(
                        () => {
                            window.getApp.$emit("SHOW_TOAST", "Deleted", "green");
                            this.removeItemFromTable(item);
                            if (this.forceReload)
                                this.getData();
                        }
                    ).catch(
                        ({response}) => {
                            if (response && response.data && response.data.message)
                                window.getApp.$emit("SHOW_TOAST", response.data.message, "red");
                            else {
                                window.getApp.$emit('SHOW_TOAST', 'Error Happened (Check error log)', "red");
                                console.log(data);
                            }
                        }
                    )
                        .finally(() => {
                            this.loading = false;
                        });
                })()
            },
            async action(item, actionName) {
                this.loading = true;
                let actions = this.actionsExtraMain;
                if (actions) {
                    let action = actions[actionName];
                    if (action) {
                        if (action.action) {
                            let ans = await action.action(item);
                            this.loading = false;
                            if (typeof ans !== "string") return;
                            if (typeof ans === 'object' && ans.shouldReloadData === true)
                                this.getData();
                            action.link = ans;
                        }
                        if (action.link) {
                            this.$router.push({path: action.link});
                            this.loading = false;
                            return;
                        }
                    }
                }
                this.loading = false;
                switch (actionName) {
                    case "delete":
                        this.deleteItem(item);
                        break;
                    case "add":
                        this.dialog = true;
                        break;
                    default:
                        this.editItem(item);
                }
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                let props;
                const item = this.editedIndex === -1 ? null : Object.assign({}, this.items[this.editedIndex]);
                if (this.editedIndex > -1)
                    props = this.getEditData(item);
                else
                    props = this.getPostData();
                if (this.$refs.form.validate() === false) {
                    window.getApp.$emit("SHOW_TOAST", "FILL ALL FIELDS!", 'primary');
                    return;
                }
                const formData = new FormData();
                for (let key in props.data) {
                    if (props.data[key] instanceof Array)
                        for (let index in props.data[key])
                            formData.append(key + '[' + index + ']', props.data[key][index]);
                    else
                        formData.append(key, typeof props.data[key] === "boolean" ? props.data[key] + 0 : props.data[key]);
                }
                this.loading = true;
                this.axios.post(props.url, formData).then(
                    ({data}) => {
                        window.getApp.$emit('SHOW_TOAST', 'Saved !', 'green');
                        if (!item) {
                            this.defaultItem = {};
                            if (data.data instanceof Array)
                                data.data.map(this.addItemToTable);
                            else
                                this.addItemToTable(data.data);
                        } else {
                            this.editItemInTable(item, data.data);
                        }
                        if (this.forceReload)
                            this.getData();
                    }
                ).catch(
                    ({response}) => {
                        if (response && response.data && response.data.message)
                            window.getApp.$emit("SHOW_TOAST", response.data.message, "red");
                        else {
                            window.getApp.$emit('SHOW_TOAST', "Couldn't save (error happened check error log)!", 'red');
                            console.log(data);
                        }
                    }
                ).finally(
                    () => this.loading = false
                );
                this.close();
            },
            getEditData(item) {
                let method = "PUT";
                let extraData = this.editExtraData;
                let url = this.url + '/' + item.id;
                const edited = Object.keys(this.editedItem).filter(
                    key => JSON.stringify(this.editedItem[key]) !== JSON.stringify(this.oldEditedItem[key]) && this.editedItem[key] !== undefined
                ).map(key => ({[key]: this.editedItem[key]}));
                if (edited.length === 0)
                    edited.push({});
                let itemData = Object.assign(...edited);
                return {data: {_method: method, ...itemData, ...extraData}, url};
            },
            getPostData() {
                let method = "POST";
                let extraData = this.postExtraData;
                let item = Object.assign({}, this.defaultItem);
                if (Object.keys(item).length === 0)
                    return {};
                item = Object.assign(...Object.keys(item).filter(key => this.defaultItem[key] !== undefined).map((key) => ({[key]: item[key]})));
                let url = this.url;
                return {data: {_method: method, ...item, ...extraData}, url};
            },
            getDeleteData(item) {
                let method = "DELETE";
                let url = this.url + "/" + item.id;
                let extraData = this.deleteExtraData;
                return {data: {...extraData, _method: method}, url};
            },
            format(fieldName, mode, value, item) { // mode == show | edit | add
                let extraField;
                let filter;
                extraField = this.fieldsExtraMain;
                filter = this.formatter;
                if (value === undefined && extraField && extraField[fieldName]) value = extraField[fieldName](item);
                if (filter) {
                    filter = filter[fieldName];
                    if (typeof filter === "function") {
                        if (filter.length == 2)
                            return filter(value, item);
                        else
                            return filter(value);
                    }
                }

                return escapeHtml(value === null || value === undefined ? "" : value.toString());
            },
            selectAction(action) {
                this.loading = true;
                action.do(this.selected).then((res) => {
                    if (res == null) res = {};
                    if (res.shouldClearSelected === true) this.selected = [];
                    this.loading = false;
                    if (res.shouldReloadData === true) this.getData();
                });
            },
            allowedAction(action, item) {
                if (!this.conditionalAction || !this.conditionalAction[action])
                    return true;
                return this.conditionalAction[action](item);
            }
        },
    }
</script>

<style scoped>

</style>