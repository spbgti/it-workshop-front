<template>
  <div>
    <v-chip
      v-for="person in value"
      close
      :key="person._id"
      class="chip--select-multi"
      @input="remove(person)"
    >
      {{ person.name }}
    </v-chip>
    <v-select
      label="Члены команды"
      @input="add"
      :items="people"
      :value="search"
      :filter="(item, query) => !value.some(p => p._id === item._id) && item.name.includes(query)"
      :search="search"
      :loading="loading"
      item-text="name"
      item-value="_id"
      return-object
      autocomplete
      :search-input.sync="search"
    >
    </v-select>
  </div>

</template>

<script>
  import { axios } from '../http'
  export default {
    name: "people-select",
    props: {
      value: {
        type: Array,
      },
    },
    methods: {
      getPeople() {
        this.loading = true
        const params = {
        }
        if (this.search) {
          params.where = `{"name": {"$regex": ".*${this.search}.*"}}`
        }
        axios.get(
          'people',
          {
            params: params,
          },
        ).then(response => {
          this.loading = false
          this.people = response.data._items
        })
      },
      remove(person) {

        this.$emit('input', this.value.filter(p => p._id !== person._id))
      },
      add(person) {
        this.search = null
        this.$emit('input', this.value.concat(person))
        console.log(person)
      },
    },
    watch: {
      search() {
        this.getPeople()
      }
    },
    data() {
      return {
        people: [],
        search: '',
        loading: false,
      }
    },
    mounted() {
      this.getPeople()
    }
  }
</script>

<style scoped>

</style>
