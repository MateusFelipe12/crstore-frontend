<template>
  <v-container>
    <v-container v-if="!newAddress">
      <h1>Endereços</h1>
      <br>
      <v-btn
        text
        color="green"
        @click="newAddress = !newAddress"
        style="color: green"
      > +
      </v-btn>
      <br>
      <template> 
        <v-data-table
        :headers="headers"
        :items="addresses"
        class="elevation-1"
        ></v-data-table>
      </template>
    </v-container>


       <v-container v-if="newAddress">
      <h1>Cadastro de endereços</h1>
      <br>
      <br>
      <v-form v-model="valid">
         <v-row>
          <v-col>
            <v-text-field
            v-model="addresses.city"
            label="Cidade"
            placeholder="Cidade"
            :rules="rule"
            solo
          ></v-text-field>
          </v-col>
         </v-row>
         <v-row>
          <v-col>
            <v-text-field
            v-model="addresses.district"
            label="Bairro"
            placeholder="Bairro"
            :rules="rule"
            solo
          ></v-text-field>
          </v-col>
         </v-row>
         <v-row>
          <v-col>
            <v-text-field
            v-model="addresses.address"
            label="Rua"
            :rules="rule"
            placeholder="Rua"
            solo
          ></v-text-field>
          </v-col>
         </v-row>
         <v-row>
          <v-col>
            <v-text-field
            v-model="addresses.complement"
            :rules="rule"
            label="Complemento"
            placeholder="Complemento"
            solo
          ></v-text-field>
          </v-col>
         </v-row>
         <v-row>
          <v-col>
            <v-text-field
            v-model="addresses.number"
            :rules="rule"
            label="Numero"
            placeholder="Numero"
            solo
          ></v-text-field>
          </v-col>
         </v-row>
          <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="addresses"
              class="elevation-1"
              item-key="Titulo"
            >
              <template v-slot:item.actions=" {item} ">
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
          </v-col>
         </v-row>
         <v-btn
          @click="newAddresses()"
         >
          Cadastrar
         </v-btn>
          <v-btn
            small
            color="red"
            @click="newAddress = !newAddress"
            style="border-radius: 7%"
          > +
          </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
layout: 'menu',
name: 'IndexItemsPage',
data () {
  return {
    valid: false,
    addresses: [],
    newAddress: false,
    rule: [
        v => !!v || 'Campo obrigatorio'
    ],
    headers: [
          {
            text: 'Cidade',
            align: 'center',
            sortable: false,
            value: 'city',
          },
          {
            text: 'Bairro',
            align: 'center',
            sortable: false,
            value: 'district',
          },
          {
            text: 'Rua',
            align: 'center',
            sortable: false,
            value: 'address',
          },
          {
            text: 'Complemento',
            align: 'center',
            sortable: false,
            value: 'complement',
          },
          {
            text: 'Numero',
            align: 'center',
            sortable: false,
            value: 'number',
          }, 
          {
            text: 'Descriçao',
            align: 'center',
            sortable: false,
            value: 'description',
          },
          { text: "", value: "actions" },
        ],
  }
},
created (){
    this.getAddresses()
},
  methods: {
    async getAddresses () {
      try {
        let response = await this.$api.get('/address')
        this.addresses = response.data ? response.data : [];
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao carregar a pagina, contate o administrador`)
      }
    },
    async newAddresses () {
      try {
        console.log(
          `teu cu pia`
        );
        if(!this.valid) {
         return this.$toast.error(`Preencha todos os campos`)
        }
          let response = await this.$api.$post(`/address/persist`, {
            city: this.addresses.city,
            district: this.addresses.district,
            address: this.addresses.address,
            complement: this.addresses.complement,
            number: this.addresses.number,
            description: this.addresses.description          
          });

          if(response.type == 'error'){
            console.log(response.message);
            return this.$toast.error(`Ocorreu um erro, contate o administrador`)
          }
          return this.$toast.success(`Cadastro realizado com sucesso`)
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao salvar o endereço, contate o administrador`)
      }
    },
    async persist (item) {
      try {
        console.log(
          `teu cu pia persist ${item}`
        );
        return
        if(!this.valid) {
         return this.$toast.error(`Preencha todos os campos`)
        }
          let response = await this.$api.$post(`/address/persist`, {
            city: this.addresses.city,
            district: this.addresses.district,
            address: this.addresses.address,
            complement: this.addresses.complement,
            number: this.addresses.number,
            description: this.addresses.description          
          });
          console.log(response);
          if(response.type == 'error'){
            console.log(response.message);
            return this.$toast.error(`Ocorreu um erro, contate o administrador`)
          }
          return this.$toast.success(`Cadastro realizado com sucesso`)
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao salvar o endereço, contate o administrador`)
      }
    }
  }
}
</script>