// tslint:disable
/**
 * 基于物联网的共享智能电动游船管理平台
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Code } from './code';

/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    isDeleted?: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    updatedAt?: string;
    /**
     * 
     * @type {number}
     * @memberof User
     */
    userId?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    role?: UserRoleEnum;
    /**
     * 
     * @type {Array<number>}
     * @memberof User
     */
    codeIds?: Array<number>;
    /**
     * 
     * @type {Array<Code>}
     * @memberof User
     */
    codes?: Array<Code>;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    isActive?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    isBlocked?: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    token?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum UserRoleEnum {
    NONE = 'NONE',
    USER = 'USER',
    ADMIN = 'ADMIN'
}


