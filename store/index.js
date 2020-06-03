import axios from "axios";

export const state = () => ({
  nameApp: "Monos Otakos",
  baseUrl: "https://us-central1-monosotakos.cloudfunctions.net/api",
  // baseUrl: "https://us-central1-zanmax.cloudfunctions.net/api",
  user: "",
  pass: "",
  session: false,
  rol: "",
  seriesData: [],
  first: true
});

export const mutations = {
  login(state, { user, pass, rol }) {
    state.user = user;
    state.pass = pass;
    state.rol = rol;
    state.session = true;
    localStorage.user = user;
    localStorage.pass = pass;
    localStorage.rol = rol;
    localStorage.session = true;
  },
  logout(state) {
    state.user = "";
    state.pass = "";
    state.rol = "";
    state.session = false;
    localStorage.user = "";
    localStorage.pass = "";
    localStorage.rol = "";
    localStorage.session = false;
  },
  setSeriesData(state, payload) {
    state.seriesData = payload;
  },
  setFirst(state, status) {
    state.first = status;
  }
};

export const actions = {
  async nuxtServerInit({ commit, getters }) {
    commit("setFirst", false);
    try {
      const data = await axios.get(getters.getBaseUrl + "/last/get");
      commit("setSeriesData", data.data.slice(0, 24));
    } catch (error) {
      console.log(error);
    }
  },
  async firstLoad({ commit, getters }) {
    if (getters.getFirst) {
      try {
        const data = await axios.get(getters.getBaseUrl + "/last/get");
        commit("setSeriesData", data.data.slice(0, 24));
      } catch (error) {
        console.log(error);
      }
    } else {
      commit("setFirst", true);
    }
  }
};

export const getters = {
  getFirst(state) {
    return state.first;
  },
  getBaseUrl(state) {
    return state.baseUrl;
  }
};
