<template>
  <v-container>
    <h1>Pagamentos</h1>
    <hr />
    <br />
    <v-form v-model="valid">
      <v-text-field
        outlined
        disabled
        label="Código"
        placeholder="Código"
        v-model="payment.id"
        :rules="rule"
        v-if="payment.id"
      />
      <v-text-field
        outlined
        label="Nome"
        placeholder="Nome"
        v-model="payment.type"
        :rules="rule"
      />
    </v-form>
    <v-btn outlined @click="persist()"> Cadastar </v-btn>
    <v-btn outlined to="/admin/payments"> Cancelar </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: "menu",
  type: "IndexpaymentsPage",
  data() {
    return {
      valid: false,

      payment: {
        id: null,
        type: "",
      },
      rule: [(v) => !!v || "Campo obrigatorio"],
    };
  },
  created() {
    if (this.$route?.params?.id) {
      this.getpayment(this.$route.params.id);
    }
  },
  methods: {
    async persist() {
      try {
        if (!this.valid) {
          return this.$toast.error(`Preencha todos os campos`);
        }
        if (!this.payment.id) {
          let response = await this.$api.post(`/payments/persist`, {
            type: this.payment.type,
          });
          if (response.type == "error") {
            console.log(response.message);
            return this.$toast.error(
              `Ocorreu um erro, contate o administrador`
            );
          }
          return this.$toast.success(`Cadastro realizado com sucesso`);
        }
        let response = await this.$api.post(`/payments/persist`, {
          id: this.payment.id,
          type: this.payment.type,
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
    async getpayment(id) {
      try {
        this.payment = await this.$api.get(`/payments/${id}`);
      } catch (error) {
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
  },
};
</script>