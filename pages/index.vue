<template>
<v-container>
  <h1 style="color:aquamarine ;">Produtos</h1>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </v-col>
    </v-row>
    <hr>
  </v-container>
  <v-container>
    <v-row>
      <v-card
        v-for="item of items"
        :key="item.id"
        max-width="344px"
        style="margin: 5px"
      >
      <v-img
        :src="item.img"
        alt="nan"
        max-height="150"
        max-width="250"
        style="align-items:center;"
      />
        <v-card-title>
          {{item.name}}
        </v-card-title>
        <v-card-subtitle>
          {{item.price}}
        </v-card-subtitle>
        <v-card-actions>
          <v-text-field
          type="number"
          v-model="item.quantidade"
          style="width: 10px;"
          />
          <v-btn
            color="green"
            text
            @click="addCart(item)"
          >
            <v-icon>
              mdi-cart-plus
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</v-container>
</template>

<script>
export default {
layout: 'menu',
name: 'IndexItemsPage',
data () {
  return {
    search: '',
    items: [],
  }
},
created () {
  this.getItems ()
},
methods: {
  async getItems () {
    try {
      let items = await this.$axios.$get('http://localhost:3333/items');
      this.items = items.data
    } catch (error) {
      this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
    }
  },
  async addCart (item) {
    try {
      console.log(item);
      if(!item) {
        return this.$toast.error(`Informe o item que deseja adicionar ao carrinho`)
      }
      let response = await this.$axios.$post('http://localhost:3333/cart/persist', { item, update: true });
      console.log(response.message);
      
    } catch (error) {
      this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`)
    }
  }
}
}
</script>
