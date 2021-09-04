import { Country, State, City } from '@/types';

export function countryOptionsFactory(fetchedCountries: Country[]): string[] {
  return fetchedCountries.map((country) => country.country_name);
}

export function stateOptionsFactory(fetchedStates: State[]): string[] {
  return fetchedStates.map((state) => state.state_name);
}

export function cityOptionsFactory(fetchedCities: City[]): string[] {
  return fetchedCities.map((city) => city.city_name);
}
