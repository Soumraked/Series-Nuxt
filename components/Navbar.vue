<template>
  <div>
    <v-container id="navbar">
      <v-toolbar>
        <a>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == false">
            <span class="titleWhite">{{ nameApp }}</span>
          </v-toolbar-title>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == true">
            <span class="titleDark">{{ nameApp }}</span>
          </v-toolbar-title>
        </a>
        <v-toolbar-items>
          <v-btn text @click="toRedirect('/')">
            <span>Inicio</span>
          </v-btn>
          <v-btn text @click="toRedirect('/series')">
            <span>Series</span>
          </v-btn>
          <v-btn text @click="toRedirect('/peliculas')">
            <span>Peliculas</span>
          </v-btn>
          <v-btn text disabled>
            <span>En emisión</span>
          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <!-- Search Start -->
        <v-col cols="12" sm="6" md="3">
          <Search />
        </v-col>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- Search End -->

        <!-- Options Navbar Start -->
        <Avatar />
        <!-- Options Navbar End -->
      </v-toolbar>
    </v-container>

    <!-- Navbar Responsive -->
    <v-container id="navbar2">
      <v-toolbar>
        <!-- <v-icon @click="drawer = true">mdi-apps</v-icon> -->
        <v-icon @click="drawer = true">mdi-menu</v-icon>
        <a>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == false">
            <span class="titleWhite">{{ nameApp }}</span>
          </v-toolbar-title>
          <v-toolbar-title @click="toRedirect('/')" v-if="$vuetify.theme.dark == true">
            <span class="titleDark">{{ nameApp }}</span>
          </v-toolbar-title>
        </a>

        <v-spacer></v-spacer>

        <!-- Options Navbar Start -->
        <Avatar />
        <!-- Options Navbar End -->
      </v-toolbar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item @click="toRedirect('/')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item>

            <v-list-item @click="toRedirect('/series')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Series</v-list-item-title>
            </v-list-item>

            <v-list-item @click="toRedirect('/peliculas')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-movie</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>Películas</v-list-item-title>
            </v-list-item>

            <v-list-item disabled @click="toRedirect('/')">
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon>mdi-monitor-multiple</v-icon>
                </v-list-item-icon>
              </v-list-item-action>
              <v-list-item-title>En emision</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <Search />
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>
    <!-- Navbar Responsive -->
  </div>
</template>

<script>
import Search from "./search";
import Avatar from "./avatar";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Navbar",
  components: {
    Search,
    Avatar
  },
  data() {
    return {
      drawer: false,
      group: null,
      theme: null
    };
  },
  created() {
    this.getSeries();
  },
  watch: {
    theme(newValue, oldValue) {
      this.$vuetify.theme.dark = newValue;
      if (newValue) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    }
  },
  computed: {
    ...mapState(["nameApp"])
  },
  methods: {
    ...mapActions(["getSeries"]),
    toRedirect(route) {
      if (this.$router.history.current.fullPath != route) {
        this.$router.push(route);
      }
    }
  }
};
</script>

<style>
.titleWhite {
  color: #000;
}
.titleDark {
  color: #fff;
}

@media screen and (max-width: 959px) {
  #navbar {
    display: none;
  }
  #navbar2 {
    display: block;
  }
}
@media screen and (min-width: 960px) {
  #navbar {
    display: block;
  }
  #navbar2 {
    display: none;
  }
}
</style>
