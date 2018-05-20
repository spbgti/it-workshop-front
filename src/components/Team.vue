<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-layout>
          <v-flex xs11>
            <v-layout v-if="!edited" row wrap>
              <v-flex xs12>
                {{ team.name }}
              </v-flex>
              <v-flex xs12>
                <v-chip
                  v-for="person in team.people"
                  :key="person.id"
                >
                  {{ person.name }}
                </v-chip>
              </v-flex>
            </v-layout>
            <v-layout wrap v-else>
              <v-flex xs12>
                <v-text-field
                  label="Имя"
                  v-model="team.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <people-select
                  label="Члены команды"
                  v-model="team.people"
                ></people-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-btn
              v-if="!edited"
              flat
              fab
              icon
              @click="edited = true"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              v-if="edited"
              flat
              fab
              icon
              :loading="loading"
              @click="deleteTeam"
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
              v-if="created"
              flat
              fab
              icon
              :loading="loading"
              @click="createTeam"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="edited && !created"
              flat
              fab
              icon
              :loading="loading"
              @click="updateTeam"
            >
              <v-icon>done</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

</template>

<script>
  import { axios } from '../http'
  import PeopleSelect from './PeopleSelect'

  export default {
    components: { PeopleSelect },
    props: {
      value: {
        type: Object,
        required: true,
      }
    },
    name: "team",
    data() {
      return {
        team: this.value,
        edited: false,
        loading: false,
        created: false,
      }
    },
    mounted() {
      if (Object.keys(this.team).length === 0) {
        this.edited = true
        this.created = true
        this.team = {name: '', people: []}
      }
    },
    methods: {
      createTeam() {
        this.loading = true
        axios.post(
          `teams`,
          {
            name: this.team.name,
            people: this.team.people.map(person => person._id)
          },
          {
            auth: {
              username: this.$root.username,
              password: this.$root.password
            }
          }
        ).then(response => {
          this.team = Object.assign(this.team, response.data)
          this.$emit('input', this.team)
          this.loading = false
          this.edited = false
          this.created = false
        })
      },
      updateTeam() {
        this.loading = true
        axios.put(
          `teams/${this.team._id}`,
          {
            name: this.team.name,
            people: this.team.people.map(person => person._id)
          },
          {
            auth: {
              username: this.$root.username,
              password: this.$root.password
            }
          }
        ).then(response => {
          this.loading = false
          this.edited = false
        })
      },
      deleteTeam() {
        this.loading = true
        if (this.team._id) {
          axios.delete(
            `teams/${this.team._id}`,
          ).then(response => {
            this.loading = false
            this.$emit('delete', this.team)
          })
        } else {
          this.$emit('delete', this.team)
        }

      }
    },
  }
</script>

<style scoped>

</style>
