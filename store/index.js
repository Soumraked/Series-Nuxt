export const state = () => ({
  nameApp: "Monos Otakos",
  user: "",
  pass: "",
  session: false,
  rol: ""
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
  }
};
