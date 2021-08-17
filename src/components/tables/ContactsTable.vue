<template>
  <v-container>
    <v-data-table
    :key = "render"
    hide-default-footer
      :headers="headers"
      :items="contacts"
      :search="search"
      class="elevation-1"
    >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editContact(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="removeContact(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:header.name="{ header }">
      <span style="margin-left: 51px"> {{ header.text }} </span>
    </template>
    <template v-slot:item.name="{ item }">
    <v-btn
      class="mr-4"
      elevation="0"
      fab
      dark
      x-small
      :color="getColor()"
    >
      {{ item.avatar.toUpperCase() }}
    </v-btn>
    {{ item.name }}
      </template>
    </v-data-table>
      <ContactModal :form="selected" :mode="'EDIT'" v-model="showEdit" @finish="render += 1" />
      <RemoveContactModal :form="selected" v-model="showDelete" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RemoveContactModal from '@/components/modals/RemoveContactModal'
import ContactModal from '@/components/modals/ContactModal'

export default {
  name: 'ContactsTable',

  data: () => ({
    render: 0,
    selected: {
      id: 0,
      avatar: '',
      name: '',
      email: '',
      phone: ''
    },
    headers: [
      {
        text: 'Contatos',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Telefone', value: 'phone', sortable: false },
      { text: '', value: 'actions', align: 'end', sortable: false }
    ],
    showDelete: false,
    showEdit: false
  }),
  components: {
    RemoveContactModal,
    ContactModal
  },
  computed: {
    ...mapGetters({
      contacts: 'Contacts/getContacts',
      search: 'Contacts/getSearch'
    })
  },
  methods: {
    editContact (item) {
      this.selected = { ...item }
      this.showEdit = true
    },
    removeContact (item) {
      this.selected = item
      this.showDelete = true
    },
    getColor () {
      return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
    }
  }
}
</script>
<style lang="scss">

span {
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9198af;
}

tbody {
     tr:hover {
        background-color: #fff3f2 !important;
     }
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    height: 40px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
    font-size: 0.875rem;
    height: 40px;
}
</style>
