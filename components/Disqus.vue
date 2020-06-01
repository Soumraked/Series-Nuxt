<template>
  <div>
    <vue-disqus
      v-if="exist"
      shortname="monos-otakos"
      :identifier="page_id"
      :url="'https://monos-otakos.disqus.com/' + id + '/' + number"
    ></vue-disqus>
  </div>
</template>

<script>
export default {
  props: ["id", "number", "exist"],
  name: "Disqus",
  data() {
    return {
      page_id: this.id + "/" + this.number
    };
  }
};
</script>
