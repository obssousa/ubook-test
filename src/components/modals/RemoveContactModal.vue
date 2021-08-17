<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="text-h7"> Excluir contato </v-card-title>
   <v-divider></v-divider>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="mt-6" style="margin-right: 30px; margin-left: 30px">
          <div style="margin-bottom: 60px;" class="text-h6">
            <span class="font-weight-regular">Deseja realmente excluir o contato?</span>
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
              rounded
              color="living-coral"
              dark
              @click="deleteContact()"
            >
              Excluir
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RemoveContactModal',
  props: {
    value: Boolean,
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    valid: true,
    loading: false
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions('Contacts', ['removeContact']),
    close () {
      this.show = false
    },
    deleteContact () {
      this.removeContact(this.form)
      this.close()
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
