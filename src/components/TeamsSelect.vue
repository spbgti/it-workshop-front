<template>
  <div>
    <template v-if="single">
      <v-select
        :label="label"
        :items="teams"
        :value="value"
        @input="select"
        :loading="loading"
        item-text="name"
        item-value="_id"
        return-object
        autocomplete
        :search-input.sync="search"
      ></v-select>
    </template>
    <template v-else>
      <v-select
        :label="label"
        @input="add"
        :items="teams"
        :value="search"
        :filter="(item, query) => !value.some(t => t._id === item._id) && item.name.includes(query)"
        :search="search"
        :loading="loading"
        item-text="name"
        item-value="_id"
        return-object
        autocomplete
        :search-input.sync="search"
      ></v-select>
      <v-chip
        v-for="team in value"
        close
        :key="team._id"
        class="chip--select-multi"
        @input="remove(team)"
      >
        {{ team.name }}
      </v-chip>
    </template>

  </div>

</template>

<script>
  import { axios } from '../http'

  export default {
    name: "teams-select",
    props: {
      value: {
        required: true
      },
      label: {
        type: String,
      },
      single: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      getTeams() {
        this.loading = true
        const params = {
        }
        if (this.search) {
          params.where = `{"name": {"$regex": ".*${this.search}.*"}}`
        }
        axios.get(
          'teams',
          {
            params: params,
          },
        ).then(response => {
          this.loading = false
          this.teams = response.data._items
        })
      },
      remove(team) {
        this.$emit('input', this.value.filter(t => t._id !== team._id))
      },
      add(team) {
        this.search = null
        this.$emit('input', this.value.concat(team))
      },
      select(team) {
        this.$emit('input', team)
      }
    },
    watch: {
      search() {
        this.getTeams()
      }
    },
    data() {
      return {
        teams: [],
        search: '',
        loading: false,
      }
    },
    mounted() {
      this.getTeams()
    }
  }
</script>

<style scoped>

</style>
