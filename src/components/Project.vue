<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-layout>
          <v-flex xs11>
            <template v-if="!edited">
              <v-layout row wrap>
                <v-flex xs2>
                  <v-badge
                    right
                    overlap
                    color="grey lighten-3"
                    :value="Object.keys(project.team || {}).length"
                  >
                    <v-icon slot="badge">group</v-icon>
                    <v-avatar
                      style="position: absolute; margin: 5px"
                      color="pink lighten-3"
                    >
                      <!--<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png" alt="avatar">-->
                      {{  }}
                    </v-avatar>
                    <v-progress-circular
                      style="transform: scale(-1, 1)"
                      :value="project.progress"
                      :size="58"
                      :rotate="-90"
                      color="pink"
                    ></v-progress-circular>
                  </v-badge>

                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <p class="mb-0 title">
                        {{ project.title }}
                      </p>
                    </v-flex>
                    <v-flex xs12 v-if="project.company">
                      <p class="subheading">
                        От
                        <v-chip>
                          <v-avatar color="red lighten-2"> {{ project.company.slice(0, 1) }}</v-avatar>
                          {{ project.company }}
                        </v-chip>
                      </p>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subheading">
                    {{ project.short_description }}
                  </p>
                </v-flex>
              </v-layout>
            </template>
            <template v-else>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Название проекта"
                    v-model="project.title"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-slider
                    label="Прогресс"
                    v-model="project.progress"
                    thumb-label
                  ></v-slider>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Короткое описание"
                    v-model="project.short_description"
                    :counter="120"
                    multi-line
                    rows="2"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Полное описание"
                    v-model="project.full_description"
                    multi-line
                    rows="20"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Ссылка на проект"
                    v-model="project.link"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Ссылка на исходный код"
                    v-model="project.source"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <teams-select
                    label="Команда"
                    v-model="project.team"
                    single
                  ></teams-select>
                </v-flex>
                <v-flex xs12>
                  <people-select
                    label="Менторы"
                    v-model="project.mentors"
                  ></people-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Партнёр"
                    v-model="project.company"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>
          <v-flex xs1>
            <v-btn
              v-if="$root.auth && !edited"
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
              @click="deleteProject"
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
              v-if="created"
              flat
              fab
              icon
              :loading="loading"
              @click="createProject"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              v-if="edited && !created"
              flat
              fab
              icon
              :loading="loading"
              @click="updateProject"
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
  import TeamsSelect from "./TeamsSelect";
  import PeopleSelect from "./PeopleSelect";

  export default {
    components: {PeopleSelect, TeamsSelect },
    props: {
      value: {
        type: Object,
        required: true,
      }
    },
    name: "project",
    data() {
      return {
        project: this.value,
        edited: false,
        loading: false,
        created: false,
      }
    },
    mounted() {
      if (Object.keys(this.project).length === 0) {
        this.edited = true
        this.created = true
        this.project = this.default()
      }
    },
    methods: {
      createProject() {
        this.loading = true
        axios.post(
          `projects`,
          {
            title: this.project.title,
            short_description: this.project.short_description,
            full_description: this.project.full_description,
            link: this.project.link,
            progress: this.project.progress,
            source: this.project.source,
            team: this.project.team && this.project.team._id,
            company: this.project.company,
            mentors: this.project.mentors.map(m => m._id),
          },
          {
            auth: {
              username: this.$root.username,
              password: this.$root.password
            }
          }
        ).then(response => {
          this.project = Object.assign(this.project, response.data)
          this.$emit('input', this.project)
          this.loading = false
          this.edited = false
          this.created = false
        })
      },
      updateProject() {
        this.loading = true
        axios.put(
          `projects/${this.project._id}`,
          {
            title: this.project.title,
            short_description: this.project.short_description,
            progress: this.project.progress,
            full_description: this.project.full_description,
            link: this.project.link,
            source: this.project.source,
            team: this.project.team && this.project.team._id,
            company: this.project.company,
            mentors: this.project.mentors.map(m => m._id),
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
      deleteProject() {
        this.loading = true
        if (this.project._id) {
          axios.delete(
            `projects/${this.project._id}`,
          ).then(response => {
            this.loading = false
            this.$emit('delete', this.project)
          })
        } else {
          this.$emit('delete', this.project)
        }
      },
      default() {
        return {
          title: '',
          short_description: '',
          full_description: '',
          link: '',
          progress: 0,
          source: '',
          company: '',
          team: {},
          mentors: [],
        }
      }
    },
  }
</script>

<style scoped>

</style>
