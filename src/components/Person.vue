<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-layout>
          <v-flex xs11>
            <v-layout v-if="!edited" wrap>
              <v-flex xs12>
                {{ person.name }}
              </v-flex>
              <v-flex xs12>
                <v-chip
                  v-for="skill in person.skills"
                  :key="skill"
                >
                  {{ skill }}
                </v-chip>
              </v-flex>
            </v-layout>
            <v-layout wrap v-else>
              <v-flex xs12>
                <v-text-field
                  label="Имя"
                  v-model="person.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="person.skills"
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
              @click="deletePerson"
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
              v-if="created"
              flat
              fab
              icon
              :loading="loading"
              @click="createPerson"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="edited && !created"
              flat
              fab
              icon
              :loading="loading"
              @click="updatePerson"
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

  export default {
    props: {
      value: {
        type: Object,
        required: true,
      }
    },
    name: "person",
    data() {
      return {
        person: this.value,
        edited: false,
        loading: false,
        created: false,
      }
    },
    mounted() {
      if (Object.keys(this.person).length === 0) {
        this.edited = true
        this.created = true
        this.person = {name: '', skills: []}
      }
    },
    methods: {
      createPerson() {
        this.loading = true
        axios.post(
          `people`,
          {
            name: this.person.name,
            skills: this.person.skills
          },
          {
            auth: {
              username: this.$root.username,
              password: this.$root.password
            }
          }
        ).then(response => {
          this.person = Object.assign(this.person, response.data)
          this.$emit('input', this.person)
          this.loading = false
          this.edited = false
          this.created = false
        })
      },
      updatePerson() {
        this.loading = true
        axios.put(
          `people/${this.person._id}`,
          {
            name: this.person.name,
            skills: this.person.skills
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
      deletePerson() {
        this.loading = true
        if (this.person._id) {
          axios.delete(
            `people/${this.person._id}`,
          ).then(response => {
            this.loading = false
            this.$emit('delete', this.person)
          })
        } else {
          this.$emit('delete', this.person)
        }
      }
    }
  }
</script>

<style scoped>

</style>
