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


import { BoatType } from './boat-type';

/**
 * 
 * @export
 * @interface PageBoatType
 */
export interface PageBoatType {
    /**
     * 
     * @type {Array<BoatType>}
     * @memberof PageBoatType
     */
    records?: Array<BoatType>;
    /**
     * 
     * @type {number}
     * @memberof PageBoatType
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PageBoatType
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PageBoatType
     */
    totalPage?: number;
    /**
     * 
     * @type {number}
     * @memberof PageBoatType
     */
    totalRow?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageBoatType
     */
    optimizeCountQuery?: boolean;
}

