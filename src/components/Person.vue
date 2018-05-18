<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-layout v-if="!edited" wrap>
          <v-btn
            flat
            fab
            absolute
            right
            icon
            @click="edited = true"
          >
            <v-icon>edit</v-icon>
          </v-btn>
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
          <v-btn
            flat
            fab
            absolute
            right
            icon
            :loading="loading"
            @click="savePerson"
          >
            <v-icon>done</v-icon>
          </v-btn>
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
      </v-container>
    </v-card-text>
  </v-card>

</template>

<script>
  import { axios } from '../http'

  export default {
    props: {
      person: {
        type: Object,
        required: true,
      }
    },
    name: "person",
    data() {
      return {
        edited: false,
        loading: false,
      }
    },
    methods: {
      savePerson() {
        this.loading = true
        axios.put(
          `people/${this.person._id}`,
          {
            name: this.person.name,
            skills: this.person.skills
          }
        ).then(response => {
          this.loading = false
          this.edited = false
          console.log(response.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
