<template>
  <v-container>
    <h1>Endereços</h1>
    <hr>
    <br>
  </v-container>
</template>

<script>
export default {
layout: 'menu',
name: 'IndexItemsPage',
data () {
  return {
    addresses: [],

  }
},
created (){
    this.getAddresses()
},
  methods: {
    async getAddresses () {
      try {
        let response = await this.$api.get('/address')
        console.log(response);
      } catch (error) {
        
      }
    }
  }
}
</script>