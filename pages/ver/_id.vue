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

//
<script>
import Video from "../../components/video";
import axios from "axios";
export default {
  components: {
    Video
  },
  // created() {
  //   console.log(this.$route.path);
  //   this.$router.push(this.$route.path);
  // },
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
        `https://us-central1-monosotakos.cloudfunctions.net/api/chapter/get/${
          route.params.id.toString().split("_")[0]
        }/${route.params.id.toString().split("_")[1]}`
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
