/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Otp = {
    id: number;
    user: User;
    code: number;
    expirationDate: string;
};

