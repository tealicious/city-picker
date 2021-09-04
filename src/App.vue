<template>
<div>
  <h2>Selected Country: {{selectedCountry}}</h2>
  <app-select
    :options="countryOptions"
    v-model="selectedCountry"
    name="countrySelect"
    label="select a country"
  />

  <h3>Selected State: {{selectedState}}</h3>
  <app-select
    :options="stateOptions"
    v-model="selectedState"
    disabled
    name="stateSelect"
    label="select a state"
  />

  <h3>Selected City: {{selectedcity}}</h3>
  <app-select
    :options="cityOptions"
    v-model="selectedcity"
    disabled
    name="citySelect"
    label="select a city"
  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCountries, getStates, getCities } from './ts/services';
import { countryOptionsFactory, stateOptionsFactory, cityOptionsFactory } from './ts/utils';
import AppSelect from './components/AppSelect.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      countryOptions: [] as string[],
      selectedCountry: '',
      stateOptions: [] as string[],
      selectedState: '',
      cityOptions: [] as string[],
      selectedcity: '',
    };
  },
  components: {
    AppSelect,
  },
  async mounted() {
    const countries = await getCountries;
    this.countryOptions = countryOptionsFactory(countries);

    const states = await getStates('United States');
    this.stateOptions = stateOptionsFactory(states);

    const cities = await getCities('Ohio');
    this.cityOptions = cityOptionsFactory(cities);
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
