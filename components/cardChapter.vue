<template>
  <div>
    <v-card class="my-2 pa-2" width="275" @click="redirectTo(serie.serie, serie.number)">
      <v-img height="175" class="white--text align-end" :src="serie.image"></v-img>
      <v-card-text>
        <div class="my-0 subtitle-1">
          <h4 style="text-align:center;">{{ serie.name }} {{ serie.number }}</h4>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["serie"],
  name: "LastChapters",
  data() {
    return {
      selection: 1,
      loading: false
    };
  },
  methods: {
    redirectTo(id, number) {
      this.$router.push(`/ver/${id}/${number}`);
    }
  }
};
</script>
