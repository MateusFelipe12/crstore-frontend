<template>
  <v-container>
    <h1>Esqueceu sua senha?</h1>
    <h2>Informe corretamente todos os campos</h2>
    <v-form v-model="valid">
      <v-text-field
        v-model="username"
        label="Nome do usuario"
        placeholder="Nome de usuario"
        :rules="rule"
        v-if="!nextPass"
        outlined
      />
      <v-text-field
        v-model="name"
        label="Nome"
        :rules="rule"
        v-if="!nextPass"
        placeholder="Nome Completo"
        outlined
      />
      <v-text-field
        v-model="cpf"
        label="CPF"
        v-mask="['###.###.###-##']"
        :rules="rule"
        v-if="!nextPass"
        placeholder="CPF"
        outlined
      />
      <v-text-field
        v-model="phone"
        label="Telefone"
        v-mask="['(##) #####-####']"
        placeholder="Telefone"
        :rules="rule"
        v-if="!nextPass"
        outlined
      />
      <v-text-field
        v-model="newPassword"
        label="Nova senha"
        type="password"
        placeholder="Nova senha"
        :rules="rule"
        v-if="nextPass"
        outlined
      />
            <v-text-field
        v-model="validNewPassword"
        label="Confirme a senha"
        type="password"
        placeholder="Confirme a senha"
        :rules="rule"
        v-if="nextPass"
        outlined
      />
      <v-btn
        v-if="!nextPass"
        @click="validation()"
      >Enviar</v-btn>
      <v-btn
        v-if="nextPass"
        @click="updatePassword()"
      >Enviar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  name: 'updatePasswordPage',
  data () {
    return {
      nextPass: false,
      username: '',
      name: '',
      cpf: '',
      phone: '',
      valid: false,
      newPassword: '',
      validNewPassword: '',
      id: 0,
      rule: [
        v => !!v || "Campo Obrigatorio"
      ]
    }
  },
  methods: {
    async validation () {
      try {
        if(!this.valid) {
          return this.$toast.error(`Preencha todos os campos!!`)
        }

        let response = await this.$api.post(`/users/verification`, {
          username: this.username, 
          name: this.name,
          cpf: this.cpf,
          phone: this.phone
        })
        if(response.data.type == 'error'){
          return this.$toast.error(`Algum dos campos nao coincidem com o seu perfil`)
        }
        this.nextPass = true;
        this.id = response.data.data
        return this.$toast.success(response.data.message)

      } catch (error) {
        console.log(error.message);
        return this.$toast.error("Ocorreu um erro, contate o administrador")
      }
    },

    async updatePassword (){
      try {
        if(!this.valid){
          return this.$toast.error(`Preencha todos os campos!!`)
        }
        if(this.newPassword != this.validNewPassword){ 
          return this.$toast.error(`As senhas nao coincidem`)
        }
        let response = await this.$api.post(`/users/newpassword`, {
          password: this.newPassword,
          id: this.id
        })
        if(response.data.type == 'error') {
          return this.$toast.error(`Ocorreu um erro ao salvar a nova senha`)
        } else{
          this.$toast.success(response.data.message);
          return this.$router.push('/');
        }

      } catch (error) {
        console.log(error.message);
        return this.$toast.error("Ocorreu um erro, contate o administrador")
      }
    }
  }
}
</script>

<style>

</style>