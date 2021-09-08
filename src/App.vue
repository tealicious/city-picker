<template>
  <div v-if="!globalError">
    <h1>City Picker</h1>
    <p class="intro">
      Select a country and a state to start picking cities!
    </p>
    <hr />
    <h2>Step-Through Layout</h2>
    <CityPicker
      @citiesSelected="$val => (selectedCitiesCountB = $val.length)"
      layout="step-through"
    />
    <hr />
    <h2>Form Layout</h2>
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
      selectedCitiesCountC: 0,
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
  max-width: 65rem;
  margin: auto;
  padding: 2rem 1rem;
  height: 100%;
  font-family: "Roboto Mono", monospace;
  color: $color-text;
  * {
    font-family: inherit;
  }
  background-color: white;
  --ms-max-height: 50vh;
  --ms-placeholder-color: $color-text;
  --ms-tag-bg: #3a87ad;
  --ms-option-bg-selected: #3a87ad;
  --ms-option-bg-selected-pointed: #51a9d4;
  --ms-bg-disabled: #f5faff;
  @include tablet-up {
    padding: 4.5rem 6rem 6rem;
    --ms-max-height: calc(100vh - 600px);
  }
}

hr {
  margin: 2rem 0;
  opacity :0;
}

h1,
h2,
h3 {
  font-weight: 700;
  margin-bottom: 2rem;
}
h1 {
  font-size: 45px;
}
h2 {
  font-size: 35px;
}
h3 {
  font-size: 27.5px;
}
.intro {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
