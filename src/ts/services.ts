import axios from 'axios';

const emailAddress = process.env.VUE_APP_USER_EMAIL;
const token = process.env.VUE_APP_USER_TOKEN;

interface Country{
    'country_name': string,
    'country_short_name': string,
    'country_phone_code': number
}

interface State{
  'state_name': string
}

interface City{
  'city_name': string
}

export const fetchAuthToken = axios
  .get('https://www.universal-tutorial.com/api/getaccesstoken', {
    headers: {
      Accept: 'application/json',
      'api-token': `${token}`,
      'user-email': emailAddress,
    },
  })
  .then((res) => ({ ...res.data, tokenError: false }))
  .catch((error) => ({ error, tokenError: true }));

async function apiFetch(params: string): Promise<City[] | State[] | Country[]> {
  const fetchedToken = await fetchAuthToken;
  return axios
    .get(`https://www.universal-tutorial.com/api/${params}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Beaer ${fetchedToken.auth_token}`,
      },
    })
    .then((res) => ([...res.data]))
    .catch((err) => { throw err; });
}

export const getCountries = apiFetch('countries') as Promise<Country[]>;
export const getStates = (country: string): Promise<State[]> => apiFetch(`states/${country}`) as Promise<State[]>;
export const getCities = (state: string): Promise<City[]> => apiFetch(`cities/${state}`) as Promise<City[]>;
