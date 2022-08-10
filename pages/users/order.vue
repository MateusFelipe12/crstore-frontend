<template>
  <v-container>
    <h1 style="color:aquamarine ;">Finalizar compras</h1>
    <hr>
    <br>

    <template>
      <v-card
        max-width="800"
        class="mx-auto"
      >
        <v-toolbar
          color="green"
          dark
        ><v-toolbar-title>Itens</v-toolbar-title>
        </v-toolbar>
        <v-list three-line>
          <template v-for="(item, i) in items">
            <v-divider
            :key="item[0]"
            />

            <v-list-item
              :key="i"
            >
              <v-list-item-avatar>
                <v-img :src="item[1]"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{item[2]}}</v-list-item-title>
                <v-list-item-subtitle>{{item[3]}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{item[7]}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{item[7] * item[3]}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <br>
      <br>
      <h3>Total: {{total.toFixed(2)}}</h3>
      <template>
        <v-container
          class="px-0"
          fluid
        >
          <v-radio-group v-model="addressSelect">
            <v-radio
              v-for=" address in addresses"
              :key="address"
              :label="`${address}`"
              :value="address"
            ></v-radio>
          </v-radio-group>
        </v-container>
      </template>
    </template>
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
      this.total = 0;
      items.forEach(item => {
        let aux = Object.values(item)
        this.items.push(aux);
        this.total += aux[3] * aux[7]
      });
      return
    } catch (error) {
      console.log(error.message);
      this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
    }
  },
  async getAddresses () {
    try {
      
    } catch (error) {
      
    }
  }
}
}
</script>
