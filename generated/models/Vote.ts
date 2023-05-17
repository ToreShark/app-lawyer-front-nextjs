/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentEntity } from './CommentEntity';
import type { User } from './User';

export type Vote = {
    id: string;
    value: boolean;
    user: User;
    comment: CommentEntity;
    createdAt: string;
    updatedAt: string;
};

