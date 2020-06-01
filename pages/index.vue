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
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    Card
  },
  data() {
    return {
      load: false
    };
  },
  created() {
    this.$store.dispatch("firstLoad");
  },
  computed: mapState(["nameApp", "seriesData"]),
  methods: {
    ...mapActions(["firstLoad"])
  },
  head() {
    return {
      titleTemplate: this.nameApp
    };
  }
};
</script>
