<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title v-if="mode === 'CREATE'" class="text-h7"> Criar novo contato </v-card-title>
      <v-card-title v-else class="text-h7"> Editar contato </v-card-title>
      <v-divider></v-divider>
      <v-form ref="contact" v-model="valid" lazy-validation>
        <div class="mt-6" style="margin-right: 30px; margin-left: 30px">
          <div class="text-h6">
            <span class="font-weight-regular">Nome</span>
            <v-text-field
              required
              :rules="nameRules"
              v-model="contact.name"
              outlined
              dense
              @input="checkData()"
            ></v-text-field>
          </div>
          <div class="text-h6">
            <span class="font-weight-regular">Email</span>
            <v-text-field
              v-model="contact.email"
              :rules="emailRules"
              outlined
              required
              dense
            ></v-text-field>
          </div>
          <div class="text-h6">
            <span class="font-weight-regular">Telefone</span>
            <v-text-field
              v-model="contact.phone"
              :rules="phoneRules"
              v-mask="'(##) #####-####'"
              style="max-width: 40%"
              outlined
              required
              dense
            ></v-text-field>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions align="right" justify="right">
          <v-col class="text-right">
            <v-btn
              :loading="loading"
              class="ma-1"
              color="error"
              plain
              @click="close"
              depressed
            >
              Cancelar
            </v-btn>
            <v-btn
              class="button-disabled"
              :disabled="canSave"
              rounded
              color="living-coral"
              dark
              @click="saveContact()"
            >
              Salvar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContactModal',
  props: {
    value: Boolean,
    mode: {
      type: String,
      required: true
    },
    form: {
      type: Object
    }
  },
  data: () => ({
    contact: {
      id: null,
      avatar: null,
      name: null,
      email: null,
      phone: null
    },
    valid: true,
    loading: false,
    canSave: true,
    nameRules: [v => !!v || 'Dê um nome ao contato'],
    emailRules: [
      v => !!v || 'Adicione um email para o contato',
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'E-mail precisa ser válido.'
    ],
    phoneRules: [
      v => !!v || 'Adicione um telefone para o contato',
      v =>
        !v ||
        /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/gm.test(
          v
        ) ||
        'Telefone precisa ser válido.'
    ]
  }),
  watch: {
    form (val) {
      if (val) { this.contact = val }
    },
    deep: true
  },
  computed: {
    ...mapGetters({
      contacts: 'Contacts/getContacts',
      contactId: 'Contacts/getId'
    }),
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
    // contact: {
    //   get () {
    //     if (this.form) {
    //       return this.form
    //     } else {
    //       return
    //     }
    //   },
    //   set (value) {
    //     return value
    //   }
    // }
  },
  methods: {
    ...mapActions('Contacts', ['addContact', 'editContact']),
    close () {
      this.contact = {
        avatar: null,
        name: null,
        email: null,
        phone: null
      }
      this.show = false
    },
    saveContact () {
      if (this.$refs.contact.validate()) {
        this.contact.avatar = this.contact.name.charAt(0)
        if (this.mode === 'CREATE') {
          this.contact.id = this.contactId + 1
          this.addContact(this.contact)
        }
        if (this.mode === 'EDIT') {
          this.editContact(this.contact)
          console.log(this.contact)
          this.$emit('finish')
        }
        this.close()
      }
    },
    checkData (val) {
      if (this.contact.name || this.contact.email || this.contact.phone) this.canSave = false
      else this.canSave = true
    }
  }
}
</script>
<style lang="scss">
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #fa726869 !important;
}

.button-disabled {
  .v-btn__content {
    color: $pale-lilac;
  }
}
</style>
