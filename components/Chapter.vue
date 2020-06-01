<template>
  <v-responsive class="overflow-y-auto" max-height="300">
    <v-responsive class="pa-2">
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-list>
          <v-list-item v-for="item in chapters" :key="item.id" @click="toChapter(item.number)">
            <v-list-item-content v-if="subtitles != 'Sin subtitulos'">
              <v-list-item-title v-text="name + ' ' + item.number + ' sub ' + subtitles"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content v-if="subtitles == 'Sin subtitulos'">
              <v-list-item-title v-text="name + ' ' + item.number"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <div v-if="chapters.length == 0" align="center">
            <p>No se encontraron episodios ingresados para esta serie.</p>
          </div>
        </v-list>
      </v-lazy>
    </v-responsive>
  </v-responsive>
</template>

<script>
export default {
  props: ["chapters", "subtitles", "name", "id"],
  name: "Chapter",
  data: () => ({
    isActive: false
  }),
  methods: {
    toChapter(number) {
      this.$router.push(`/ver/${this.id}/${number}`);
    }
  }
};
</script>
