/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Reply } from './Reply';
import type { Subcategory } from './Subcategory';
import type { User } from './User';
import type { Vote } from './Vote';

export type CommentEntity = {
    id: string;
    content: string;
    created_at: string;
    user: User;
    subcategory: Subcategory;
    votes: Array<Vote>;
    replies: Array<Reply>;
};

