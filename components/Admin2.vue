<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-file-input v-model="textUrl" label="File input" outlined dense required></v-file-input>
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
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data: () => ({
    loadingbtn: false,
    dialog: false,
    mensaje: "",
    validAdmin: true,
    textUrl: null,
    valid: true,
    select: null,
    items: [],
    id: []
  }),
  created() {
    this.getId();
  },
  computed: mapState(["baseUrl"]),
  methods: {
    async getId() {
      let data = await axios.get(this.baseUrl + "/getApi/getSerie");
      for (let i in data.data) {
        this.items.push(data.data[i].name);
        this.id.push(data.data[i].id);
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingbtn = true;
        this.mensaje = "Insertando capítulos.";
        this.dialog = true;
        this.send();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    send() {
      const reader = new FileReader();
      reader.onload = e => {
        this.textExample = e.target.result;
        var txt = e.target.result.toString().split("\n");
        var txtAll = [];
        for (let i in txt) {
          let aux = txt[i].split("\t");
          if (aux[0].length > 0) {
            txtAll.push(aux);
            //this.sendChapter(this.id[this.items.indexOf(this.select)], aux[0], aux[1]);
          }
        }
        this.sendChapter2(this.id[this.items.indexOf(this.select)], txtAll);
      };
      reader.readAsText(this.textUrl);
    },
    async sendChapter(id, number, link) {
      let dataChap = await axios.post(`${this.baseUrl}/chapter/create`, {
        id: id,
        number: number,
        link: link
      });
    },
    async sendChapter2(id, txt) {
      try {
        let dataChap = await axios.post(`${this.baseUrl}/chapter/create2`, {
          id: id,
          chapters: txt
        });
        this.mensaje = "Los datos fueron ingresados con éxito.";
        this.loadingbtn = false;
      } catch (error) {
        this.mensaje =
          "Los datos ingresados son identicos a los ya almacenados en la base de datos, verifica estos para continuar con la carga de datos.";
        this.loadingbtn = false;
      }
    }
  }
};
</script>
