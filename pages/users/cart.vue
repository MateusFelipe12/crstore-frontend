<template>
<v-container>
  <h1 style="color:aquamarine ;">Carinho de compras</h1>
  <hr>
  <br>
  <h3>Subtotal: {{total.toFixed(2)}}</h3>
  <br>
  <v-container>
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
        style="align-items:center;"
      />
        <v-card-title>
          {{item[2]}}
        </v-card-title>
        <v-card-subtitle>
          {{item[3]}}
        </v-card-subtitle>
        <v-card-title>
          {{item[3] * item[7] || ''}}
        </v-card-title>
        <v-card-actions>
          <v-text-field
          type="number"
          v-model="item[7]"
          style="width: 10px;"
          />
          <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
          <v-btn
          @click="remove(item)"
          >
            <v-icon>
              mdi-cart-remove  
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
    items: [],
    total: 0
  }
},
created () {
  this.getItems ()
},
methods: {
  async getItems () {
    try {
      this.items = []
      // é enviado o true  para o backend validar como uma requisiçao de um unico Cart
      // e o id é recuperado com o token do user
      let cart = (await this.$api.get(`/cart/${true}`)).data
      if(cart.type == 'error'){
        this.$toast.warning(cart.message)
      }

      let items = cart.items
      let response  = [];
      items.forEach(item => {
        let aux = Object.values(item)
        this.items.push(aux);
        this.total += aux[3] * aux[7]
      });
    } catch (error) {
      console.log(error.message);
      this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
    }
  },
  async addCart (item) {  
    try {
      if(!item) {
        return this.$toast.error(`Informe o item que deseja adicionar ao carrinho`)
      }
      let response = await this.$api.post(`/cart/persist`, { items: item })
     

    } catch (error) {
      console.log(error.message);
      this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`)
    }
  },
  async remove (item) {
    try {
      console.log(item);
      if(!item) {
        return this.$toast.error(`Informe o item que deseja adicionar ao carrinho`)
      }
      let newCart = []
      this.items = this.items.forEach(items => {
        items == item ? newCart.push(items) : null;
      })
      let response = await this.$api.post(`/cart/remove`, { items: newCart })
       await this.getItems()
       location.reload()
    } catch (error) {
      console.log(error.message);
      this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`)
    }
  }
}
}
</script>
