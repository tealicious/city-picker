<template>
    <span><slot></slot></span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Typer',
  mounted() {
    let i = 0;
    if (!this.$el || !this.$el.innerHTML) return;
    const text = this.$el.innerHTML;
    this.$el.innerHTML = '';
    const speed = 150;

    const typeWriter = () => {
      if (i < text.length) {
        this.$el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        i = 0;
        this.$el.innerHTML = '';
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  },
});
</script>
