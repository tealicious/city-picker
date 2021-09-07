<template>
  <div v-if="!globalError">
    <h1>City Picker</h1>
    <p class="intro">
      Select a country and a state to start picking cities!
    </p>
    <h2>As Step-Through Drodpdown</h2>
    <h3>
      {{ selectedCitiesCountB }}
      {{ selectedCitiesCountB === 1 ? "city" : "cities" }} selected
    </h3>
    <CityPicker
      @citiesSelected="$val => (selectedCitiesCountB = $val.length)"
      mode="step-through"
    />
    <hr />
    <h2>As Form</h2>
    <h3>
      {{ selectedCitiesCountA }}
      {{ selectedCitiesCountA === 1 ? "city" : "cities" }} selected
    </h3>
    <CityPicker @citiesSelected="$val => (selectedCitiesCountA = $val.length)" />
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
      selectedCitiesCountA: 0,
      selectedCitiesCountB: 0,
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
    padding: 4rem 2rem 6rem;
    --ms-max-height: calc(100vh - 500px);
  }
}

hr {
  margin: 3rem 0;
}

h1,
h2,
h3 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 2rem;
}
h1 {
  font-size:40px;
}
.intro {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
