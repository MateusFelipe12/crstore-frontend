<template>
  <v-container style="margin:5%; text-align:center">
    <h1 style="color: dodgerblue;">Seja bem vindo a CRStore</h1>
   <v-container style="background-color:darkgray ; border-radius:1%; width: 750px">
      <v-form v-model="valid">
        <v-container style="width: 600px ;">
          <br>
           <v-text-field
          v-model="login.username"
          outlined
          color="black"
          background-color="black"
          :rules="rule"
          placeholder="Usuario"
          style=": black;"
        />
          
        <v-text-field
          v-model="login.name"
          outlined
          color="black"
          background-color="black"
          placeholder="Nome"
          :rules="rule"
        />
        <v-text-field
          v-model="login.cpf"
          outlined
          color="black"
          v-mask="['###.###.###-##']"
          background-color="black"
          placeholder="CPF"
          :rules="rule"
        />
        <v-text-field
          v-model="login.phone"
          outlined
          color="black"
          v-mask="['(##) #####-####']"
          background-color="black"
          placeholder="Telefone"
          :rules="rule"
        />
        <v-text-field
          v-model="login.password"
          outlined
          color="black"
          background-color="black"
          placeholder="Senha"
          :rules="rule"
        />
        <v-text-field
          v-model="login.validPass"
          outlined
          color="black"
          background-color="black"
          placeholder="Confirme sua senha"
          :rules="rule"
        />
        <v-btn 
        style="width:220px; "
        color="black"
        @click="register()"
        >Enviar</v-btn>
        </v-container>
      </v-form>
   </v-container>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  name: 'IndexPage',
  data () {
    return {
      valid: false,
      rule: [
        v => !!v || "Campo obrigatorio"
      ],
      login: {
        username: '',
        name: '',
        cpf: '', 
        phone: '',
        password: '',
        validPass: '',
        role: 'Custumer'
  },
    }
  },
  methods:{
    async register () {
      try {
        if(!this.valid) {
          return this.$toast.error(`Por favor, preencha todos os campos`);
        }
        if(this.login.password != this.login.validPass){ 
          return this.$toast.error(`As senhas nao coincidem`)
        }

        let response = await this.$api.post(`/users/register`, {
          username: this.login.username, 
          password: this.login.password,
          name: this.login.name,
          cpf: this.login.cpf,
          phone: this.login.phone,
          role: this.login.rule || 'Custumer' 
          })

        if(response.data.type == "error") {
          return this.$toast.warning(response.data.message)
        }
        this.$toast.success(response.data.message);
        localStorage.setItem('crstore-token', response.data.token)
        return this.$router.push('/');

      } catch (error) {
        console.log(error.message);
        return this.$toast.error("Ocorreu um erro, contate o administrador")
      }
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&family=Oswald:wght@600&display=swap');
</style>
