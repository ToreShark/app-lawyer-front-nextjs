/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CommentEntity } from '../models/CommentEntity';
import type { CreateCommentDto } from '../models/CreateCommentDto';
import type { CreateDocumentDto } from '../models/CreateDocumentDto';
import type { CreateReplyDto } from '../models/CreateReplyDto';
import type { CreateVoteDto } from '../models/CreateVoteDto';
import type { DocumentEntity } from '../models/DocumentEntity';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { SendCodeDto } from '../models/SendCodeDto';
import type { SignInUserDto } from '../models/SignInUserDto';
import type { Subcategory } from '../models/Subcategory';
import type { UpdateCommentDto } from '../models/UpdateCommentDto';
import type { UpdateReplyDto } from '../models/UpdateReplyDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UpdateVoteDto } from '../models/UpdateVoteDto';
import type { User } from '../models/User';
import type { Vote } from '../models/Vote';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns string
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static coffeesControllerFindAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/coffees',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static coffeesControllerFindOne(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/coffees/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Subcategory
     * @throws ApiError
     */
    public static subcategoriesControllerFindAll(): CancelablePromise<Array<Subcategory>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subcategories',
        });
    }

    /**
     * @param categoryId
     * @returns Subcategory
     * @throws ApiError
     */
    public static subcategoriesControllerFindByCategoryId(
        categoryId: string,
    ): CancelablePromise<Array<Subcategory>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subcategories/byCategory/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }

    /**
     * @param categoryName
     * @returns string
     * @throws ApiError
     */
    public static subcategoriesControllerFindIdByName(
        categoryName: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subcategories/idByName/{categoryName}',
            path: {
                'categoryName': categoryName,
            },
        });
    }

    /**
     * @param slug
     * @returns Subcategory
     * @throws ApiError
     */
    public static subcategoriesControllerFindBySlug(
        slug: string,
    ): CancelablePromise<Subcategory> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subcategories/bySlug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

    /**
     * @param id
     * @returns Subcategory
     * @throws ApiError
     */
    public static subcategoriesControllerFindById(
        id: string,
    ): CancelablePromise<Subcategory> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subcategories/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns boolean
     * @throws ApiError
     */
    public static authControllerSendCode(
        requestBody: SendCodeDto,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: SignInUserDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerRefreshTokens(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }

    /**
     * @returns DocumentEntity
     * @throws ApiError
     */
    public static documentsControllerFindAll(): CancelablePromise<Array<DocumentEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents',
        });
    }

    /**
     * @param requestBody
     * @returns DocumentEntity
     * @throws ApiError
     */
    public static documentsControllerCreate(
        requestBody: CreateDocumentDto,
    ): CancelablePromise<DocumentEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/documents',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns DocumentEntity
     * @throws ApiError
     */
    public static documentsControllerFindOne(
        id: string,
    ): CancelablePromise<Array<DocumentEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns DocumentEntity
     * @throws ApiError
     */
    public static documentsControllerUpdate(
        id: string,
    ): CancelablePromise<DocumentEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/documents/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns DocumentEntity
     * @throws ApiError
     */
    public static documentsControllerRemove(
        id: string,
    ): CancelablePromise<DocumentEntity> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/documents/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Category
     * @throws ApiError
     */
    public static categoriesControllerFindAll(): CancelablePromise<Array<Category>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories',
        });
    }

    /**
     * @param id
     * @returns Category
     * @throws ApiError
     */
    public static categoriesControllerFindOne(
        id: string,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param categoryName
     * @returns Subcategory
     * @throws ApiError
     */
    public static categoriesControllerFindIdByName(
        categoryName: string,
    ): CancelablePromise<Array<Subcategory>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/idByName/{categoryName}',
            path: {
                'categoryName': categoryName,
            },
        });
    }

    /**
     * @param slug
     * @returns Category
     * @throws ApiError
     */
    public static categoriesControllerFindBySlug(
        slug: string,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/byCategorySlug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }

    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersControllerCreate(
        requestBody: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static usersControllerFindAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static usersControllerFindOne(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static usersControllerRemove(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static commentsControllerFindAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments',
        });
    }

    /**
     * @param requestBody
     * @returns CommentEntity
     * @throws ApiError
     */
    public static commentsControllerCreateComment(
        requestBody: CreateCommentDto,
    ): CancelablePromise<CommentEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns CommentEntity
     * @throws ApiError
     */
    public static commentsControllerFindOne(
        id: string,
    ): CancelablePromise<CommentEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/subcategory/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static commentsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comments/subcategory/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public static commentsControllerGetVotes(
        commentId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{commentId}/votes',
            path: {
                'commentId': commentId,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static commentsControllerUpdate(
        id: string,
        requestBody: UpdateCommentDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param userId
     * @param commentId
     * @returns Vote
     * @throws ApiError
     */
    public static votesControllerUpvote(
        userId: string,
        commentId: string,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/votes/{commentId}/upvote',
            path: {
                'userId': userId,
                'commentId': commentId,
            },
        });
    }

    /**
     * @param userId
     * @param commentId
     * @returns Vote
     * @throws ApiError
     */
    public static votesControllerDownvote(
        userId: string,
        commentId: string,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/votes/{commentId}/downvote',
            path: {
                'userId': userId,
                'commentId': commentId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static votesControllerCreate(
        requestBody: CreateVoteDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/votes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static votesControllerFindAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/votes',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static votesControllerFindOne(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/votes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static votesControllerUpdate(
        id: string,
        requestBody: UpdateVoteDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/votes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static votesControllerRemove(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/votes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static replyControllerCreate(
        requestBody: CreateReplyDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reply',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns string
     * @throws ApiError
     */
    public static replyControllerFindAll(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reply',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static replyControllerFindOne(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reply/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static replyControllerUpdate(
        id: string,
        requestBody: UpdateReplyDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/reply/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns string
     * @throws ApiError
     */
    public static replyControllerRemove(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/reply/{id}',
            path: {
                'id': id,
            },
        });
    }

}
