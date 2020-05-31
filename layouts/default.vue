<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <v-col class="text-center" cols="12">
        {{ nameApp }} - Ningún vídeo se encuentra alojado en nuestros
        servidores.
        <strong>&copy; {{ new Date().getFullYear() }}</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Navbar
  },
  computed: mapState(["nameApp"])
};
</script>
