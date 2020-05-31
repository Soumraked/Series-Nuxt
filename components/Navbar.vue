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
          <v-text-field hide-details label="Search (in coming)"></v-text-field>
        </v-col>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- Search End -->

        <!-- Options Navbar Start -->
        <div class="text-center">
          <v-menu :close-on-content-click="false" :nudge-width="200" left offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                    alt="Avatar"
                  />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                      alt="Avatar"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>User</v-list-item-title>
                    <v-list-item-subtitle>Monos Otakos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <!-- <v-switch v-model="$vuetify.theme.dark" color="orange"></v-switch> -->
                    <v-switch v-model="theme" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Modo oscuro</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
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
        <div class="text-center">
          <v-menu :close-on-content-click="false" :nudge-width="200" left offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                    alt="Avatar"
                  />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
                      alt="Avatar"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>User</v-list-item-title>
                    <v-list-item-subtitle>Monos Otakos</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <!-- <v-switch v-model="$vuetify.theme.dark" color="orange"></v-switch> -->
                    <v-switch v-model="theme" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Modo oscuro</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
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
              <v-text-field hide-details label="Search (in coming)"></v-text-field>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      theme: null
    };
  },

  mounted() {
    if (localStorage.theme) {
      if (localStorage.theme == "dark") {
        this.$vuetify.theme.dark = true;
        this.theme = true;
      } else {
        this.$vuetify.theme.dark = false;
        this.theme = false;
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.$vuetify.theme.dark = true;
      this.theme = true;
      localStorage.theme = "dark";
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      this.$vuetify.theme.dark = false;
      this.theme = true;
      localStorage.theme = "light";
    }
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
  computed: mapState(["nameApp"]),
  methods: {
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
