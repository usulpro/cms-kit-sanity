import type { Kit } from '@focus-reactive/cms-kit/sanity';

import { types } from './blocks/sa-schemas';
import { namespace } from './namespace.config';
import { blocksMap } from './blocks/sa-components';
import templates from './blocks/sa-templates'

export const twExt: Kit = {
  name: namespace.name,
  [namespace.name]: {
    types,
    blocksMap,
    templates,
  },
};
