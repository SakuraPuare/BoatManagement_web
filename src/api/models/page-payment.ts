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


import { Payment } from './payment';

/**
 * 
 * @export
 * @interface PagePayment
 */
export interface PagePayment {
    /**
     * 
     * @type {Array<Payment>}
     * @memberof PagePayment
     */
    records?: Array<Payment>;
    /**
     * 
     * @type {number}
     * @memberof PagePayment
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PagePayment
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PagePayment
     */
    totalPage?: number;
    /**
     * 
     * @type {number}
     * @memberof PagePayment
     */
    totalRow?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PagePayment
     */
    optimizeCountQuery?: boolean;
}

