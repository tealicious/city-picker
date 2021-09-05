<template>
  <div>
    <app-select
      class="country-picker"
      :options="countryOptions"
      v-model="selectedCountry"
      :disabled="!allowCountrySelect"
      name="countrySelect"
      :label="countrySelectLabel"
    />

    <app-select
      class="state-picker"
      :options="stateOptions"
      v-model="selectedState"
      :disabled="!allowStateSelect"
      name="stateSelect"
      :label="stateSelectLabel"
      :message="stateSelectMessage"
    />

    <app-select
      class="city-picker"
      :options="cityOptions"
      v-model="selectedcity"
      :disabled="!allowCitySelect"
      name="citySelect"
      :label="citySelectLabel"
      :message="citySelectMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCountries, getStates, getCities } from './ts/services';
import {
  countryOptionsFactory,
  stateOptionsFactory,
  cityOptionsFactory,
} from './ts/utils';
import AppSelect from './components/AppSelect.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      fetchingCountries: true,
      countryOptions: [] as string[],
      selectedCountry: '',
      fetchingStates: false,
      stateOptions: [] as string[],
      selectedState: '',
      fetchingCities: false,
      cityOptions: [] as string[],
      selectedcity: '',
    };
  },
  components: {
    AppSelect,
  },
  watch: {
    selectedCountry(newVal: string) {
      if (newVal) {
        this.fetchStateOptions(newVal);
      }
    },
    selectedState(newVal: string) {
      if (newVal) {
        this.fetchCityOptions(newVal);
      }
    },
  },
  methods: {
    resetStatesState(): void {
      this.selectedState = '';
      this.stateOptions = [];
    },
    resetCitiesState(): void {
      this.selectedcity = '';
      this.cityOptions = [];
    },
    resetAllState(): void {
      this.resetStatesState();
      this.resetCitiesState();
    },
    async fetchCountryOptions(): Promise<void> {
      const countries = await getCountries;
      this.countryOptions = countryOptionsFactory(countries);
      this.fetchingCountries = false;
    },
    async fetchStateOptions(country: string): Promise<void> {
      this.resetAllState();
      this.fetchingStates = true;
      const states = await getStates(country);
      this.stateOptions = stateOptionsFactory(states);
      this.fetchingStates = false;
    },
    async fetchCityOptions(state: string): Promise<void> {
      this.resetCitiesState();
      this.fetchingCities = true;
      const cities = await getCities(state);
      this.cityOptions = cityOptionsFactory(cities);
      this.fetchingCities = false;
    },
  },
  computed: {
    allowCountrySelect(): boolean {
      return this.countryOptions.length > 0;
    },
    countrySelectLabel(): string {
      return !this.fetchingCountries
        ? 'Select a country'
        : 'Fetching country options...';
    },
    allowStateSelect(): boolean {
      return this.selectedCountry !== '' && this.stateOptions.length > 0;
    },
    stateSelectLabel(): string {
      return !this.fetchingStates
        ? 'Select a state'
        : 'Fetching state options...';
    },
    stateSelectMessage(): string {
      return this.selectedCountry
        ? 'Please Choose an Option'
        : 'Please select a country first';
    },
    allowCitySelect(): boolean {
      return this.selectedState !== '' && this.cityOptions.length > 0;
    },
    citySelectLabel(): string {
      let selectCityLabel;
      if (!this.fetchingCities) {
        if (!this.cityOptions.length && this.selectedState !== '') {
          selectCityLabel = 'The selected state contains no cities. Please select another state.';
        } else {
          selectCityLabel = 'Select a city';
        }
      } else {
        selectCityLabel = 'Fetching city options...';
      }
      return selectCityLabel;
    },
    citySelectMessage(): string {
      return this.selectedState
        ? 'Please Choose an Option'
        : 'Please select a state first';
    },
  },
  mounted() {
    this.fetchCountryOptions();
  },
});
</script>

<style lang="scss">
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
body {
  max-width: 800px;
  margin: auto;
  padding: 2rem 2rem 0;

  @include tablet-up {
    padding-top:6rem;
  }
  height: 100%;
  font-family: "Roboto Mono", monospace;
  background-color: #f7f7f7;
}
#app > div {
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
}
.input-group {
  flex: 0 1 100%;
  max-width: 100%;
  @include tablet-up {
    &:not(.city-picker) {
      flex: 0 1 50%;
      max-width: 50%;
    }
  }
}
</style>
