<template>
  <div>
    <v-container id="navbar">
      <v-toolbar>
        <a>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == false">
            <span class="titleWhite">{{ nameApp }}</span>
          </v-toolbar-title>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == true">
            <span class="titleDark">{{ nameApp }}</span>
          </v-toolbar-title>
        </a>
        <v-toolbar-items>
          <v-btn text @click="toRedirect('/')">
            <span>Inicio</span>
          </v-btn>
          <v-btn text @click="toRedirect('/series')">
            <span>Series</span>
          </v-btn>
          <v-btn text @click="toRedirect('/peliculas')">
            <span>Peliculas</span>
          </v-btn>
          <v-btn text disabled>
            <span>En emisión</span>
          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <!-- Search Start -->
        <v-col cols="12" sm="6" md="3">
          <Search />
        </v-col>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- Search End -->

        <!-- Options Navbar Start -->
        <div class="text-center">
          <v-menu :close-on-content-click="false" :nudge-width="200" left offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                    alt="Avatar"
                  />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                      alt="Avatar"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="!session">User</v-list-item-title>
                    <v-list-item-title v-if="session">
                      {{
                      user
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Monos Otakos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list class="text-center">
                <v-list-item>
                  <v-list-item-action>
                    <!-- <v-switch v-model="$vuetify.theme.dark" color="orange"></v-switch> -->
                    <v-switch v-model="theme" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Modo oscuro</v-list-item-title>
                </v-list-item>
                <div v-if="!session">
                  <v-list-item @click="signIn()">
                    <v-list-item-title>Iniciar sesión</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="signUp()">
                    <v-list-item-title>Crear cuenta</v-list-item-title>
                  </v-list-item>
                </div>
                <div v-if="session">
                  <v-list-item @click="toRedirect('/admin')" v-if="rol == 'admin'">
                    <v-list-item-title>Administrar</v-list-item-title>
                  </v-list-item>
                  <v-list-item disabled>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="signout()">
                    <v-list-item-title>Salir</v-list-item-title>
                  </v-list-item>
                </div>
              </v-list>
            </v-card>
          </v-menu>
        </div>
        <!-- Options Navbar End -->
      </v-toolbar>
    </v-container>

    <!-- Navbar Responsive -->
    <v-container id="navbar2">
      <v-toolbar>
        <!-- <v-icon @click="drawer = true">mdi-apps</v-icon> -->
        <v-icon @click="drawer = true">mdi-menu</v-icon>
        <a>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == false">
            <span class="titleWhite">{{ nameApp }}</span>
          </v-toolbar-title>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == true">
            <span class="titleDark">{{ nameApp }}</span>
          </v-toolbar-title>
        </a>

        <v-spacer></v-spacer>

        <!-- Options Navbar Start -->
        <div class="text-center">
          <v-menu :close-on-content-click="false" :nudge-width="200" left offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                    alt="Avatar"
                  />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                      alt="Avatar"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="!session">User</v-list-item-title>
                    <v-list-item-title v-if="session">
                      {{
                      user
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Monos Otakos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list class="text-center">
                <v-list-item>
                  <v-list-item-action>
                    <!-- <v-switch v-model="$vuetify.theme.dark" color="orange"></v-switch> -->
                    <v-switch v-model="theme" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Modo oscuro</v-list-item-title>
                </v-list-item>

                <div v-if="!session">
                  <v-list-item @click="signIn()">
                    <v-list-item-title>Iniciar sesión</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="signUp()">
                    <v-list-item-title>Crear cuenta</v-list-item-title>
                  </v-list-item>
                </div>
                <div v-if="session">
                  <v-list-item @click="toRedirect('/admin')" v-if="rol == 'admin'">
                    <v-list-item-title>Administrar</v-list-item-title>
                  </v-list-item>
                  <v-list-item disabled>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="signout()">
                    <v-list-item-title>Salir</v-list-item-title>
                  </v-list-item>
                </div>
              </v-list>
            </v-card>
          </v-menu>
        </div>
        <!-- Options Navbar End -->
      </v-toolbar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item @click="toRedirect('/')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item>

            <v-list-item @click="toRedirect('/series')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Series</v-list-item-title>
            </v-list-item>

            <v-list-item @click="toRedirect('/peliculas')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-movie</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Películas</v-list-item-title>
            </v-list-item>

            <v-list-item disabled @click="toRedirect('/')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-monitor-multiple</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>En emision</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <Search />
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>
    <!-- Navbar Responsive -->

    <!-- Dialog Sign In -->
    <v-dialog v-model="dialogSignIn" width="500">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Sign In</span>
        </v-card-title>

        <v-window>
          <v-window-item>
            <v-card-text>
              <v-text-field label="Nickname" type="text" autocomplete="off" v-model="nicknameUser"></v-text-field>
              <v-text-field label="Password" type="password" v-model="passwordUser"></v-text-field>
              <span class="caption grey--text text--darken-1">{{ mesajeAccount }}</span>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="dialogSignIn = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="enter()">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Sign In -->

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
              <span class="caption grey--text text--darken-1">{{ mesajeAccount }}</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              <v-text-field label="Confirm Password" type="password" v-model="passwordConfirm"></v-text-field>
              <span class="caption grey--text text--darken-1">{{ mesajeAccount }}</span>
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
          <v-btn :disabled="step === 1 || step === 3" text @click="stepOption('-')">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step === 3" text @click="dialog = false">Continuar</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="primary" depressed @click="stepOption('+')">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Sign Up -->
  </div>
</template>

<script>
import Search from "./search";
import axios from "axios";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
const pattern = new RegExp("^[A-Z,0-9]+$", "i");
export default {
  name: "Navbar",
  components: {
    Search
  },
  data() {
    return {
      drawer: false,
      group: null,
      theme: null,
      dialog: false,
      step: 1,
      nickName: "",
      nickNameRules: [v => pattern.test(v), v => v != ""],
      password: "",
      passwordConfirm: "",
      validNickName: false,
      validPassword: true,
      dialogSignIn: false,
      nicknameUser: "",
      passwordUser: "",
      mesajeAccount: "",
      users: []
    };
  },
  created() {
    this.getUsers();
    this.getSeries();
  },
  mounted() {
    if (localStorage.user) {
      if (localStorage.user == "") {
        this.$store.commit("logout");
      } else {
        this.$store.commit("login", {
          user: localStorage.user,
          token: localStorage.token,
          rol: localStorage.rol
        });
      }
    }
    if (localStorage.theme) {
      if (localStorage.theme == "dark") {
        this.$vuetify.theme.dark = true;
        this.theme = true;
      } else {
        this.$vuetify.theme.dark = false;
        this.theme = false;
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.$vuetify.theme.dark = true;
      this.theme = true;
      localStorage.theme = "dark";
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      this.$vuetify.theme.dark = false;
      this.theme = true;
      localStorage.theme = "light";
    }
  },
  watch: {
    theme(newValue, oldValue) {
      this.$vuetify.theme.dark = newValue;
      if (newValue) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    }
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
    ...mapState([
      "nameApp",
      "user",
      "pass",
      "session",
      "rol",
      "baseUrl",
      "token"
    ])
  },
  methods: {
    ...mapMutations(["login", "logout"]),
    ...mapActions(["getSeries"]),
    async getUsers() {
      let data = await axios.get(`${this.baseUrl}/auth/get`);
      this.users = data.data;
    },
    toRedirect(route) {
      if (this.$router.history.current.fullPath != route) {
        this.$router.push(route);
      }
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
              this.mesajeAccount =
                "Las contraseñas deben tener un mínimo de 6 caracteres..";
              this.step++;
            } else {
              this.mesajeAccount = "El apodo ya se encuentra utilizado";
            }
          } else {
            this.mesajeAccount = "El apodo debe tener más de 3 caracteres";
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
              this.mesajeAccount =
                "Las contraseñas deben tener como mínimo 6 caracteres.";
            }
          } else {
            this.mesajeAccount = "Las contraseñas no coinciden.";
          }
        }
      } else if (option == "-") {
        this.mesajeAccount = "";
        this.step--;
      }
    },
    async enterUser() {
      try {
        var Crypto = require("crypto-js");
        var newPass = Crypto.SHA256(this.password.toString()).toString();
        let data = await axios.post(this.baseUrl + "/auth/create", {
          nick: this.nickName.toString(),
          password: newPass,
          passwordConfirm: newPass,
          position: "user"
        });
        this.mesajeAccount = "";
        this.step++;
        this.$store.commit("login", {
          user: this.nickName.toString(),
          token: data.data.token,
          rol: "user"
        });
      } catch (error) {
        console.log(error);
      }
    },
    signout() {
      this.nicknameUser = "";
      this.passwordUser = "";
      this.$store.commit("logout");
    },
    signUp() {
      this.dialog = true;
      this.mesajeAccount =
        "El nombre de usuario debe tener 3 o más caracteres, no debe contener espacios y solo se aceptan letras y números.";
    },
    signIn() {
      this.dialogSignIn = true;
      this.mesajeAccount = "Introduzca sus credenciales para continuar.";
    },
    async enter() {
      if (this.nicknameUser == "" || this.passwordUser == "") {
        this.mesajeAccount = "Complete los campos antes de continuar.";
      } else {
        var Crypto = require("crypto-js");
        var newPass = Crypto.SHA256(this.passwordUser.toString()).toString();
        let data = await axios.post(this.baseUrl + "/auth/login", {
          nick: this.nicknameUser.toString(),
          password: newPass
        });
        if (data.data.message == "Wrong password, try again.") {
          this.mesajeAccount = "Contraseña incorrecta, intente nuevamente.";
        } else if (
          data.data.message == "User entered does not exist, try again."
        ) {
          this.mesajeAccount =
            "El usuario ingresado no existe, verifique la información e intente nuevamente.";
        } else if (data.data.token) {
          this.mesajeAccount = "Datos validados.";
          this.$store.commit("login", {
            user: data.data.nick,
            token: data.data.token,
            rol: data.data.rol
          });
          this.dialogSignIn = false;
        } else {
          this.mesajeAccount =
            "Error desconocido, intente nuevamente o contáctese con el administrador.";
        }
      }
    }
  }
};
</script>

<style>
.titleWhite {
  color: #000;
}
.titleDark {
  color: #fff;
}

@media screen and (max-width: 959px) {
  #navbar {
    display: none;
  }
  #navbar2 {
    display: block;
  }
}
@media screen and (min-width: 960px) {
  #navbar {
    display: block;
  }
  #navbar2 {
    display: none;
  }
}
</style>
