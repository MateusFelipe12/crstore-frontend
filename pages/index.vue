<template>
  <v-container style="margin:5%; text-align:center">
    <h1>Seja bem vindo a CRStore</h1>
   <v-container style="background-color:dimgrey; border-radius:1%; width: 300px">
      <v-form v-model="valid">
        <v-container style="width: 250px ;">
          <br>
           <v-text-field
          v-model="login.username"
          outlined
          :rules="rule"
          placeholder="Nome de usuario"
        />
        <v-text-field
          v-model="login.password"
          outlined
          placeholder="Senha"
          :rules="rule"
        /><a bind-href="/users" style="font-size:80%; color: #1aa5f; font-family: 'Oswald', sans-serif;">Esqueci minha senha</a>
        <br>
        <a bind-href="/users" style="font-size:90%; color:cornflowerblue; font-family: 'Oswald', sans-serif;">Registre-se</a>
        <br>
        <br>
        <v-btn 
        style="width:220px; "
        @click="register()"
        >Entrar</v-btn>
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
      valid: false,
      login: {
      username: '',
      password: ''
  },
    }
  },
  methods:{
    async register () {
      try {
        if(!this.valid) {
          return this.$toast.error(`Insira nome de usuario e senha`);
        }
        let response = await this.$api.post(`/users/login`, {username: this.login.username, password: this.login.password })
        
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
