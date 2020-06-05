<template>
  <div>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field autocomplete="off" v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>

        <v-combobox
          v-model="nameAlternative"
          chips
          clearable
          label="Nombres Alternativos"
          multiple
          prepend-icon="mdi-clipboard-check"
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="removeName(item)"
            >
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>

        <v-textarea v-model="description" :rules="descriptionRules" label="Descripción" required></v-textarea>

        <v-row no-gutters>
          <v-col cols="12" sm="3">
            <v-select
              class="px-3"
              v-model="selectLanguage"
              :items="language"
              :rules="[v => !!v || 'Language is required']"
              label="Idioma"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="3">
            <v-select
              class="px-3"
              v-model="selectSubtitle"
              :items="subtitle"
              :rules="[v => !!v || 'Subtitle is required']"
              label="Subtitulos"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="3">
            <v-select
              class="px-3"
              v-model="selectType"
              :items="type"
              :rules="[v => !!v || 'Type is required']"
              label="Tipo"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="3">
            <v-select
              class="px-3"
              v-model="selectFinished"
              :items="finished"
              :rules="[v => !!v || 'Input is required']"
              label="Estado"
              required
            ></v-select>
          </v-col>
        </v-row>

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
            <v-btn text color="primary" @click="dateModal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>

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
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>

        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <v-file-input
              class="px-3"
              :rules="[v => !!v.name || 'Chapter image is required']"
              v-model="chapterInput"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an Chapter Image"
              prepend-icon="mdi-camera"
              label="Chapter"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="4">
            <v-file-input
              class="px-3"
              :rules="[v => !!v.name || 'Cover image is required']"
              v-model="coverInput"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an Cover Image"
              prepend-icon="mdi-camera"
              label="Cover"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="4">
            <v-file-input
              class="px-3"
              :rules="[v => !!v.name || 'Thumbnail image is required']"
              v-model="thumbnailInput"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an Thumbnail Image"
              prepend-icon="mdi-camera"
              label="Thumbnail"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
      </v-form>

      <div>
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
              >Complete</v-btn>

              <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Carga de archivos</span>
              </v-card-title>
              <v-card-text>{{ mensaje }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text :loading="loadingbtn" @click="dialog = false">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
const pattern = new RegExp("^[A-Z,0-9]+$", "i");
export default {
  data: () => ({
    loadingbtn: false,
    dialog: false,
    mensaje: "",
    coverInput: [],
    chapterInput: [],
    thumbnailInput: [],
    chips: [],
    items: [],
    date: new Date().toISOString().substr(0, 10),
    dateModal: false,
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    nameAlternative: [],

    description: "",
    descriptionRules: [v => !!v || "Description is required"],
    selectLanguage: "Japones",
    language: ["Español", "Japones"],
    selectSubtitle: "Español",
    subtitle: ["Español", "Japones"],
    selectType: null,
    type: ["Anime", "Película", "Ova"],
    selectFinished: null,
    finished: ["Finalizado", "En emisión"],
    checkbox: false
  }),
  created() {
    this.getItems();
  },
  computed: mapState(["baseUrl"]),
  methods: {
    async getItems() {
      try {
        let data = await axios.get(this.baseUrl + "/getApi/getGenres");
        this.items = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async validate() {
      if (this.$refs.form.validate()) {
        this.loadingbtn = true;
        let carpeta = this.name
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");
        try {
          let data = await axios.get(`${this.baseUrl}/serie/exist/${carpeta}`);
          if (data.data.data) {
            this.mensaje = "Ya existe serie a ingresar.";
            this.dialog = true;
            this.loadingbtn = false;
          } else {
            this.mensaje = "Subiendo datos, espere por favor.";
            this.dialog = true;
            this.send();
          }
        } catch (error) {
          this.mensaje =
            "Error desconocido, intente nuevamente, si el error persiste contáctese con el desarrollador.";
          this.dialog = true;
          this.loadingbtn = false;
          console.log(error);
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    removeName(item) {
      this.nameAlternative.splice(this.nameAlternative.indexOf(item), 1);
      this.nameAlternative = [...this.nameAlternative];
    },
    async send() {
      try {
        let carpeta = this.name
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");

        const cover = new FormData();
        cover.append("image", this.coverInput, this.coverInput.name);
        const chapter = new FormData();
        chapter.append("image", this.chapterInput, this.chapterInput.name);
        const thumbnail = new FormData();
        thumbnail.append(
          "image",
          this.thumbnailInput,
          this.thumbnailInput.name
        );

        let coverPost = await axios.post(
          `${this.baseUrl}/image/upload/${carpeta}/cover`,
          cover
        );
        let chapterPost = await axios.post(
          `${this.baseUrl}/image/upload/${carpeta}/chapter`,
          chapter
        );
        let thumbnailPost = await axios.post(
          `${this.baseUrl}/image/upload/${carpeta}/thumbnail`,
          thumbnail
        );

        let coverUrl = coverPost.data.url;
        let chapterUrl = chapterPost.data.url;
        let thumbnailUrl = thumbnailPost.data.url;

        let finishedBool = this.selectFinished == "Finalizado";

        let seriePost = await axios.post(`${this.baseUrl}/serie/create`, {
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
        });
        this.loadingbtn = false;
        this.mensaje = "Acción completada con éxito.";
      } catch (error) {
        this.loadingbtn = false;
        this.mensaje =
          "Error desconocido, intente nuevamente, si el error persiste contáctese con el desarrollador.";
        console.log(error.code);
      }
    }
  }
};
</script>
