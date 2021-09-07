import axios, { AxiosError } from 'axios';
import {
  Country, State, City, ErrorObj,
} from '@/types';

// Sort of pointless to try to keep secrets in a client-side-only app,
// but if this were a Nuxt implementation, all this stuff would be happening in a
// server-middleware property and if we cared to, we could make sure these values
// were only present on the server. As this is just a demo, I'm not going to rack
// my brain over securing these.
const emailAddress = process.env.VUE_APP_USER_EMAIL;
const token = process.env.VUE_APP_USER_TOKEN;

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

async function apiFetch(params: string): Promise<
  City[] | State[] | Country[] | ErrorObj
> {
  const fetchedToken = await fetchAuthToken;
  return axios
    .get(`https://www.universal-tutorial.com/api/${params}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Beaer ${fetchedToken.auth_token}`,
      },
    })
    .then((res) => ([...res.data]))
    .catch((err: AxiosError) => ({ isError: true, err }));
}

export const getCountries = apiFetch('countries') as Promise<Country[] | ErrorObj>;
export const getStates = (country: string): Promise<State[] | ErrorObj> => apiFetch(`states/${country}`) as Promise<State[] | ErrorObj>;
export const getCities = (state: string): Promise<City[] | ErrorObj> => apiFetch(`cities/${state}`) as Promise<City[] | ErrorObj>;
