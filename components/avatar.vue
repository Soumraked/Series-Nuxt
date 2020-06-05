<template>
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
              <v-list-item-subtitle>{{nameApp}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="text-center">
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="theme" color="orange"></v-switch>
            </v-list-item-action>
            <v-list-item-title>{{nameApp}}</v-list-item-title>
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
    <SignIn :dialogprops="dialog" />
    <SignUp :dialogprops="dialog2" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default {
  name: "Avatar",
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      theme: null,
      dialog: 0,
      dialog2: 0
    };
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
    ...mapState(["nameApp", "user", "session", "rol", "baseUrl", "token"])
  },
  methods: {
    ...mapMutations(["login", "logout", "changeDialogSignIn"]),
    toRedirect(route) {
      if (this.$router.history.current.fullPath != route) {
        this.$router.push(route);
      }
    },
    signout() {
      this.nicknameUser = "";
      this.passwordUser = "";
      this.$store.commit("logout");
    },
    signUp() {
      this.dialog2 += 1;
    },
    signIn() {
      this.dialog += 1;
    }
  }
};
</script>