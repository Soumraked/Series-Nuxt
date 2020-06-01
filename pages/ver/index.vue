<template>
  <v-layout column justify-center align-center>
    <h1>Esta Página no existe, vuelva al inico.</h1>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "404 Page Not Found"
    };
  },
  created() {
    console.log("En ver");
  }
};
</script>
