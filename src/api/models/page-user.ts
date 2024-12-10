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


import { User } from './user';

/**
 * 
 * @export
 * @interface PageUser
 */
export interface PageUser {
    /**
     * 
     * @type {Array<User>}
     * @memberof PageUser
     */
    records?: Array<User>;
    /**
     * 
     * @type {number}
     * @memberof PageUser
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PageUser
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PageUser
     */
    totalPage?: number;
    /**
     * 
     * @type {number}
     * @memberof PageUser
     */
    totalRow?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageUser
     */
    optimizeCountQuery?: boolean;
}


