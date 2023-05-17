/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Subcategory } from './Subcategory';

export type Category = {
    id: string;
    name: string;
    description: string;
    slug: string;
    subcategories: Array<Subcategory>;
};

