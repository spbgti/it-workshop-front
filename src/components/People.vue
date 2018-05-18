<template>
  <v-container  grid-list-md >
    <v-layout row wrap>
      <template
        v-for="person in people"
      >
        <v-flex xs4>
          <person :person="person"></person>
        </v-flex>
      </template>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="900">
      <v-btn
        dark
        slot="activator"
        color="pink"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="headline">Новый человек в проекте</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Имя"
                  v-model="newPerson.name"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select
                  v-model="newPerson.skills"
                  :items="[]"
                  label="Навыки"
                  chips
                  tags
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      class="chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                    >
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="clearDialog">Отмена</v-btn>
          <v-btn flat @click.native="createPerson">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      getPeople() {
        axios.get('people').then(response => {
          this.people = response.data._items
        })
      },
      clearDialog() {
        this.dialog = false
        this.newPerson = {name: '', skills: []}
      },
      createPerson() {
        axios.post(
          'people',
          this.newPerson,
        ).then(response => {
          this.clearDialog()
          this.getPeople()
        })
      }
    },
    mounted() {
      this.getPeople()
    },
  }
</script>
