<template>
  <div>
    <v-container class="px-0" fluid v-if="session && rol == 'admin'">
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
    <v-container v-if="!session || rol != 'admin'">
      <v-layout column justify-center align-center>
        <h3>
          No cuentas con los permisos necesarios para ingresar a este apartado.
        </h3>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      radioGroup: 3,
      option: [
        "Ingreso sólo de Series",
        "Ingreso sólo de capítulos",
        "Ingreso de series y capítulos"
      ]
    };
  },
  head() {
    return {
      titleTemplate: `Administrar`
    };
  },
  computed: {
    ...mapState(["nameApp", "user", "pass", "session", "rol"])
  }
};
</script>
