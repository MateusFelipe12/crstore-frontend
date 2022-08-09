<template>
  <v-container style="margin:5%; text-align:center">
    <h1 style="color: dodgerblue;">Seja bem vindo a CRStore</h1>
   <v-container style="background-color:darkgray ; border-radius:1%; width: 400px">
      <v-form v-model="valid">
        <v-container style="width: 300px ;">
          <br>
           <v-text-field
          v-model="login.username"
          outlined
          color="black"
          background-color="black"
          :rules="rule"
          placeholder="Nome de usuario"
          style=": black;"
        />
        <v-text-field
          v-model="login.password"
          outlined
          type="password"
          color="black"
          background-color="black"
          placeholder="Senha"
          :rules="rule"
        /><a href="/users/updatePassword" style="font-size:80%; color: #1aa5f; font-family: 'Oswald', sans-serif;">Esqueci minha senha</a>
        <p>Ainda não tem uma conta?<a href="/users/register" style="font-size:80%; color:#1aa5f; font-family: 'Oswald', sans-serif;">Registre-se</a></p>
        <v-btn 
        style="width:220px; "
        color="black"
        @click="register()"
        >
           <v-progress-circular v-if="logando"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <span v-else>
            Entrar
          </span>
        </v-btn>
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
      logando: false
    }
  },
  methods:{
    async register () {
      try {
        this.logando = true;
        if(!this.valid) {
          return this.$toast.error(`Insira nome de usuario e senha`);
        }
        let response= await this.$api.post(`/users/login`, { username: this.login.username, password: this.login.password })
        
        if(response.type == "error") {
          return this.$toast.warning(response.message)
        }
        this.$toast.success(response.message);
        
        setTimeout(async () => {
           await localStorage.setItem('crstore-token', response.token)
        }, 1000);
        
        console.log(response);
        if(response.typeUser == 'Admin'){
          return this.$router.push('./');
        }
        if(response.typeUser == 'delivery'){
          return this.$router.push('/delivery');
        }
        return
      } catch (error) {
        this.logando = false;
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
