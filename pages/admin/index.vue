<template>
  <div>
    <v-container class="px-0" fluid v-if="auth">
      <v-radio-group v-model="radioGroup">
        <v-flex :wrap="true" class="d-flex flex-wrap justify-space-around">
          <v-radio
            v-for="(item, index) in option"
            :key="index"
            :label="item"
            :value="index + 1"
          ></v-radio>
        </v-flex>
      </v-radio-group>
      <Admin1 v-if="radioGroup == 1" />
      <Admin2 v-if="radioGroup == 2" />
      <Admin3 v-if="radioGroup == 3" />
    </v-container>
    <v-container v-if="!auth">
      <v-layout column justify-center align-center>
        <h3>
          {{ message }}
        </h3>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";
import Admin1 from "../../components/Admin1";
import Admin2 from "../../components/Admin2";
import Admin3 from "../../components/Admin3";
export default {
  components: {
    Admin1,
    Admin2,
    Admin3
  },
  data() {
    return {
      mountedFirst: false,
      auth: false,
      message: "",
      radioGroup: 3,
      option: [
        "Ingreso sólo de Series",
        "Ingreso sólo de capítulos",
        "Ingreso de series y capítulos"
      ]
    };
  },
  created() {
    this.message = "Comprobando permisos, espere un momento...";
    if (this.mountedFirst) {
      this.comprobarPermisos();
    }
  },
  head() {
    return {
      titleTemplate: `Administrar`
    };
  },
  mounted() {
    this.comprobarPermisos();
    this.mountedFirst = true;
  },
  computed: {
    ...mapState(["user", "token", "baseUrl"])
  },
  methods: {
    ...mapMutations(["logout"]),
    async comprobarPermisos() {
      if (this.token) {
        const jwtDecode = require("jwt-decode");
        var decoded = jwtDecode(this.token);
        if (decoded.exp * 1000 < Date.now()) {
          this.$store.commit("logout");
          this.message =
            "Las credenciales han expirado, prueba iniciando sesión nuevamente.";
        } else {
          if (
            this.user.toLowerCase() == decoded.email.split("@monosotakos.ga")[0]
          ) {
            try {
              let data = await axios.post(`${this.baseUrl}/auth/auth`, {
                nick: decoded.email.split("@monosotakos.ga")[0].toString(),
                userId: decoded.user_id.toString()
              });
              if (data.data.rol == "admin") {
                this.auth = true;
              } else {
                this.message =
                  "No cuentas con los permisos necesarios para ingresar a este apartado.";
              }
            } catch (error) {
              console.log(error);
              this.message =
                "Error desconocido, vuelve a iniciar sesión para continuar.";
              this.$store.commit("logout");
            }
          } else {
            this.message =
              "Las credenciales no concuerdan, inicia sesión nuevamente y recarga la página para solucionar el problema.";
            this.$store.commit("logout");
          }
        }
      } else {
        this.message =
          "Error desconocido, vuelve a iniciar sesión para continuar.";
        this.$store.commit("logout");
      }
    }
  }
};
</script>
