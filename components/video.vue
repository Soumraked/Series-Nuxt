<template>
  <v-layout column justify-center align-center>
    <!-- Reproductor -->
    <v-container>
      <h2 class="pa-0 ma-0 pt-12">{{ name }}</h2>
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/video%2FvideoPlay.JPG?alt=media"
        class="videoBox"
        @click="play = true"
        v-if="!play"
      ></v-img>

      <VideoPlayer v-if="play" :options="options" />
    </v-container>
    <!-- Reproductor -->

    <!-- Opciones capítulo -->
    <!-- Opciones debajo del episodio -->
    <v-container>
      <v-chip class="ma-2" outlined @click="toEpisode(1)" :disabled="disabledLeft">
        <v-icon left>mdi-arrow-left-thick</v-icon>Anterior
      </v-chip>

      <v-chip class="ma-2" outlined @click="toEpisode(2)">
        <v-icon left>mdi-format-list-checkbox</v-icon>Episodios
      </v-chip>

      <v-chip class="ma-2" outlined @click="toEpisode(3)" :disabled="disabledRight">
        Siguiente
        <v-icon right>mdi-arrow-right-thick</v-icon>
      </v-chip>
    </v-container>
    <!-- Opciones debajo del episodio -->

    <!-- Reportar episodio -->
    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on" @click="(sendReport = false), (dialogm1 = '')">
            Reportar Episodio
            <v-icon>mdi-flag-variant</v-icon>
          </v-btn>
        </template>
        <v-card v-if="!sendReport">
          <v-card-title>Reportar capítulo</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 270px;">
            <v-radio-group v-model="dialogm1">
              <v-radio v-for="(item, i) in reportList" :key="i" :label="item" :value="i"></v-radio>
            </v-radio-group>
            <v-text-field
              autocomplete="off"
              class="pa-0 ma-0 pt-0"
              v-if="dialogm1 == '5'"
              label="Introduce tu observación"
              v-model="dialogReport"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="report">Enviar</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="sendReport">
          <v-card-title>Reportar capítulo</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 55px;">
            <h3 class="pa-0 ma-0 pt-3">Su reporte a sido ingresado con éxito</h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Reportar episodio -->
    <!-- Opciones capítulo -->

    <!-- Pagination -->
    <v-container>
      <div class="text-center pagination1">
        <v-pagination v-model="page" :length="keys.length" total-visible="7"></v-pagination>
      </div>
      <div class="text-center pagination2">
        <v-pagination v-model="page" :length="keys.length" total-visible="12"></v-pagination>
      </div>
    </v-container>
    <v-btn outlined @click="toChapter(1)">
      <v-icon>mdi-play</v-icon>Ir a...
    </v-btn>
    <!-- Pagination -->
    <v-container>
      <Disqus :id="this.id" :number="this.num" :exist="true" />
    </v-container>
  </v-layout>
</template>

<script>
import VideoPlayer from "./videoPlayer";
import Disqus from "./Disqus";
import axios from "axios";
import { mapState } from "vuex";
export default {
  props: ["data", "options"],
  name: "SerieVideo",
  components: {
    VideoPlayer,
    Disqus
  },
  data() {
    return {
      page: 2,
      play: false,
      disabledLeft: false,
      disabledRight: false,
      previousChapter: "",
      nextChapter: "",
      id: "",
      num: "",
      name: "",
      title: "",
      keys: [],

      //Report Vars
      sendReport: false,
      dialogReport: "",
      dialogm1: "",
      dialog: false,
      reportList: {
        1: "No se reproduce el video.",
        2: "Problemas con los subtitulos.",
        3: "El reproductor presenta algún error.",
        4: "No se presenta información en la página.",
        5: "Otro:"
      }
      //
    };
  },
  computed: mapState(["baseUrl"]),
  created() {
    this.id = this.$route.params.id.toString();
    this.num = this.$route.params.id2.toString();
    //this.page = parseInt(this.$route.params.id.toString().split("_")[1], 10);
    this.name = this.data.data.name + "  " + this.$route.params.id2.toString();
    this.title =
      this.data.data.name + " - " + this.$route.params.id2.toString();
    this.keys = this.data.data.keys.sort();

    const keysConst = this.data.data.keys.sort();
    const idC = this.$route.params.id2.toString();
    const numC = this.$route.params.id2.toString();

    const c = keysConst.indexOf(idC);
    this.page = c + 1;
    const n = c + 1;
    const p = c - 1;

    const chapter = {};

    if (n < keysConst.length) {
      chapter.next = true;
      this.nextChapter = keysConst[n];
    } else {
      this.disabledRight = true;
      chapter.next = false;
    }

    if (p > 0) {
      chapter.previous = true;
      this.previousChapter = keysConst[p];
    } else {
      this.disabledLeft = true;
      chapter.previous = false;
    }
  },
  methods: {
    async report() {
      let message = "";
      if (this.dialogm1 == "5") {
        message = this.dialogReport;
      } else {
        message = this.reportList[this.dialogm1];
      }
      this.sendReport = true;
      let report = await axios.post(this.baseUrl + "/report/create", {
        id: `${this.id}`,
        number: `${this.num}`,
        message: message
      });
    },
    toEpisode(option) {
      switch (option) {
        case 1:
          this.$router.push(`/ver/${this.id}/${this.previousChapter}`);
          break;
        case 2:
          this.$router.push(`/series/${this.id}`);
          break;
        case 3:
          this.$router.push(`/ver/${this.id}/${this.nextChapter}`);
          break;
        default:
          console.log("Error desconocido.");
      }
    },
    toChapter(option) {
      this.$router.push(`/ver/${this.id}/${this.keys[this.page - 1]}`);
    }
  },
  head() {
    return {
      titleTemplate: this.title
    };
  }
};
</script>

<style>
.videoBox {
  width: 800px;
  margin: 50px auto;
}
body {
  margin: 0;
  padding: 0;
  text-align: center;
}
a {
  text-decoration: none;
}
h1 {
  font-size: 54px;
  margin: 30px 0 10px;
}
h2 {
  font-size: 22px;
}

@media (max-width: 768px) {
  .videoBox {
    width: 90%;
  }
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 16px;
  }
}

.pagination1 {
  display: none;
}
.pagination2 {
  display: block;
}

@media (max-width: 768px) {
  .pagination1 {
    display: block;
  }
  .pagination2 {
    display: none;
  }
}
</style>
