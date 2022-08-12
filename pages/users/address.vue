<template>
  <v-container>
    <v-container v-if="!newAddress">
      <h1>Endereços</h1>
      <br />
      <v-btn
        text
        @click="
          newAddress = !newAddress;
          address = [];
        "
        style="width: 50px"
      >
        Novo
      </v-btn>
      <br />
      <template>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="addresses"
              class="elevation-1"
              item-key="Titulo"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  color="yellow"
                  class="mr-2"
                  @click="
                    address = item;
                    newAddress = true;
                  "
                >
                  mdi-pencil
                </v-icon>
                <v-icon small color="red" class="mr-2" @click="destroy(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </template>
    </v-container>

    <v-container v-if="newAddress">
      <h1>Cadastro de endereços</h1>
      <br />
      <br />
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              v-model="address.city"
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
              v-model="address.district"
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
              v-model="address.address"
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
              v-model="address.complement"
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
              v-model="address.number"
              :rules="rule"
              label="Numero"
              placeholder="Numero"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="address.description"
              :rules="rule"
              label="Descrição"
              placeholder="Descrição"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <v-btn small @click="persist(address)"> Atualizar </v-btn>
        <v-btn small color="red" @click="newAddress = !newAddress" style="">
          Cancelar
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
export default {
  layout: "custumer",
  name: "IndexItemsPage",
  data() {
    return {
      valid: false,
      addresses: [],
      newAddress: false,
      address: [],
      rule: [(v) => !!v || "Campo obrigatorio"],
      headers: [
        {
          text: "Cidade",
          align: "center",
          sortable: false,
          value: "city",
        },
        {
          text: "Bairro",
          align: "center",
          sortable: false,
          value: "district",
        },
        {
          text: "Rua",
          align: "center",
          sortable: false,
          value: "address",
        },
        {
          text: "Complemento",
          align: "center",
          sortable: false,
          value: "complement",
        },
        {
          text: "Numero",
          align: "center",
          sortable: false,
          value: "number",
        },
        {
          text: "Descriçao",
          align: "center",
          sortable: false,
          value: "description",
        },
        { text: "", value: "actions" },
      ],
    };
  },
  created() {
    this.getAddresses();
  },
  methods: {
    async getAddresses() {
      try {
        let response = await this.$api.get("/address");
        this.addresses = response.data ? response.data : [];
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
    async newAddresses() {
      try {
        if (!this.valid) {
          return this.$toast.error(`Preencha todos os campos`);
        }
        let response = await this.$api.post(`/address/persist`, {
          city: this.address.city,
          district: this.address.district,
          address: this.address.address,
          complement: this.address.complement,
          number: this.address.number,
          description: this.address.description,
        });

        if (response.type == "error") {
          console.log(response.message);
          return this.$toast.error(`Ocorreu um erro, contate o administrador`);
        }
        return this.$toast.success(`Cadastro realizado com sucesso`);
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao salvar o endereço, contate o administrador`
        );
      }
    },
    async persist(item) {
      try {
        if (!this.valid) {
          return this.$toast.error(`Preencha todos os campos`);
        }
        let response = await this.$api.post(`/address/persist`, {
          id: item.id,
          city: item.city,
          district: item.district,
          address: item.address,
          complement: item.complement,
          number: item.number,
          description: item.description,
        });

        if (response.type == "error") {
          console.log(response.message);
          return this.$toast.error(`Ocorreu um erro, contate o administrador`);
        }
        this.newAddresses = false;
        this.getAddresses();
        return this.$toast.success(`Cadastro realizado com sucesso`);
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao salvar o endereço, contate o administrador`
        );
      }
    },
    async destroy(item) {
      try {
        if (confirm(`Voce realmente deseja deletar o endereço ${item.id}?`)) {
          let response = await this.$api.post(`/address/destroy`, {
            id: item.id,
          });

          if (response.type == "error") {
            console.log(response.message);
            return this.$toast.error(
              `Ocorreu um erro, contate o administrador`
            );
          }
          this.getAddresses();

          return this.$toast.warning(`Endereço deletado com sucesso`);
        }
        return this.getAddresses();
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao salvar o endereço, contate o administrador`
        );
      }
    },
  },
};
</script>