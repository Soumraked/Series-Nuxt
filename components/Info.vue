<template>
  <v-container>
    <v-card class="mx-auto">
      <v-container>
        <v-row justify="space-between">
          <!-- Imagen (columna 1) -->
          <v-col align="center" justify="center" sm="4">
            <v-img :src="data.thumbnail" class="px-5"></v-img>
          </v-col>
          <!-- Imagen (columna 1) -->

          <!-- Datos serie (Columna 2) -->
          <v-col cols="auto" sm="7">
            <v-row class="flex-column" justify="center">
              <v-col class="px-5">
                <h3>{{data.name}}</h3>
              </v-col>

              <v-col class="px-5">{{data.description}}</v-col>

              <v-col class="px-5">
                <p>Fecha de emisión: {{data.date}}</p>
              </v-col>

              <v-col class="px-5 py-0">
                <p>Estado: {{data.status}}</p>
              </v-col>

              <v-col align="center">
                <v-chip class="ma-2" outlined v-for="item2 in data.genres" :key="item2.id">{{item2}}</v-chip>
              </v-col>
            </v-row>
          </v-col>
          <!-- Datos serie (Columna 2) -->

          <!-- Boton guardar (Columna 3) -->
          <v-col sm="1">
            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-col>
          <!-- Boton guardar (Columna 3) -->
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>


<script>
export default {
  props: ["data"],
  name: "Information",
  data() {
    return {};
  },
  head() {
    return {
      titleTemplate: this.data.name
    };
  }
};
</script>