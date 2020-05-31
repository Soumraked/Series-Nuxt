<template>
  <div>
    <d-player :options="options" ref="player"></d-player>
  </div>
</template>

<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "VideoPlayer",
  components: {
    "d-player": VueDPlayer
  },
  props: ["options"],
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    play() {
      console.log("En play");
    }
  }
};
</script>

<style>
.dplayer {
  width: 800px;
  margin: 50px auto;
}
body {
  margin: 0;
  padding: 0;
  text-align: center;
}
@media (max-width: 768px) {
  .dplayer {
    width: 90%;
  }
}
</style>
