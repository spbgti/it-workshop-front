<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <template
        v-for="(project, i) in projects"
      >
        <v-flex offset-xs3 xs6>
          <project
            :value="project"
            :key="project._id"
            @delete="remove"
          ></project>
        </v-flex>
      </template>
    </v-layout>
    <v-btn
      fab
      fixed
      right
      bottom
      @click="add"
      v-if="$root.auth"
      color="pink"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import { axios } from '../http'
  import Project from './Project'

  export default {
    name: 'projects',
    components: { Project },
    data() {
      return {
        projects: []
      }
    },
    mounted() {
      this.get()
    },
    methods: {
      get() {
        axios.get(
          'projects',
          {
            'params':
              {
                embedded: '{"team":1, "mentors":1}'
              }
          }
        ).then(response => {
          this.projects = response.data._items
        })
      },
      add() {
        this.projects.unshift({})
      },
      remove(project) {
        if (project._id) {
          this.projects = this.projects.filter(p => p._id !== project._id)
        } else {
          this.projects.splice(0, 1)
        }
      },
    },
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
