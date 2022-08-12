<template>
  <v-container>
    <h1>Categorias</h1>
    <hr />
    <br />
    <v-form v-model="valid">
      <v-text-field
        outlined
        disabled
        label="Código"
        placeholder="Código"
        v-model="category.id"
        :rules="rule"
        v-if="category.id"
      />
      <v-text-field
        outlined
        label="Nome"
        placeholder="Nome"
        v-model="category.name"
        :rules="rule"
      />
    </v-form>
    <v-btn outlined @click="persist()"> Cadastar </v-btn>
    <v-btn outlined to="/admin/categories"> Cancelar </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: "menu",
  name: "IndexCategoryPage",
  data() {
    return {
      valid: false,

      category: {
        id: null,
        name: "",
      },
      rule: [(v) => !!v || "Campo obrigatorio"],
    };
  },
  created() {
    if (this.$route?.params?.id) {
      this.getCategory(this.$route.params.id);
    }
  },
  methods: {
    async persist() {
      try {
        if (!this.valid) {
          return this.$toast.error(`Preencha todos os campos`);
        }
        if (!this.category.id) {
          let response = await this.$api.post(`/category/persist`, {
            name: this.category.name,
          });
          if (response.type == "error") {
            console.log(response.message);
            return this.$toast.error(
              `Ocorreu um erro, contate o administrador`
            );
          }
          return this.$toast.success(`Cadastro realizado com sucesso`);
        }
        let response = await this.$api.post(`/category/persist`, {
          id: this.category.id,
          name: this.category.name,
        });
        if (response.type == "error") {
          console.log(response.message);
          return this.$toast.error(`Ocorreu um erro, contate o administrador`);
        }
        return this.$toast.success(`Cadastro realizado com sucesso`);
      } catch (error) {
        console.log(error.message);
        return this.$toast.error(`Ocorreu um erro, contate o administrador`);
      }
    },
    async getCategory(id) {
      try {
        this.category = await this.$api.get(`/category/${id}`);
      } catch (error) {
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
  },
};
</script>