  <template>
  <v-container>
    <h1 style="color:aquamarine ;">MENU ITENS</h1>
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
        :items="items"
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
export default {
  layout: 'menu',
  name: 'IndexItemsPage',
  data () {
    return {
      search: '',
      items: [],
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
        {
          text: 'Preço',
          align: 'center',
          sortable: false,
          value: 'price'
        },
             {
          text: 'Categoria',
          align: 'center',
          sortable: false,
          value: 'idCategory'
        },

        { text: "", value: "actions" },
      ]
    }
  },
  created () {
    this.getItems ()
  },
  methods: {
    async getItems () {
      try {
        this.items = (await this.$api.get(`/items`)).data;
      } catch (error) {
        this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
      }
    },

    async destroy (items) {
      try {
        if (confirm(`Deseja deletar ${items.id} - ${items.name}?`)) {
          let response = await this.$api.$post('/items/destroy', { id: items.id });
          this.$toast(response.message)
          return this.getItems();
       }
      } catch (error) {
         this.$toast.error(`Ocorreu um erro ao deletar a categoria id ${items.id}, contate o administrador`)
      }
     },
    async persist (item) {
      try {
        if(item){
          return this.$router.push({
          name: 'admin-items-persist',
          params: { id: item.id }
        });
        }
        return this.$router.push({
          name: 'admin-items-persist'
        });
      } catch (error) {
        this.$toast.error(`Ocorreu um erro ao acessar, contate o administrador`)
      }
    }
  }
}
</script>
