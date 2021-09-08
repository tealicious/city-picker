<template>
  <div class="city-picker-module flex-wrapper" :class="`layout-${layout}`">
    <h3 class="count">
      {{ cityCount }}
      {{ cityCount === 1 ? "city" : "cities" }} selected
    </h3>
    <app-select
      v-if="!stepThroughMode || !selectedCountry"
      class="country-picker"
      :class="[
        { fetching: fetchingCountries },
        { 'has-options': !fetchingCountries && countryOptions.length > 0 },
      ]"
      :options="countryOptions"
      v-model="selectedCountry"
      :disabled="!allowCountrySelect"
      :name="countryPickerID"
    >
      <template v-slot:label>
        {{ countrySelectLabel
        }}<app-typer v-if="fetchingCountries">...</app-typer>
      </template>
    </app-select>

    <app-select
      v-if="!stepThroughMode || (!selectedState && selectedCountry)"
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
      :name="statePickerID"
      :message="stateSelectMessage"
    >
      <template v-slot:label>
        <a
          href="javascript:void(0)"
          class="back-step"
          @click.prevent="reset"
          v-if="stepThroughMode && !fetchingStates"
        >
          Countries ></a
        >{{ stateSelectLabel }}<app-typer v-if="fetchingStates">...</app-typer>
      </template>
    </app-select>

    <app-select
      v-if="!stepThroughMode || (selectedState && selectedCountry)"
      class="city-picker"
      :class="[
        { fetching: fetchingCities },
        { 'has-options': !fetchingCities && cityOptions.length > 0 },
        {
          'has-no-options':
            selectedState && !fetchingCities && !cityOptions.length,
        },
      ]"
      :options="cityOptions"
      v-model="selectedCities"
      :disabled="!allowCitySelect"
      :name="cityPickerID"
      :message="citySelectMessage"
      :multiSelectedOptionLabel="cityCount === 1 ? 'city' : 'cities'"
      multi
      :mode="mode"
    >
      <template v-slot:label>
        <a
          href="javascript:void(0)"
          class="back-step"
          @click.prevent="reset"
          v-if="stepThroughMode && !fetchingStates"
        >
          Countries ></a
        >
        <a
          href="javascript:void(0)"
          class="back-step"
          @click.prevent="
            () => {
              selectedState = '';
              clearAllCities();
            }
          "
          v-if="stepThroughMode && !fetchingCities"
          >States ></a
        >{{ citySelectLabel }}<app-typer v-if="fetchingCities">...</app-typer>
      </template>
    </app-select>

    <div class="flex-wrapper button-wrapper">
      <button
        @click="selectAllCities"
        :disabled="
          !cityOptions.length ||
          cityOptions.length === cityCount ||
          !selectedState
        "
      >
        Select All Cities
      </button>
      <button
        class="clear"
        @click="clearAllCities"
        :disabled="!cityOptions.length || cityCount === 0 || !selectedState"
      >
        Clear All Cities
      </button>
      <button @click="reset" class="reset" :disabled="!stateOptions.length">
        Reset All Options
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppSelect from '@/components/AppSelect.vue';
import AppTyper from '@/components/AppTyper.vue';

import { getCountries, getStates, getCities } from '@/ts/services';

import {
  countryOptionsFactory,
  stateOptionsFactory,
  cityOptionsFactory,
  uuidv4,
} from '@/ts/utils';

import { Option, ErrorObj, Country } from '@/types';

export default defineComponent({
  name: 'CityPicker',
  components: {
    AppSelect,
    AppTyper,
  },
  props: {
    layout: {
      type: String,
      default: 'form',
    },
    mode: {
      type: String,
      default: 'tags',
    },
  },
  data() {
    return {
      globalError: false,
      fetchingCountries: true,
      countryOptions: [] as string[],
      selectedCountry: '',
      fetchingStates: false,
      stateOptions: [] as string[],
      selectedState: '',
      fetchingCities: false,
      cityOptions: [] as Option[],
      selectedCities: [] as string[],
      stepThroughMode: this.layout === 'step-through',
      countryPickerID: `${uuidv4()}_country_picker`,
      statePickerID: `${uuidv4()}_state_picker`,
      cityPickerID: `${uuidv4()}_city_picker`,
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
    selectedCities(newVal: string[]) {
      this.$emit('citiesSelected', newVal);
    },
  },
  methods: {
    clearAllCities(): void {
      this.selectedCities = [];
    },
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
      if ((countries as ErrorObj).isError) {
        this.globalError = true;
        return;
      }
      this.countryOptions = countryOptionsFactory(countries as Country[]);
      this.fetchingCountries = false;
    },
    async fetchStateOptions(country: string): Promise<void> {
      this.fetchingStates = true;
      this.resetStatesState();
      this.resetCitiesState();
      const states = await getStates(country);
      this.stateOptions = stateOptionsFactory(states);
      this.fetchingStates = false;
    },
    async fetchCityOptions(state: string): Promise<void> {
      this.fetchingCities = true;
      this.resetCitiesState();
      const cities = await getCities(state);
      this.cityOptions = cityOptionsFactory(cities);
      this.fetchingCities = false;
    },
  },
  computed: {
    cityCount(): number {
      return this.selectedCities.length;
    },
    allowCountrySelect(): boolean {
      return this.countryOptions.length > 0;
    },
    countrySelectLabel(): string {
      return !this.fetchingCountries ? 'Select a country' : 'Loading countries';
    },
    allowStateSelect(): boolean {
      return this.selectedCountry !== '' && this.stateOptions.length > 0;
    },
    stateSelectLabel(): string {
      let stateSelectLabel;
      if (!this.fetchingStates) {
        if (!this.stateOptions.length && this.selectedCountry !== '') {
          stateSelectLabel = `${this.selectedCountry} contains no states. Please select another country.`;
        } else {
          stateSelectLabel = 'Select a state';
        }
      } else {
        stateSelectLabel = 'Loading states';
      }
      return stateSelectLabel;
    },
    stateSelectMessage(): string {
      return this.selectedCountry
        ? `${this.selectedCountry}: please choose a state`
        : 'Please select a country first';
    },
    allowCitySelect(): boolean {
      return this.selectedState !== '' && this.cityOptions.length > 0;
    },
    citySelectLabel(): string {
      let selectCityLabel;
      if (!this.fetchingCities) {
        if (!this.cityOptions.length && this.selectedState !== '') {
          selectCityLabel = `${this.selectedState} contains no cities. Please select another state.`;
        } else if (this.cityOptions.length === 1) {
          selectCityLabel = 'Select a city';
        } else {
          selectCityLabel = 'Select cities';
        }
      } else {
        selectCityLabel = 'Loading cities';
      }
      return selectCityLabel;
    },
    citySelectMessage(): string {
      return this.selectedState
        ? `${this.selectedState}, ${this.selectedCountry}: Please choose your cities`
        : 'Please select a state first';
    },
  },
  mounted() {
    this.fetchCountryOptions();
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

.city-picker-module {
  @include tablet-up {
    padding: 2.5rem 2rem;
    background-color: var(--ms-bg-disabled);
    box-shadow: 12px 12px 12px 0px rgb(0 0 0 / 12%);
  }
}

.flex-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
  justify-content: center;
}

.count,
.input-group {
  flex: 0 1 100%;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.input-group {
  margin-bottom: 2rem;
  &.city-picker {
    margin: 0;
  }
  @include tablet-up {
    &:not(.city-picker) {
      flex: 0 1 50%;
      max-width: 50%;
    }
  }
  .layout-step-through & {
    @include tablet-up {
      &:not(.city-picker) {
        flex: 0 1 100%;
        max-width: 100%;
      }
    }
  }
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
  &.clear {
    background-color: $yellow;
    &:hover,
    &:active,
    &:focus {
      background-color: lighten($yellow, 20%);
    }
  }
  &.reset {
    background-color: $red;
    &:hover,
    &:active,
    &:focus {
      background-color: lighten($red, 20%);
    }
  }
  &:disabled {
    cursor: default;
    background-color: var(--ms-bg-disabled, #f3f4f6);
    border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
    color: $color-disabled;
    &:hover,
    &:active,
    &:focus {
      background-color: var(--ms-bg-disabled, #f3f4f6);
    }
  }
}

.button-wrapper {
  padding: 0 1rem;
  width: 100%;
}

.layout-step-through {
  .input-group {
    margin-bottom: 0;
  }
  button {
    margin: 0;
    flex: 0 1 100%;
    max-width: 100%;
    @include tablet-up {
      flex: 0 1 50%;
      max-width: 50%;
    }
  }
  button.reset {
    display: none;
  }
}

.back-step {
  color: $yellow;
  margin-right: 0.66rem;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
}
</style>
