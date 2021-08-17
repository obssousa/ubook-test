import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const colors = {
  'pale-lilac': '#e4e7f4',
  'bluey-grey': '#9198af',
  'living-coral': '#fa7268',
  'cloudy-blue': '#c0c3d2',
  'light-yellowish-green': '#dbff90',
  'very-light-pink': '#fff3f2',
  dark: '#2a2d3b'
}

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: colors
    }
  }
})

export default vuetify
