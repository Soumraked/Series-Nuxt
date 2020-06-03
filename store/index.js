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
  first: true,
  token: ""
});

export const mutations = {
  login(state, { user, rol, token }) {
    state.user = user;
    state.token = token;
    state.session = true;
    state.rol = rol;
    localStorage.user = user;
    localStorage.token = token;
    localStorage.rol = rol;
  },
  logout(state) {
    state.user = "";
    state.session = false;
    state.token = "";
    state.rol = "";
    localStorage.user = "";
    localStorage.token = "";
    localStorage.rol = "";
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
