/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentEntity } from './CommentEntity';
import type { User } from './User';

export type Reply = {
    id: string;
    text: string;
    comment: CommentEntity;
    user: User;
};

