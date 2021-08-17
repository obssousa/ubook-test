<template>
  <v-app>
    <Navbar />
    <Main />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Main from './pages/Main'

export default {
  name: 'App',

  components: {
    Main,
    Navbar
  },

  data: () => ({
    //
  })
}
</script>
