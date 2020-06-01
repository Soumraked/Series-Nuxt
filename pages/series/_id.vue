<template>
  <v-container>
    <div v-if="exist">
      <v-parallax :src="data.cover" height="200"></v-parallax>
      <info :data="data" />
      <Chapter :chapters="data.chapter" :subtitles="data.subtitles" :name="data.name" :id="id" />
    </div>
    <div v-if="!exist">Esta Página no existe, vuelva al inico.</div>
  </v-container>
</template>

<script>
import Info from "../../components/Info";
import Chapter from "../../components/Chapter";
import axios from "axios";
export default {
  components: {
    Info,
    Chapter
  },
  async asyncData({ route, store }) {
    try {
      const data = await axios.get(
        store.state.baseUrl + "/getApi/getSerie/" + route.params.id
      );
      return { data: data.data, exist: true, id: route.params.id };
    } catch (error) {
      return { error: error, exist: false };
      console.log(error);
    }
  }
};
</script>
