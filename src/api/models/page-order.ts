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


import { Order } from './order';

/**
 * 
 * @export
 * @interface PageOrder
 */
export interface PageOrder {
    /**
     * 
     * @type {Array<Order>}
     * @memberof PageOrder
     */
    records?: Array<Order>;
    /**
     * 
     * @type {number}
     * @memberof PageOrder
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PageOrder
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PageOrder
     */
    totalPage?: number;
    /**
     * 
     * @type {number}
     * @memberof PageOrder
     */
    totalRow?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageOrder
     */
    optimizeCountQuery?: boolean;
}

