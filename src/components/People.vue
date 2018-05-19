<template>
  <v-container  grid-list-md >
    <v-layout row wrap>
      <template
        v-for="(person, i) in people"
      >
        <v-flex xs4>
          <person
            :key="person._id"
            :value="person"
            @input="people[i] = $event"
            @delete="remove"
          ></person>
        </v-flex>
      </template>
    </v-layout>
    <v-btn
      fab
      fixed
      right
      bottom
      @click="add"
      color="pink"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { axios } from '../http'
  import Person from './Person'

  export default {
    name: 'people',
    components: { Person },
    data() {
      return {
        people: null,
        dialog: false,
        newPerson: {
          name: '',
          skills: [],
        },
        edited: {}
      }
    },
    methods: {
      get() {
        axios.get('people').then(response => {
          this.people = response.data._items
        })
      },
      add() {
        this.people.unshift({})
      },
      remove(person) {
        if (person._id) {
          this.people = this.people.filter(p => p._id !== person._id)
        } else {
          this.people.splice(0, 1)
        }
      },
    },
    mounted() {
      this.get()
    },
  }
</script>
