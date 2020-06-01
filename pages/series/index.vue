<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-layout :wrap="true">
        <v-flex
          md3
          v-for="(item, index) in seriesData"
          :key="index"
          class="d-flex flex-wrap justify-space-around"
        >
          <Card :serie="item" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Card from "../../components/cardSerie";
import axios from "axios";
export default {
  components: {
    Card
  },
  data() {
    return {};
  },
  async asyncData({ store }) {
    try {
      const data = await axios.get(store.state.baseUrl + "/getApi/getSerie");
      let auxData = [];
      for (let i in data.data) {
        if (data.data[i].type == "Anime") {
          auxData.push(data.data[i]);
        }
      }
      return { seriesData: auxData };
    } catch (error) {
      return { error: error };
      console.log(error);
    }
  },
  head() {
    return {
      titleTemplate: `Series`
    };
  }
};
</script>
