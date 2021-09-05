<template>
  <div>
    <h1>City Picker</h1>
    <p class="intro">
      Select a country and a state to start picking cities you find there!
    </p>
    <h2>
      {{ selectedCities.length }}
      {{ selectedCities.length === 1 ? "city" : "cities" }} selected
    </h2>
    <div class="flex-wrapper">
      <app-select
        class="country-picker"
        :class="[
          { fetching: fetchingCountries },
          { 'has-options': !fetchingCountries && countryOptions.length > 0 },
        ]"
        :options="countryOptions"
        v-model="selectedCountry"
        :disabled="!allowCountrySelect"
        name="countrySelect"
        :label="countrySelectLabel"
      />

      <app-select
        class="state-picker"
        :class="[
          { fetching: fetchingStates },
          { 'has-options': !fetchingStates && stateOptions.length > 0 },
          {
            'has-no-options':
              selectedCountry && !fetchingStates && !stateOptions.length,
          },
        ]"
        :options="stateOptions"
        v-model="selectedState"
        :disabled="!allowStateSelect"
        name="stateSelect"
        :label="stateSelectLabel"
        :message="stateSelectMessage"
      />

      <div
        class="input-group city-picker"
        :class="[
          { fetching: fetchingCities },
          { 'has-options': !fetchingCities && cityOptions.length > 0 },
          {
            'has-no-options':
              selectedState && !fetchingCities && !cityOptions.length,
          },
        ]"
      >
        <label for="citySelect">{{ citySelectLabel }}</label>
        <Multiselect
          id="citySelect"
          name="citySelect"
          v-model="selectedCities"
          :disabled="!allowCitySelect"
          mode="tags"
          noResultsText="You picked 'em all!"
          :placeholder="citySelectMessage"
          :canClear="false"
          :closeOnSelect="false"
          :searchable="false"
          :createTag="true"
          :options="cityOptions"
        />
      </div>

      <button @click="selectAllCities" :disabled="!cityOptions.length">
        Select All Cities
      </button>
      <button @click="reset" class="reset" :disabled="!stateOptions.length">
        Reset All Options
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Multiselect from '@vueform/multiselect';
import AppSelect from './components/AppSelect.vue';

import { getCountries, getStates, getCities } from './ts/services';

import {
  countryOptionsFactory,
  stateOptionsFactory,
  cityOptionsFactory,
} from './ts/utils';

import { Option } from '@/types';

export default defineComponent({
  name: 'App',
  components: {
    AppSelect,
    Multiselect,
  },
  data() {
    return {
      fetchingCountries: true,
      countryOptions: [] as string[],
      selectedCountry: '',
      fetchingStates: false,
      stateOptions: [] as string[],
      selectedState: '',
      fetchingCities: false,
      cityOptions: [] as Option[],
      selectedCities: [] as string[],
    };
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
    selectAllCities(): void {
      this.selectedCities = this.cityOptions.map(
        (cityOption) => cityOption.value,
      );
    },
    reset(): void {
      this.selectedCountry = '';
      this.fetchingStates = false;
      this.stateOptions = [];
      this.selectedState = '';
      this.fetchingCities = false;
      this.cityOptions = [];
      this.selectedCities = [];
    },
    resetStatesState(): void {
      this.selectedState = '';
      this.stateOptions = [];
    },
    resetCitiesState(): void {
      this.selectedCities = [];
      this.cityOptions = [];
    },
    async fetchCountryOptions(): Promise<void> {
      const countries = await getCountries;
      this.countryOptions = countryOptionsFactory(countries);
      this.fetchingCountries = false;
    },
    async fetchStateOptions(country: string): Promise<void> {
      this.resetStatesState();
      this.resetCitiesState();
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
      let stateSelectLabel;
      if (!this.fetchingStates) {
        if (!this.stateOptions.length && this.selectedCountry !== '') {
          stateSelectLabel = 'The selected country contains no states. Please select another country.';
        } else {
          stateSelectLabel = 'Select a state';
        }
      } else {
        stateSelectLabel = 'Fetching state options...';
      }
      return stateSelectLabel;
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
        } else if (this.cityOptions.length === 1) {
          selectCityLabel = 'Select a city';
        } else {
          selectCityLabel = 'Select cities';
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

<style src="@vueform/multiselect/themes/default.css"></style>
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

.flex-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
  justify-content: center;
}

$color-disabled: rgb(170, 170, 170);
$red: #d2322d;
$blue: #3a87ad;
$yellow: #c09853;

.input-group {
  flex: 0 1 100%;
  max-width: 100%;
  &.fetching {
    label {
      color: #468847;
    }
  }
  &.has-options {
    label {
      color: $blue;
    }
  }
  &.has-no-options {
    label {
      color: $red;
    }
  }
  @include tablet-up {
    &:not(.city-picker) {
      flex: 0 1 50%;
      max-width: 50%;
    }
  }
}

.multiselect-dropdown {
  max-height: var(--ms-max-height, 10rem);
  border-radius: 0;
  border: 1px solid #cecece; // override to match native select styles
  &.is-active {
    box-shadow: none;
  }
}

.multiselect.is-active,
select:focus,
select:active {
  box-shadow: none;
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.multiselect.is-disabled {
  color: $color-disabled;
}

button {
  padding: 0.5em 2em;
  text-transform: uppercase;
  color: white;
  background-color: $blue;
  font-size: 18px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin: 2rem 1rem 0;
  &:hover,
  &:active,
  &:focus {
    background-color: lighten($blue, 20%);
  }
  &.reset {
    background-color: $yellow;
    &:hover,
    &:active,
    &:focus {
      background-color: lighten($yellow, 20%);
    }
  }
  &:disabled {
    cursor: default;
    background-color: var(--ms-bg-disabled, #f3f4f6);
    border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
    color: $color-disabled;
  }
}
</style>
