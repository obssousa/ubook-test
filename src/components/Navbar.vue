<template>
  <div>
    <v-toolbar elevation="0">
      <img :src="require('../assets/ic-logo.svg')" class="ic_logo" />

      <div v-if="contacts.length > 0" class="text-center button-contact">
          <v-btn
            class="living-coral--text"
            color="light-yellowish-green"
            rounded
            dark
            @click.stop="showModal()"
          >
            <v-icon left> mdi-plus </v-icon>
            Criar contato
          </v-btn>
        </div>
      <v-spacer></v-spacer>

      <v-text-field
      v-model="searchModel"
        elevation="0"
        style="margin-top: -3px; height: 32px"
        solo
        label="Buscar..."
        clearable
        dense
        append-icon="mdi-magnify"
        v-on:keydown="editFilter(searchModel)"
      ></v-text-field>
    </v-toolbar>
    <ContactModal :key="render" :mode="'CREATE'" v-model="showCreate" />
  </div>
</template>

<script>
import ContactModal from '@/components/modals/ContactModal'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navbar',
  data: () => ({
    searchModel: '',
    showCreate: false,
    render: 0
  }),
  computed: {
    ...mapGetters({
      contacts: 'Contacts/getContacts'
    })
  },
  components: {
    ContactModal
  },
  methods: {
    ...mapActions('Contacts', ['editFilter']),
    showModal () {
      this.showCreate = true
      this.render += 1
    }
  }
}
</script>
<style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 0px 0px 0px 0px !important;
  background-color: $pale-lilac;
}

.button-contact {
  margin-left: 60px;
}
</style>
