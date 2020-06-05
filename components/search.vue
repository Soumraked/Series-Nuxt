<template>
  <div>
    <v-menu :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on }">
        <v-text-field hide-details label="Buscar..." v-model="search" v-on="on"></v-text-field>
      </template>
      <v-responsive class="overflow-y-auto" max-height="400" max-width="300">
        <v-lazy dense transition="fade-transition" v-if="options.length > 0">
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in options" :key="i" @click="toSerie(item)">
                <v-list-item-avatar>
                  <v-img :src="series[item].image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{series[item].name}}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip>{{series[item].type}}</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-lazy>
        <v-lazy
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
          v-if="options.length == 0 && search.length >= 2"
        >
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Sin resultados</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-lazy>
      </v-responsive>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      search: "",
      options: []
    };
  },
  computed: {
    ...mapState(["series"])
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue != "" && newValue.length >= 2) {
        let posible = [];
        for (let i in this.series) {
          if (this.series[i].names.includes(newValue.toLowerCase())) {
            posible.push(this.series[i].id);
          }
        }
        this.options = posible;
      } else {
        this.options = [];
      }
    }
  },
  methods: {
    toSerie(item) {
      this.$router.push(`/series/${item}`);
      this.search = "";
    }
  }
};
</script>