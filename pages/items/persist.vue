<template>
  <v-container>
    <h1 v-if="!item.id" > CADASTRO DE ITENS</h1>
    <h1 v-if="item.id" > ATUALIZAR ITENS</h1>
    <hr>
    <br>
    <v-form v-model="valid">
    <v-text-field
      outlined
      disabled
      label="Código"
      placeholder="Código"
      v-model="item.id"
      :rules="rule"
      v-if="item.id"
    />
    <v-text-field
      outlined
      label="Nome"
      placeholder="Nome"
      v-model="item.name"
      :rules="rule"
    />
    <v-text-field
      outlined
      label="Preço"
      placeholder="Preço"
      v-model="item.price"
      v-mask="['#.##', '##.##', '###.##', '####.##', '#####.##']"
      :rules="rule"
    />
    <v-autocomplete
      v-model="item.idCategory"
      :items="categories"
      outlined
      label="Categoria"
      item-text="name"
      item-value="id"
    />
    </v-form>
    <v-btn
    outlined
    v-if="!item.id"
    @click="persist()"
    >
      Cadastrar
    </v-btn>
      <v-btn
    outlined
    v-if="item.id"
    @click="persist()"
    >
      Atualizar
    </v-btn>
     <v-btn
    outlined
    to="/items"
    >
      Cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: 'menu',
  name: 'IndexitemPage',
  data () {
    return {
      valid: false,
      categories: [],
      item: {
        id: null,
        name: '',
        price: null,
        idCategory: null
      },
      rule: [
        v => !!v || 'Campo obrigatorio'
      ],
      priceRule: [
        v => !!v || 'Campo obrigatorio',
        v => v && !v.split('').some(c => c === ',') || 'Utilize . no lugar da ,'
      ]
    }
  },
created () {
    if (this.$route?.params?.id) {
      this.getitem(this.$route.params.id)
    }
    this.getCategories();
  },
  methods: {

    async persist () {
      try {
        if(!this.valid) {
         return this.$toast.error(`Preencha todos os campos`)
        }
    
          let response = await this.$axios.$post(`http://localhost:3333/items/persist`, {
            id: this.item.id,
            name: this.item.name, 
            price: this.item.price,
            idCategory: this.item.idCategory
          });
          if(response.type == 'error'){
            console.log(response.message);
            return this.$toast.error(`Ocorreu um erro, contate o administrador`)
          }
          return this.$toast.success(`Cadastro realizado com sucesso`)
      
      } catch (error) {
        console.log(error.message);
        return this.$toast.error(`Ocorreu um erro, contate o administrador`)
      }
    },
    async getitem (id) {
     try {
        this.item  = (await this.$axios.$get(`http://localhost:3333/items/${id}`)).data 
     } catch (error) {
      this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
     }
    },
     async getCategories () {
      try {
        this.categories =( await this.$axios.$get('http://localhost:3333/category')).data;  
      } catch (error) {
        this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
      }
    },
  }
}
</script>