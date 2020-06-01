<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Cover Image -->
      <!-- data.return = coverView = null; cover= [] -->
      <!-- methods readCover -->
      <div>
        <v-parallax :src="coverView"></v-parallax>
        <v-file-input
          class="px-3"
          v-model="cover"
          placeholder="Pick an Cover Image"
          prepend-icon="mdi-camera"
          label="Cover"
          @change="readCover"
        ></v-file-input>
      </div>
      <!-- Cover Image -->

      <v-container>
        <v-row justify="space-between">
          <!-- Thumbnail Image -->
          <v-col align="center" justify="center" sm="4">
            <v-parallax>
              <v-img :src="thumbnailView" class="px-5"></v-img>
            </v-parallax>
            <v-file-input
              class="px-3"
              v-model="thumbnail"
              placeholder="Pick an Thumbnail Image"
              prepend-icon="mdi-camera"
              label="Thumbnail"
              @change="readThumbnail"
            ></v-file-input>
          </v-col>
          <!-- Thumbnail Image -->

          <!-- Datos serie (Columna 2) -->
          <v-col cols="auto" sm="7">
            <v-row class="flex-column" justify="center">
              <!-- Name -->
              <v-col class="px-5">
                <v-text-field
                  autocomplete="off"
                  v-model="name"
                  :rules="nameRules"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <!-- Name -->

              <!-- Name -->
              <v-col class="px-5">
                <v-text-field
                  autocomplete="off"
                  v-model="nameAlternative"
                  :rules="nameAlternativeRules"
                  label="Nombre alternativo (será la id)"
                  required
                ></v-text-field>
              </v-col>
              <!-- Name -->

              <!-- Description -->
              <v-col class="px-5">
                <v-textarea
                  v-model="description"
                  :rules="descriptionRules"
                  label="Descripción"
                  required
                ></v-textarea>
              </v-col>
              <!-- Description -->

              <!-- Date -->
              <v-col class="px-5">
                <v-dialog
                  ref="dialog"
                  v-model="dateModal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de emisión"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateModal = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!-- Date -->

              <v-flex
                :wrap="true"
                class="d-flex flex-wrap justify-space-around"
              >
                <!-- Languague -->
                <v-col cols="12" sm="6">
                  <v-select
                    class="px-3"
                    v-model="selectLanguage"
                    :items="language"
                    :rules="[v => !!v || 'Language is required']"
                    label="Idioma"
                    required
                  ></v-select>
                </v-col>
                <!-- Languague -->

                <!-- Subtitle -->
                <v-col cols="12" sm="6">
                  <v-select
                    class="px-3"
                    v-model="selectSubtitle"
                    :items="subtitle"
                    :rules="[v => !!v || 'Subtitle is required']"
                    label="Subtitulos"
                    required
                  ></v-select>
                </v-col>
                <!-- Subtitle -->

                <!-- Type -->
                <v-col cols="12" sm="6">
                  <v-select
                    class="px-3"
                    v-model="selectType"
                    :items="type"
                    :rules="[v => !!v || 'Type is required']"
                    label="Tipo"
                    required
                  ></v-select>
                </v-col>
                <!-- Type -->

                <!-- Finished -->
                <v-col cols="12" sm="6">
                  <v-select
                    class="px-3"
                    v-model="selectFinished"
                    :items="finished"
                    :rules="[v => !!v || 'Input is required']"
                    label="Estado"
                    required
                  ></v-select>
                </v-col>
                <!-- Finished -->
              </v-flex>

              <v-combobox
                v-model="chips"
                :items="items"
                :rules="[v => !!v[0] || 'Genres is required']"
                chips
                clearable
                label="Géneros"
                multiple
                prepend-icon="mdi-clipboard-check"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                  </v-chip>
                </template>
              </v-combobox>
            </v-row>
          </v-col>
          <!-- Datos serie (Columna 2) -->
        </v-row>
      </v-container>

      <v-flex :wrap="true" class="d-flex flex-wrap justify-space-around">
        <!-- Chapter Image -->
        <v-col align="center" justify="center" sm="4">
          <v-file-input
            class="px-3"
            v-model="chapter"
            placeholder="Pick an Chapter Image"
            prepend-icon="mdi-camera"
            label="Chapter"
            @change="readChapter"
          ></v-file-input>

          <v-file-input
            v-model="textUrl"
            label="Chapters File"
            outlined
            dense
            required
          ></v-file-input>
        </v-col>
        <!-- Chapter Image -->

        <!-- Chapters File -->
        <v-col align="center" justify="center" sm="4">
          <v-img :src="chapterView" width="400" class="px-5"></v-img>
        </v-col>
        <!-- Chapters File -->
      </v-flex>
    </v-form>
    <!-- Button -->
    <v-row justify="center">
      <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ dialog }">
          <v-btn
            v-on="dialog"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            :loading="loadingbtn"
          >
            Enviar Datos
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reiniciar formulario
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Carga de archivos</span>
          </v-card-title>
          <v-card-text>{{ mensaje }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              :loading="loadingbtn"
              @click="dialog = false"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Button -->
  </div>
</template>

<script>
import axios from "axios";
const pattern = new RegExp("^[A-Z,0-9]+$", "i");
export default {
  data() {
    return {
      //<Cover Image>
      coverView: null,
      cover: [],
      //</CoverImage>

      //<Thumbnail Image>
      thumbnailView: "",
      thumbnail: [],
      //</Thumbnail Image>

      //<Chapter Image>
      chapterView: "",
      chapter: [],
      //</Chapter Image>

      //<Name>
      name: "",
      nameRules: [v => !!v || "Name is required"],
      //</Name>

      //<Name>
      nameAlternative: "",
      nameAlternativeRules: [
        v => !!v || "Name is required",
        v => pattern.test(v) || "Este campo solo debe tener letras o números."
      ],
      //</Name>

      //<Description>
      description: "",
      descriptionRules: [v => !!v || "Description is required"],
      //</Description>

      //<Language>
      selectLanguage: "Japones",
      language: ["Español", "Japones", "Chino", "Ingles"],
      //</Languague>

      //<Subtitle>
      selectSubtitle: "Español",
      subtitle: ["Español", "Ingles", "Sin subtitulos"],
      //</Subtitle>

      //<Type>
      selectType: "Anime",
      type: ["Anime", "Película", "Ova"],
      //</Type>

      //<Finished>
      selectFinished: "Finalizado",
      finished: ["Finalizado", "En emisión"],
      //</Finished>

      //<Date>
      date: new Date().toISOString().substr(0, 10),
      dateModal: false,
      //</Date>

      //<Chips>
      chips: [],
      items: [],
      //</Chips>

      //<Form>
      valid: true,
      //</Form>

      //<Btn Send Form>
      loadingbtn: false,
      dialog: false,
      mensaje: "",
      //</Btn Send Form>

      //<Chapters File>
      textUrl: null
      //</Chapters File>
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    //Read Cover
    readCover() {
      this.coverView = URL.createObjectURL(this.cover);
    },
    //Read Thumbnail
    readThumbnail() {
      this.thumbnailView = URL.createObjectURL(this.thumbnail);
    },
    // Read Chapter
    readChapter() {
      this.chapterView = URL.createObjectURL(this.chapter);
    },
    //Genres
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    //Obtain Genres from database
    async getItems() {
      let data = await axios.get(
        "https://us-central1-monosotakos.cloudfunctions.net/api/getApi/getGenres"
      );
      this.items = data.data;
    },
    //Send data to database
    async validate() {
      if (this.$refs.form.validate()) {
        this.loadingbtn = true;
        let carpeta = this.nameAlternative
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");
        let data = await axios.get(
          `https://us-central1-monosotakos.cloudfunctions.net/api/serie/exist/${carpeta}`
        );
        if (data.data.data) {
          this.mensaje = "Ya existe serie a ingresar.";
          this.dialog = true;
          this.loadingbtn = false;
          console.log("No continuar");
        } else {
          this.mensaje = "Subiendo datos, espere por favor.";
          this.dialog = true;
          this.send();
        }
      }
    },
    //Send data to database 2
    async send() {
      try {
        let carpeta = this.nameAlternative
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");

        const cover = new FormData();
        cover.append("image", this.cover, this.cover.name);
        const chapter = new FormData();
        chapter.append("image", this.chapter, this.chapter.name);
        const thumbnail = new FormData();
        thumbnail.append("image", this.thumbnail, this.thumbnail.name);

        let coverPost = await axios.post(
          `https://us-central1-monosotakos.cloudfunctions.net/api/image/upload/${carpeta}/cover`,
          cover
        );
        let chapterPost = await axios.post(
          `https://us-central1-monosotakos.cloudfunctions.net/api/image/upload/${carpeta}/chapter`,
          chapter
        );
        let thumbnailPost = await axios.post(
          `https://us-central1-monosotakos.cloudfunctions.net/api/image/upload/${carpeta}/thumbnail`,
          thumbnail
        );

        let coverUrl = coverPost.data.url;
        let chapterUrl = chapterPost.data.url;
        let thumbnailUrl = thumbnailPost.data.url;

        let finishedBool = this.selectFinished == "Finalizado";

        let seriePost = await axios.post(
          `https://us-central1-monosotakos.cloudfunctions.net/api/serie/create`,
          {
            name: this.name,
            nameAlternative: this.nameAlternative,
            language: this.selectLanguage,
            subtitles: this.selectSubtitle,
            dateOrigin: this.date.toString(),
            description: this.description,
            finished: finishedBool.toString(),
            coverImage: coverUrl,
            thumbnailImage: thumbnailUrl,
            chapterImage: chapterUrl,
            genres: this.chips,
            type: this.selectType
          }
        );

        console.log(seriePost);
        // this.loadingbtn = false;
        // this.mensaje = 'Acción completada con éxito.';

        this.sendChapterFile();
      } catch (error) {
        console.log(error.code);
      }
    },
    //Send Chapter to methods sendCahpter
    sendChapterFile() {
      const reader = new FileReader();
      reader.onload = e => {
        this.textExample = e.target.result;
        var txt = e.target.result.toString().split("\n");
        //console.log(txt)
        var txtAll = [];
        for (let i in txt) {
          let aux = txt[i].split("\t");
          if (aux[0].length > 0) {
            txtAll.push(aux);
          }
        }
        //Introduction ID
        let id = this.nameAlternative
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");
        this.sendChapter(id, txtAll);
      };
      reader.readAsText(this.textUrl);
    },
    //Send Chapters to database
    async sendChapter(id, txt) {
      try {
        let dataChap = await axios.post(
          `https://us-central1-monosotakos.cloudfunctions.net/api/chapter/create2`,
          {
            id: id,
            chapters: txt
          }
        );
        this.loadingbtn = false;
        this.mensaje = "Acción completada con éxito.";
      } catch (error) {
        console.log(error);
      }
    },
    //Reset form
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
