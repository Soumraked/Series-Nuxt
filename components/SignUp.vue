<template>
  <div>
    <!-- Dialog Sign Up -->
    <v-dialog v-model="dialog" width="500">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field label="Nickname" v-model="nickName" :rules="nickNameRules"></v-text-field>
              <span class="caption grey--text text--darken-1">{{ messageAccount }}</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              <v-text-field label="Confirm Password" type="password" v-model="passwordConfirm"></v-text-field>
              <span class="caption grey--text text--darken-1">{{ messageAccount }}</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Welcome to Monos Otakos</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 3" text @click="stepOption('-')">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 3" text @click="dialog = false">Continuar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="step === 3"
            color="primary"
            depressed
            @click="stepOption('+')"
          >Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Sign Up -->
  </div>
</template>

<script>
const pattern = new RegExp("^[A-Z,0-9]+$", "i");
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "SignUp",
  props: ["dialogprops"],
  data() {
    return {
      dialog: false,
      step: 1,
      messageAccount: "",
      nickName: "",
      nickNameRules: [v => pattern.test(v), v => v != ""],
      password: "",
      passwordConfirm: "",
      users: [],
      loading: false
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
    ...mapState(["baseUrl"])
  },
  methods: {
    async getUsers() {
      let data = await axios.get(`${this.baseUrl}/auth/get`);
      this.users = data.data;
    },
    stepOption(option) {
      if (option == "+") {
        if (
          this.step == 1 &&
          this.nickName != "" &&
          pattern.test(this.nickName)
        ) {
          if (this.nickName.length >= 3) {
            if (!this.users.includes(this.nickName.toString().toLowerCase())) {
              this.messageAccount =
                "Las contraseñas deben tener un mínimo de 6 caracteres..";
              this.step++;
            } else {
              this.messageAccount = "El apodo ya se encuentra utilizado";
            }
          } else {
            this.messageAccount = "El apodo debe tener más de 3 caracteres";
          }
        } else if (
          this.step == 2 &&
          this.password != "" &&
          this.passwordConfirm != ""
        ) {
          if (this.password == this.passwordConfirm) {
            if (this.password.length >= 6) {
              this.enterUser();
            } else {
              this.messageAccount =
                "Las contraseñas deben tener como mínimo 6 caracteres.";
            }
          } else {
            this.messageAccount = "Las contraseñas no coinciden.";
          }
        }
      } else if (option == "-") {
        if (this.step == 1) {
          this.dialog = false;
        } else {
          this.messageAccount = "";
          this.step--;
        }
      }
    },
    async enterUser() {
      this.loading = true;
      try {
        var Crypto = require("crypto-js");
        var newPass = Crypto.SHA256(this.password.toString()).toString();
        let data = await axios.post(this.baseUrl + "/auth/create", {
          nick: this.nickName.toString(),
          password: newPass,
          passwordConfirm: newPass,
          position: "user"
        });
        this.messageAccount = "";
        this.step++;
        this.$store.commit("login", {
          user: this.nickName.toString(),
          token: data.data.token,
          rol: "user"
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    }
  },
  watch: {
    dialogprops(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getUsers();
        this.nickName = "";
        this.password = "";
        this.passwordConfirm = "";
        this.step = 1;
        this.dialog = true;
        this.messageAccount = "Introduzca sus credenciales para continuar.";
      }
    }
  }
};
</script>