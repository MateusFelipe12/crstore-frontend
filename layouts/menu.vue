<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h3 style="color: #1aa5f">CRStore</h3>
      <v-spacer></v-spacer>
      <v-btn
      text
      to="/users/myOrders"
      style="float: right;">
        <v-icon>
          mdi-cart-heart
        </v-icon>
      </v-btn>
      <v-btn
      text
      to="/users/cart"
      style="float: right;">
        <v-icon>
          mdi-cart-arrow-right
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { delay } from 'q'
import addressVue from '~/pages/users/address.vue'

export default {
  name: 'MenuLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      orders: [],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-book-variant',
          title: 'Categorias',
          to: '/admin/categories'
        }, 
        {
          icon: 'mdi-food',
          title: 'Itens',
          to: '/admin/items'
        }, 
        {
          icon: 'mdi-credit-card-outline',
          title: 'Pagamentos',
          to: '/admin/payments'
        },
        {  
          icon: 'mdi-map-marker',
          title: 'Endereços',
          to: '/users/address'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  created () {
    this.validation()
    this.getOrder();
  },
  methods: {
    async validation () {
      try {
  
        let response = await this.$api.post(`/users/validation/typeuser`) 
        if(response.type != 'success') {
          this.$toast('Você não possui autorização para acessar esse recurso')
          console.log(response);
          return this.$router.push('/users')
        }
          return this.$toast(response.message);
      } catch (error) {
        console.log(error.message);
        return this.$toast('/')
      }
    },
    async getOrder () {
    try {
      let response =  await this.$api.get(`/orders`)
      this.orders = response.data
    } catch (error) {
      console.log(error.message);
      this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
    }
  }
  }
}
</script>
