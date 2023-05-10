<template>
  <div id="pageDashboard">
    <loading-component :value="loading"/>
    <template>

    </template>
  </div>
</template>

<script>
import Material from 'vuetify/es5/util/colors';
import ChooseDate from "@/components/utils/input/ChooseDate";
import LoadingComponent from "@/components/LoadingComponent";
import DataTable from "@/components/utils/DataTable";

export default {
  title: 'Dashboard',
  components: {
    DataTable,
    LoadingComponent,
    ChooseDate
  },
  data() {
    return {
      groups: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups()
    {
      this.axios.get(this.api.ACTIONS.GROUPS)
          .then(
              res => {
                this.groups = res.data.data.data;
                this.loading = false;
              }
          ).catch(
          x => {
            this.error = x.response.data.message;
          }
      ).finally(
          () => this.loading = false
      )
    }
  }
};
</script>

<style>
.layout {
  background-color: white;
  margin-top: 5px;
  border: 1px solid lightgrey;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  padding:10px
}
</style>
