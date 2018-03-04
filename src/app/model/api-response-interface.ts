import { Profile } from './profile';

export interface ApiResponseInterface {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': Array<Profile>;
    'hydra:totalItems': number;
}
