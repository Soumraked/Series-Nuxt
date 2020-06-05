<template>
  <div>
    <!-- Dialog Sign In -->
    <v-dialog v-model="dialog" width="500">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Sign In</span>
        </v-card-title>

        <v-window>
          <v-window-item>
            <v-card-text>
              <v-text-field label="Nickname" type="text" autocomplete="off" v-model="nicknameUser"></v-text-field>
              <v-text-field label="Password" type="password" v-model="passwordUser"></v-text-field>
              <span class="caption grey--text text--darken-1">{{ messageAccount }}</span>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="out()">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="enter()">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Sign In -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "SignIn",
  props: ["dialogprops"],
  data() {
    return {
      nicknameUser: "",
      passwordUser: "",
      messageAccount: "",
      dialog: false
    };
  },
  computed: {
    ...mapState(["baseUrl"])
  },
  methods: {
    ...mapMutations(["login"]),
    async enter() {
      if (this.nicknameUser == "" || this.passwordUser == "") {
        this.messageAccount = "Complete los campos antes de continuar.";
      } else {
        var Crypto = require("crypto-js");
        var newPass = Crypto.SHA256(this.passwordUser.toString()).toString();
        let data = await axios.post(this.baseUrl + "/auth/login", {
          nick: this.nicknameUser.toString(),
          password: newPass
        });
        if (data.data.message == "Wrong password, try again.") {
          this.messageAccount = "Contraseña incorrecta, intente nuevamente.";
        } else if (
          data.data.message == "User entered does not exist, try again."
        ) {
          this.messageAccount =
            "El usuario ingresado no existe, verifique la información e intente nuevamente.";
        } else if (data.data.token) {
          this.messageAccount = "Datos validados.";
          this.$store.commit("login", {
            user: data.data.nick,
            token: data.data.token,
            rol: data.data.rol
          });
          this.dialog = false;
        } else {
          this.messageAccount =
            "Error desconocido, intente nuevamente o contáctese con el administrador.";
        }
      }
    }
  },
  watch: {
    dialogprops(newValue, oldValue) {
      if (newValue != oldValue) {
        this.dialog = true;
        this.messageAccount = "Introduzca sus credenciales para continuar.";
      }
    }
  }
};
</script>