<template>
  <div>
    <v-layout justify-center align-center>
      <h1>Cargando solicitud...</h1>
    </v-layout>
  </div>
</template>

<script>
export default {
  created() {
    const id = this.$route.params.id.toString().split("_")[0];
    const num = this.$route.params.id.toString().split("_")[1];
    console.log("Index _id", id, num);
    this.$router.push(`/ver/${id}/${num}`);
  }
};
</script>
