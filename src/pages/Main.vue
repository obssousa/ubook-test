<template>
  <v-container>
    <ContactsTable v-if="contacts.length > 0" />
    <v-row v-else class="text-center mt-16">
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          <img :src="require('../assets/ic-book.svg')" class="ic_logo" />
        </h2>

        <v-row justify="center">
          {{ "Nenhum contato foi criado ainda." }}
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <div class="text-center">
          <v-btn
            class="living-coral--text"
            color="light-yellowish-green"
            rounded
            dark
            @click.stop="showContactModal = true"
          >
            <v-icon left> mdi-plus </v-icon>
            Criar contato
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <ContactModal :mode="'CREATE'" v-model="showContactModal" />
  </v-container>
</template>

<script>
import ContactModal from '@/components/modals/ContactModal'
import ContactsTable from '@/components/tables/ContactsTable'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',

  data: () => ({
    showContactModal: false
  }),
  computed: {
    ...mapGetters({
      contacts: 'Contacts/getContacts'
    })
  },
  components: {
    ContactModal,
    ContactsTable
  }
}
</script>
