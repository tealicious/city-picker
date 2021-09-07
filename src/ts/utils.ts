import {
  Country, State, City, Option, ErrorObj,
} from '@/types';

export function countryOptionsFactory(fetchedCountries: Country[]): string[] {
  return fetchedCountries.map((country) => country.country_name);
}

export function cityOptionsFactory(fetchedCities: City[] | ErrorObj): Option[] {
  // Occasionally, a city endpoint will 404 (looking at you, Antarctica).
  // we'll just treat this as a 0 results returned.
  if ((fetchedCities as ErrorObj).isError) return [];
  return (fetchedCities as City[]).map((city) => (
    { value: city.city_name, label: city.city_name }
  ));
}

export function stateOptionsFactory(fetchedStates: State[] | ErrorObj): string[] {
  // Have not seen a 404 on a state list fetch, but we'll mirror that behavior here just in case.
  if ((fetchedStates as ErrorObj).isError) return [];
  return (fetchedStates as State[]).map((state) => state.state_name);
}

export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
