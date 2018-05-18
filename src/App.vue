<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-btn icon :to="{name: 'Projects'}">
        <v-icon>slideshow</v-icon>
      </v-btn>
      <v-btn icon :to="{name: 'Teams'}">
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn icon :to="{name: 'People'}">
        <v-icon>person</v-icon>
      </v-btn>
      <v-toolbar-title v-text="'IT-Цех'"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
