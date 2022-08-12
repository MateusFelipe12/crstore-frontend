<template>
  <v-conteiner>
    <v-container>
      <h1 style="color: aquamarine">Finalizar compras</h1>
      <hr />
      <br />
      <v-container>
        <v-card max-width="800" class="mx-auto">
          <v-toolbar color="green" dark
            ><v-toolbar-title>Itens</v-toolbar-title>
          </v-toolbar>
          <v-list three-line>
            <template v-for="(item, i) in items">
              <v-divider :key="item[0]" />

              <v-list-item :key="i">
                <v-list-item-avatar>
                  <v-img :src="item[1]"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item[2] }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item[3] }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ item[7] }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{
                    item[7] * item[3]
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <br />
        <br />
        <h3>Total: {{ total.toFixed(2) }}</h3>
        <br />
        <hr />
        <br />
        <template>
          <h3>Em qual endereço você deseja receber seu pedido?</h3>
          <v-container class="px-0" fluid>
            <v-radio-group v-model="addressSelect">
              <v-radio
                v-for="address in addresses"
                :key="address"
                :label="`${address.city}, Bairro ${address.district}, Rua ${address.address}, ${address.complement} - ${address.number}, ${address.description}`"
                :value="address.id"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </template>
        <br />
        <hr />
        <br />
        <v-container>
          <v-container class="px-0" fluid>
            <v-radio-group v-if="!paymentSelect" v-model="paymentSelect">
              <v-radio
                v-for="payment in payments"
                :key="payment"
                :label="`${payment.type}`"
                :value="payment.id"
              ></v-radio>
            </v-radio-group>
            <v-container v-if="paymentSelect == 1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbY4C7vOnXTpdAFv5y39_85xDAySznrfO9CQ&usqp=CAU"
                alt=""
              />
              <br />
              <v-btn @click="pagando = true"> Pago </v-btn>
              <v-btn
                color="red"
                @click="
                  paymentSelect = false;
                  pagando = false;
                "
              >
                Escolher novamente
              </v-btn>
            </v-container>
            <v-container v-if="paymentSelect == 2">
              Boleto
              <br />
              <v-btn
                color="red"
                @click="
                  paymentSelect = false;
                  pagando = false;
                "
              >
                Escolher novamente
              </v-btn>
            </v-container>

            <v-container v-if="paymentSelect == 3">
              <template>
                <v-card class="mx-auto" style="max-width: 600px">
                  <v-toolbar color="deep-purple accent-4" cards dark flat>
                    <v-btn
                      color="deep-purple accent-5"
                      fab
                      small
                      @click="
                        paymentSelect = false;
                        pagando = false;
                      "
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                      Cartão de Crédito
                    </v-card-title>
                  </v-toolbar>
                  <v-form ref="form" v-model="form" class="pa-4 pt-6">
                    <v-text-field
                      v-model="card.mm"
                      filled
                      color="deep-purple"
                      v-mask="['#### #### #### ####']"
                      counter="19"
                      label="Numero"
                      style="min-height: 96px"
                    ></v-text-field>
                    <v-row>
                      <v-col cols="11" sm="5">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="menu"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="card.validity"
                              label="Validade do cartão"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="card.validity"
                            type="month"
                            no-title
                            max="2050-12"
                            min="01-2022"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="menu = false">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="card.csv"
                          filled
                          color="deep-purple"
                          label="CSV"
                          v-mask="['###']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn @click="pagando = !pagando">
                      <v-progress-circular
                        v-if="pagando"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      Confirmar dados
                    </v-btn>
                  </v-form>
                </v-card>
              </template>
              <br />
            </v-container>
            <v-container v-if="paymentSelect == 4">
              <template>
                <v-card class="mx-auto" style="max-width: 600px">
                  <v-toolbar color="deep-purple accent-4" cards dark flat>
                    <v-btn
                      color="deep-purple accent-5"
                      fab
                      small
                      @click="
                        paymentSelect = false;
                        pagando = false;
                      "
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                      Cartão de Debito
                    </v-card-title>
                  </v-toolbar>
                  <v-form ref="form" v-model="form" class="pa-4 pt-6">
                    <v-text-field
                      v-model="card.mm"
                      filled
                      color="deep-purple"
                      v-mask="['#### #### #### ####']"
                      counter="19"
                      label="Numero"
                      style="min-height: 96px"
                    ></v-text-field>
                    <v-row>
                      <v-col cols="11" sm="5">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="menu"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="card.validity"
                              label="Validade do cartão"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="card.validity"
                            type="month"
                            no-title
                            max="2050-12"
                            min="01-2022"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="menu = false">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="card.csv"
                          filled
                          color="deep-purple"
                          label="CSV"
                          v-mask="['###']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn @click="pagando = !pagando">
                      <v-progress-circular
                        v-if="pagando"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      Confirmar dados
                    </v-btn>
                  </v-form>
                </v-card>
              </template>
              <br />
            </v-container>
            <v-container v-if="paymentSelect == 5">
              Você deve pagar diretamente ao entregador, após receber o pedido.
              <br />
              O valor total é de: {{ total.toFixed(2) }}
              <br />
              <v-btn @click="pagando = true"> Ok </v-btn>
              <v-btn
                color="red"
                @click="
                  paymentSelect = false;
                  pagando = false;
                "
              >
                Escolher novamente
              </v-btn>
            </v-container>
          </v-container>
        </v-container>
      </v-container>
      <v-container v-if="pagando">
        <v-btn @click="createOrder()"> Finalizar compra </v-btn>
      </v-container>
    </v-container>
  </v-conteiner>
</template>

<script>
export default {
  layout: "custumer",
  name: "IndexItemsPage",
  data() {
    return {
      items: [],
      total: 0,
      addresses: [],
      addressSelect: null,
      payments: [],
      paymentSelect: null,
      card: [],
      menu: false,
      pagando: false,
    };
  },
  created() {
    this.getItems();
    this.getAddresses();
    this.getPayments();
  },
  methods: {
    async getItems() {
      try {
        this.items = [];
        // é enviado o true  para o backend validar como uma requisiçao de um unico Cart
        // e o id é recuperado com o token do user
        let cart = (await this.$api.get(`/cart/${true}`)).data;
        if (cart.type == "error") {
          this.$toast.warning(cart.message);
        }

        let items = cart.items;
        this.total = 0;
        items.forEach((item) => {
          let aux = Object.values(item);
          this.items.push(aux);
          this.total += aux[3] * aux[7];
        });
        return;
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
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
    async getPayments() {
      try {
        let response = await this.$api.get("/payments");
        this.payments = response.data ? response.data : [];
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
    async createOrder() {
      try {
        let addres = [];
        this.addresses.forEach((address) => {
          address.id == this.addressSelect ? addres.push(address) : null;
        });
        let response = await this.$api.post(`/orders/persist`, {
          items: this.items,
          addres: addres[0],
          payment: this.paymentSelect,
        });
        if (response.type !== "success") {
          return this.$toast.error(response.message);
        }
        this.removeCart();
        this.$router.push("/");
        return this.$toast.success(response.message);
      } catch (error) {
        console.log(error.message);
        this.$toast.error(
          `Ocorreu um erro ao carregar a pagina, contate o administrador`
        );
      }
    },
    async removeCart() {
      try {
        let response = await this.$api.post(`/cart/destroy`);
        if (response.type == "error") {
          this.$toast.error(response.message);
          console.log(response);
        }
        return;
      } catch (error) {
        console.log(error.message);
        this.$toast.error(`Ocorreu um erro ao salvar, contate o administrador`);
      }
    },
  },
};
</script>