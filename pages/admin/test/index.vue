<template>
  <div>
    <v-container v-if="auth">
      <v-container class="text-center">
        <h1>Datos de series</h1>
        <v-row>
          <v-col cols="12" sm="4">
            <v-file-input
              multiple
              v-model="file"
              label="File input"
              outlined
              dense
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn depressed color="primary" @click="cargar"
              >Cargar archivo Json</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-btn depressed color="secondary" @click="create"
            >Crear Datos Json</v-btn
          >
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
      <v-container class="text-center">
        <h1>Datos de usuarios</h1>
        <v-row>
          <v-col cols="12" sm="4">
            <v-file-input
              multiple
              v-model="file2"
              label="File input"
              outlined
              dense
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn depressed color="primary" @click="cargar21"
              >Cargar archivo Json</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-btn depressed color="secondary" @click="create2"
            >Crear Datos Json</v-btn
          >
        </v-row>
      </v-container>
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
import { throws } from "assert";
import axios from "axios";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      mountedFirst: false,
      auth: false,
      message: "",
      file: null,
      series: [],
      file2: null,
      users: []
    };
  },
  created() {
    this.getInfo();
    this.message = "Comprobando permisos, espere un momento...";
    if (this.mountedFirst) {
      this.comprobarPermisos();
    }
  },
  mounted() {
    this.comprobarPermisos();
    this.mountedFirst = true;
  },
  computed: {
    ...mapState(["baseUrl", "rol", "token", "user"])
  },
  methods: {
    async getInfo() {
      let dataSeries = await axios.get(this.baseUrl + "/serie/get");
      this.series = dataSeries.data;
      let dataUsers = await axios.get(this.baseUrl + "/auth/get");
      this.users = dataUsers.data;
    },
    create() {
      var FileSaver = require("file-saver");
      var JSZip = require("jszip");
      var zip = new JSZip();
      var data = zip.folder("Series");
      for (let i in this.series) {
        let content = JSON.stringify(this.series[i]["data"]);
        var blob = new Blob([content], { type: "json  ;charset=utf-8" });
        var name = this.series[i]["data"].id + ".json";
        data.file(name, blob, { type: "json  ;charset=utf-8" });
      }
      // FileSaver.saveAs(blob, this.series[i]['data'].name + ".json");
      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "DataBase.zip");
      });
    },
    create2() {
      var FileSaver = require("file-saver");
      var JSZip = require("jszip");
      var zip = new JSZip();
      var data = zip.folder("Users");
      for (let i in this.users) {
        let content = JSON.stringify(this.users[i]);
        var blob = new Blob([content], { type: "json  ;charset=utf-8" });
        var name = this.users[i].nick + ".json";
        data.file(name, blob, { type: "json  ;charset=utf-8" });
      }
      // FileSaver.saveAs(blob, this.users[i]['data'].name + ".json");
      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "UsersDataBase.zip");
      });
    },
    cargar() {
      for (let i in this.file) {
        this.cargar2(this.file[i]);
      }
    },
    cargar2(file) {
      const reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        this.sendData(data);
      };
      reader.readAsText(file);
    },
    async sendData(json) {
      let data = await axios.post(`${this.baseUrl}/serie/create2`, {
        data: json
      });
    },
    cargar21() {
      for (let i in this.file2) {
        this.cargar22(this.file2[i]);
      }
    },
    cargar22(file) {
      const reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        this.sendData2(data);
      };
      reader.readAsText(file);
    },
    async sendData2(json) {
      let data = await axios.post(`${this.baseUrl}/auth/create2`, {
        data: json
      });
    },
    ...mapMutations(["logout"]),
    async comprobarPermisos() {
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
        } else {
          this.message =
            "Las credenciales no concuerdan, inicia sesión nuevamente y recarga la página para solucionar el problema.";
          this.$store.commit("logout");
        }
      }
    }
  }
};
</script>
