/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { CommentEntity } from './CommentEntity';

export type Subcategory = {
    id: string;
    name: string;
    description: string;
    image: string;
    videos: Array<Record<string, any>>;
    content: string;
    category: Category;
    slug: string;
    comments: Array<CommentEntity>;
};

