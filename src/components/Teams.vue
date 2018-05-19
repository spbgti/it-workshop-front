<template>
  <v-container  grid-list-md >
    <v-layout row wrap>
      <template
        v-for="(team, i) in teams"
      >
        <v-flex xs4>
          <team
            :key="team._id"
            :value="team"
            @input="teams[i] = $event"
            @delete="remove"
          ></team>
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

<script>
  import { axios } from '../http'
  import Team from './Team'
  import PeopleSelect from './PeopleSelect'

  export default {
    name: 'teams',
    components: { Team, PeopleSelect },
    data() {
      return {
        teams: null,
        dialog: false,
        newTeam: {
          name: '',
          people: [],
        },
        edited: {}
      }
    },
    methods: {
      add() {
        this.teams.unshift({})
      },
      remove(team) {
        if (team._id) {
          this.teams = this.teams.filter(t => t._id !== team._id)
        } else {
          this.teams.splice(0, 1)
        }
      },
      get() {
        axios.get(
          'teams',
          {
            'params':
              {
                embedded: '{"people":1}'
              }
          }
        ).then(response => {
          this.teams = response.data._items
        })
      },
    },
    mounted() {
      this.get()
    },
  }
</script>
