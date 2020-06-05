<template>
  <div>
    <v-container class="text-center">
      <v-btn :loading="loading" @click="downloadWithAxios">
        Descargar
        <v-icon>mdi-arrow-down-bold-box-outline</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["url", "extension", "name"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${this.name}.${this.extension}`); //or any other extension
      document.body.appendChild(link);
      link.click();
      this.loading = false;
    },
    downloadWithAxios() {
      this.loading = true;
      axios({
        method: "get",
        url: `https://cors-anywhere.herokuapp.com/${this.url}`,
        responseType: "arraybuffer"
      })
        .then(response => {
          this.forceFileDownload(response);
        })
        .catch(() => console.log("error occured"));
    }
  }
};
</script>