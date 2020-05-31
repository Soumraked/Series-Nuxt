<template>
  <v-layout column justify-center align-center>
    <div v-if="exist">
      <v-parallax :src="data.cover"></v-parallax>
      <info :data="data" />
      <Chapter
        :chapters="data.chapter"
        :subtitles="data.subtitles"
        :name="data.name"
        :id="id"
      />
    </div>
    <div v-if="!exist">Esta Página no existe, vuelva al inico.</div>
  </v-layout>
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
        "https://us-central1-monosotakos.cloudfunctions.net/api/getApi/getSerie/" +
          route.params.id
      );
      return { data: data.data, exist: true, id: route.params.id };
    } catch (error) {
      return { error: error, exist: false };
      console.log(error);
    }
  }
};
</script>
