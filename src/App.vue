<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-btn icon :to="{name: 'Projects'}">
        <v-icon>slideshow</v-icon>
      </v-btn>
      <v-btn icon v-if="$root.auth" :to="{name: 'Teams'}">
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn icon v-if="$root.auth" :to="{name: 'People'}">
        <v-icon>person</v-icon>
      </v-btn>
      <v-toolbar-title v-text="'IT-Цех'"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{name: 'Login'}">
        <v-icon>vpn_key</v-icon>
      </v-btn>
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
