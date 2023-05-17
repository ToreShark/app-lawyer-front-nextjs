/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentEntity } from './CommentEntity';
import type { DocumentEntity } from './DocumentEntity';
import type { Otp } from './Otp';
import type { Reply } from './Reply';
import type { Vote } from './Vote';

export type User = {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    otpCodes: Array<Otp>;
    docs: Array<DocumentEntity>;
    role: User.role;
    comments: Array<CommentEntity>;
    votes: Array<Vote>;
    replies: Array<Reply>;
};

export namespace User {

    export enum role {
        REGULAR = 'regular',
        ADMIN = 'admin',
    }


}

