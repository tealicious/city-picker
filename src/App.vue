<template>
  <div v-if="!globalError">
    <h1>City Picker</h1>
    <p class="intro">
      Select a country and a state to start picking cities!
    </p>
    <hr />
    <h2>Step-Through Drodpdown A.</h2>
    <h3>
      {{ selectedCitiesCountB }}
      {{ selectedCitiesCountB === 1 ? "city" : "cities" }} selected
    </h3>
    <CityPicker
      @citiesSelected="$val => (selectedCitiesCountB = $val.length)"
      layout="step-through"
    />
    <hr />
    <h2>Step-Through Drodpdown B.</h2>
    <h3>W/ city count rendered in dropdown</h3>
    <CityPicker
      @citiesSelected="$val => (selectedCitiesCountC = $val.length)"
      layout="step-through"
      mode="multiple"
    />
    <hr />
    <h2>Form Layout</h2>
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

html {
  background-color: white;
}

body {
  max-width: 930px;
  margin: auto;
  padding: 2rem;
  height: 100%;
  font-family: "Roboto Mono", monospace;
  color: $color-text;
  * {
    font-family: inherit;
  }
  background-color: #f5faff;
  --ms-max-height: 50vh;
  --ms-placeholder-color: $color-text;
  --ms-tag-bg: #3a87ad;
  --ms-option-bg-selected: #3a87ad;
  --ms-option-bg-selected-pointed: #51a9d4;
  @include tablet-up {
    padding: 4rem 4rem 6rem;
    --ms-max-height: calc(100vh - 500px);
  }
}

hr {
  margin: 3rem 0;
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
  font-size: 30px;
}
.intro {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
