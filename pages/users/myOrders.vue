<template>
  <v-container>
    <h1 style="color: #1aa5f">Meus Pedidos</h1>
    <hr />

    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="search" label="Search" class="mx-4" />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="orders"
        class="elevation-1"
        item-key="id"
        :search="search"
      >
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "custumer",
  name: "MenuOrdersPage",
  data() {
    return {
      search: "",
      orders: [],
      headers: [
        {
          text: "Código",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Cidade",
          align: "center",
          sortable: false,
          value: "city",
        },
        {
          text: "Bairro",
          align: "center",
          sortable: false,
          value: "district",
        },
        {
          text: "Rua",
          align: "center",
          sortable: false,
          value: "address",
        },
        {
          text: "Valor",
          align: "center",
          sortable: false,
          value: "valueTotal",
        },
        {
          text: "Entrega",
          align: "center",
          sortable: false,
          value: "situacao",
        },
      ],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        let response = await this.$api.get(`/orders`);
        response.data.forEach((order) => {
          order.situacao = order.idUserDeliveryMan
            ? "Buscando entregador"
            : "Em andamento";
          this.orders.push(order);
        });
      } catch (error) {
        return this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
    async destroy(categories) {
      try {
        if (confirm(`Deseja deletar ${categories.id} - ${categories.name}?`)) {
          let response = await this.$api.post(`/category/destroy`, {
            id: categories.id,
          });
          this.$toast(response.message);
          return this.getOrders();
        }
      } catch (error) {
        return this.$toast.error(
          `Ocorreu um erro ao deletar a categoria id ${categories.id}, contate o administrador`
        );
      }
    },
  },
};
</script>
