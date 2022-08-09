<template>
  <v-container>
    <h1 style="color:#1aa5f ;">Menu Categorias</h1>
    <hr>
    <v-container>
      <v-row>
         <v-col cols="6">
           <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
        </v-col>
        <v-col cols="2">
          <v-icon
            color="blue"
            class="mr-3"
            @click="persist()"
          >
            mdi-folder-plus-outline       
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="categories"
        class="elevation-1"
        item-key="Titulo"
        :search="search"
      >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          color="yellow"
          class="mr-2"
          @click="persist(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="red"
          class="mr-2"
          @click="destroy(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import { delay } from 'q';

export default {
  layout: 'menu',
  name: 'IndexCategoriesPage',
  data () {
    return {
      search: '',
      categories: [],
      headers: [
        {
          text: 'Código', 
          align: 'center', 
          sortable: false, 
          value: 'id',
        },
        {
          text: 'Nome',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: "", value: "actions" },
      ]
    }
  },
  created () {
    this.getCategories ()
  },
  methods: {
    async getCategories () {
      try {
        this.categories =( await this.$api.get(`/category`)).data
      } catch (error) {
        this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
      }
    },

    async destroy (categories) {
      try {
        if (confirm(`Deseja deletar ${categories.id} - ${categories.name}?`)) {
          let response = await this.$api.post(`/category/destroy`, { id: categories.id })
          this.$toast(response.message)
          return this.getCategories();
       }
      } catch (error) {
         this.$toast.error(`Ocorreu um erro ao deletar a categoria id ${categories.id}, contate o administrador`)
      }
     },
    async persist (category) {
      try {
        if(category){
          return this.$router.push({
          name: 'admin-categories-persist',
          params: { id: category.id }
        });
        }
        return this.$router.push({
          name: 'admin-categories-persist'
        });
      } catch (error) {
        this.$toast.error(`Ocorreu um erro ao acessar, contate o administrador`)
      }
    }
  }
}
</script>
