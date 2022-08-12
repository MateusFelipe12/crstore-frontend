<template>
  <v-container>
    <h1 style="color: #1aa5f">Menu Pagamentos</h1>
    <hr />
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="search" label="Search" class="mx-4" />
        </v-col>
        <v-col cols="2">
          <v-icon color="blue" class="mr-3" @click="persist()">
            mdi-folder-plus-outline
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="payments"
        class="elevation-1"
        item-key="Titulo"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small color="yellow" class="mr-2" @click="persist(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="red" class="mr-2" @click="destroy(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "menu",
  type: "IndexpaymentsPage",
  data() {
    return {
      search: "",
      payments: [],
      headers: [
        {
          text: "Código",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Tipo",
          align: "center",
          sortable: false,
          value: "type",
        },
        { text: "", value: "actions" },
      ],
    };
  },
  created() {
    this.getpayments();
  },
  methods: {
    async getpayments() {
      try {
        this.payments = (await this.$api.get(`/payments`)).data;
      } catch (error) {
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },

    async destroy(payments) {
      try {
        if (confirm(`Deseja deletar ${payments.id} - ${payments.type}?`)) {
          let response = await this.$api.post(`/payments/destroy`, {
            id: payments.id,
          });
          this.$toast(response.message);
          return this.getpayments();
        }
      } catch (error) {
        this.$toast.error(
          `Ocorreu um erro ao deletar a categoria id ${payments.id}, contate o administrador`
        );
      }
    },
    async persist(payment) {
      try {
        if (payment) {
          return this.$router.push({
            name: "admin-payments-persist",
            params: { id: payment.id },
          });
        }
        return this.$router.push({
          name: "admin-payments-persist",
        });
      } catch (error) {
        this.$toast.error(
          `Ocorreu um erro ao acessar, contate o administrador`
        );
      }
    },
  },
};
</script>
