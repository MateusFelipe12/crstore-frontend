<template>
  <v-container>
    <h1 style="color: aquamarine">Carinho de compras</h1>
    <hr />
    <br />
    <v-container v-if="items.length > 0">
      <h3>Subtotal: {{ total.toFixed(2) }}</h3>
      <br />
      <v-row>
        <v-card
          v-for="item of items"
          :key="item.id"
          max-width="344px"
          style="margin: 5px"
        >
          <v-img
            :src="item[1]"
            alt="Imagem"
            max-height="150"
            max-width="250"
            style="align-items: center"
          />
          <v-card-title>
            {{ item[2] }}
          </v-card-title>
          <v-card-subtitle>
            {{ item[3] }}
          </v-card-subtitle>
          <v-card-title>
            {{ (item[3] * item[4]).toFixed(2) || "" }}
          </v-card-title>
          <v-card-actions>
            <v-text-field
              type="number"
              min="0"
              v-model="item[4]"
              @click="addItem(item)"
              style="width: 10px"
            />
            <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
            <v-btn @click="remove(item)">
              <v-icon> mdi-cart-remove </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-spacer></v-spacer>
      </v-row>
      <v-btn
        v-if="items ? items.length : null"
        text
        to="/users/order"
        style="float: right"
      >
        Finalizar compra
      </v-btn>
    </v-container>
    <v-container v-if="!items.length > 0" style="text-align: center">
      <p style="font-size: 50px">Seu carrinho esta vazio :(</p>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "custumer",
  name: "IndexItemsPage",
  data() {
    return {
      items: [],
      total: 0,
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        // é enviado o true  para o backend validar como uma requisiçao de um unico Cart
        // e o id é recuperado com o token do user
        let cart = (await this.$api.get(`/cart/${true}`)).data;
        if (!cart) {
          return this.$toast.warning(`Carinho vazio`);
        }
        if (cart.type == "error") {
          return this.$toast.warning(cart.message);
        }
        this.items = [];
        let items = cart.items;
        this.total = 0;
        if (!items) {
          return this.$toast(`ocorreu um erro`);
        }
        items.forEach((item) => {
          let aux = Object.values(item);
          this.items.push(aux);
          this.total += aux[3] * aux[7];
        });
        return;
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
    async remove(item) {
      try {
        if (!item) {
          return this.$toast.error(
            `Informe o item que deseja remover do carrinho`
          );
        }
        let newCart = [];
        this.items = this.items.forEach((items) => {
          items != item ? newCart.push(items) : null;
        });
        await this.$api.post(`/cart/remove`, { items: newCart });

        return this.getItems();
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`);
      }
    },
    async addItem(item) {
      try {
        if (!item) {
          return this.$toast.error(
            `Informe o item que deseja adicionar ao carrinho`
          );
        }
        let newCart = [];
        this.items = this.items.forEach((items) => {
          items != item ? newCart.push(items) : newCart.push(item);
        });
        let response = await this.$api.post(`/cart/remove`, { items: newCart });

        return this.getItems();
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`);
      }
    },
  },
};
</script>
