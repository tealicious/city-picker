<template>
  <div v-if="!globalError">
    <h1>City Picker</h1>
    <p class="intro">
      Select a country and a state to start picking cities!
    </p>
    <h2>
      {{ selectedCities.length }}
      {{ selectedCities.length === 1 ? "city" : "cities" }} selected
    </h2>
    <CityPicker />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CityPicker from './components/CityPicker.vue';

export default defineComponent({
  name: 'App',
  components: {
    CityPicker,
  },
  data() {
    return {
      selectedCities: [] as string[],
    };
  },
});
</script>
<style lang="scss">
$color-disabled: rgb(170, 170, 170);
$red: #d2322d;
$blue: #3a87ad;
$yellow: #c09853;
@mixin tablet-up {
  @media (min-width: 769px) {
    @content;
  }
}

:root {
  * {
    box-sizing: border-box;
  }
}

$color-text: rgb(31, 31, 31);

body {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  height: 100%;
  font-family: "Roboto Mono", monospace;
  color: $color-text;
  * {
    font-family: inherit;
  }
  background-color: #f7f7f7;
  --ms-max-height: 50vh;
  --ms-placeholder-color: $color-text;
  @include tablet-up {
    padding-top: 6rem;
    --ms-max-height: calc(100vh - 500px);
  }
}

h1,
h2 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 2rem;
}
.intro {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
