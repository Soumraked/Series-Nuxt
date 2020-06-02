<template>
  <div>
    <div v-if="exist">
      <Video :data="data" :options="options" />
    </div>
    <v-layout column justify-center align-center v-if="!exist"
      >Esta Página no existe, vuelva al inico.</v-layout
    >
  </div>
</template>

<script>
import Video from "../../../components/video";
import axios from "axios";
export default {
  components: {
    Video
  },
  async asyncData({ route, store }) {
    try {
      const data = await axios.get(
        `${store.state.baseUrl}/chapter/get/${route.params.id}/${route.params.id2}`
      );

      const options = {};
      options.video = { url: data.data.link };
      options.autoplay = true;

      return { data: data, exist: true, options };
    } catch (error) {
      return { error: error, exist: false };
      console.log(error);
    }
  }
};
</script>
