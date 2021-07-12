import { identity, pickBy } from 'lodash';

export const cleanObject = obj => pickBy(obj, identity);
