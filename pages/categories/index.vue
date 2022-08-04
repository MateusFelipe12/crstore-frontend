<template>
  <v-container>
    <h1>Categorias</h1>
    <hr>
    <br>
    <v-form v-model="valid">
      <v-text-field
      outlined
      labe="Nome"
      placeholder="Nome"
      v-model="name"
      />
    </v-form>
    <v-btn
    outlined
    @click="persist()"
    >
      Cadasrar
    </v-btn>
  </v-container>
</template>

<script>
name: 'IndexCategoryPage'
export default {
  data () {
    return {
      valid: false,
      name: ''
    }
  },

  methods: {

    async persist () {
      try {
        let response = await this.$axios.$post(`http://localhost:3333/category/persist`, { name: this.name })
        this.$toast.success(`Cadastro realizado com sucesso`)
      } catch (error) {
        
      }
    }
  }

}
</script>