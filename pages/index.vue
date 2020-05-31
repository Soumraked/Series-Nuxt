<template>
  <v-layout column justify-center align-center>
    <!-- Mostrar últimos capítulos agregados -->
    <v-container fluid>
      <v-row>
        <v-layout :wrap="true">
          <v-flex lg3 v-for="(item, index) in seriesData" :key="index">
            <v-col class="d-flex flex-wrap justify-space-around">
              <Card :serie="item.data" />
            </v-col>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
    <!-- Mostrar últimos capítulos agregados -->
  </v-layout>
</template>

<script>
import Card from "../components/cardChapter";
import { mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    Card
  },
  data() {
    return {};
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    try {
      const data = await axios.get(
        "https://us-central1-monosotakos.cloudfunctions.net/api/last/get"
      );
      return { seriesData: data.data.slice(0, 24) };
    } catch (error) {
      return { error: error };
      console.log(error);
    }
  },
  computed: mapState(["nameApp"]),
  head() {
    return {
      titleTemplate: this.nameApp
    };
  }
};
</script>
