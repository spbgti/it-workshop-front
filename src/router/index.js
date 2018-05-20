import Vue from 'vue'
import Router from 'vue-router'
import People from '../components/People'
import Projects from '../components/Projects'
import Teams from '../components/Teams'
import Login from '../components/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/people',
      name: 'People',
      component: People,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
})
