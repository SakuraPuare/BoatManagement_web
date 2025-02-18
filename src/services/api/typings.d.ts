declare namespace API {
  type auditAdminUnitParams = {
    id: number;
    types: string;
  };

  type auditAdminUserParams = {
    id: number;
    types: string;
  };

  type AuthRequestDTO = {
    username?: string;
    password?: string;
  };

  type BaseAccountsDTO = {
    username?: string;
    password?: string;
    phone?: string;
    email?: string;
    role?: number;
    isActive?: boolean;
    isBlocked?: boolean;
  };

  type BaseAccountsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    username?: string;
    password?: string;
    phone?: string;
    email?: string;
    role?: number;
    isActive?: boolean;
    isBlocked?: boolean;
  };

  type BaseBoatOrdersDTO = {
    status?: string;
    price?: number;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
    boatId?: number;
  };

  type BaseBoatOrdersVO = {
    orderId?: number;
    userId?: number;
    status?: string;
    price?: number;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    requestId?: number;
    boatId?: number;
  };

  type BaseBoatRequestsDTO = {
    startDockId?: number;
    endDockId?: number;
    startTime?: string;
    endTime?: string;
    type?: string;
    status?: string;
  };

  type BaseBoatRequestsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    orderId?: number;
    startDockId?: number;
    endDockId?: number;
    startTime?: string;
    endTime?: string;
    type?: string;
    status?: string;
  };

  type BaseBoatsDTO = {
    name?: string;
    typeId?: number;
    dockId?: number;
    isEnabled?: boolean;
  };

  type BaseBoatsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    typeId?: number;
    dockId?: number;
    vendorId?: number;
    unitId?: number;
    isEnabled?: boolean;
  };

  type BaseBoatTypesDTO = {
    typeName?: string;
    description?: string;
    length?: number;
    width?: number;
    grossNumber?: number;
    maxLoad?: number;
    maxSpeed?: number;
    maxEndurance?: number;
    price?: number;
    isEnabled?: boolean;
  };

  type BaseBoatTypesVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    typeName?: string;
    description?: string;
    length?: number;
    width?: number;
    grossNumber?: number;
    maxLoad?: number;
    maxSpeed?: number;
    maxEndurance?: number;
    price?: number;
    vendorId?: number;
    unitId?: number;
    isEnabled?: boolean;
  };

  type BaseCertifyVOBaseUnitsVO = {
    certify?: BaseUnitsVO;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type BaseCertifyVOBaseUserCertifyVO = {
    certify?: BaseUserCertifyVO;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type BaseDocksDTO = {
    name?: string;
    longitude?: number;
    latitude?: number;
    address?: string;
    contactPhone?: string;
    isEnabled?: boolean;
  };

  type BaseDocksVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    longitude?: number;
    latitude?: number;
    address?: string;
    contactPhone?: string;
    isEnabled?: boolean;
  };

  type BaseGoodsDTO = {
    name?: string;
    description?: string;
    price?: number;
    unit?: string;
  };

  type BaseGoodsOrdersDTO = {
    status?: string;
    price?: number;
    discount?: number;
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
    orderInfo?: Record<string, any>;
  };

  type BaseGoodsOrdersVO = {
    orderId?: number;
    userId?: number;
    status?: string;
    price?: number;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    merchantId?: number;
    orderInfo?: Record<string, any>;
  };

  type BaseGoodsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    unit?: string;
    stock?: number;
    sales?: number;
    merchantId?: number;
    unitId?: number;
  };

  type BaseMerchantsDTO = {
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseMerchantsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseUnitsDTO = {
    name?: string;
    unitName?: string;
    socialCreditCode?: string;
    legalPerson?: string;
    address?: string;
    contactPhone?: string;
    status?: string;
    adminUserId?: number;
    types?: string;
  };

  type BaseUnitsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    unitName?: string;
    socialCreditCode?: string;
    legalPerson?: string;
    address?: string;
    contactPhone?: string;
    status?: string;
    adminUserId?: number;
    types?: string;
  };

  type BaseUserCertifyDTO = {
    userId?: number;
    realName?: string;
    idCard?: string;
    status?: string;
  };

  type BaseUserCertifyVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    realName?: string;
    idCard?: string;
    status?: string;
  };

  type BaseVendorsDTO = {
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseVendorsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BoatVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    typeId?: number;
    dockId?: number;
    vendorId?: number;
    unitId?: number;
    isEnabled?: boolean;
    typeName?: string;
  };

  type cancelOrder1Params = {
    id: number;
  };

  type cancelOrderParams = {
    id: number;
  };

  type cancelUserBoatRequestParams = {
    id: number;
  };

  type completeOrder1Params = {
    id: number;
  };

  type completeOrderParams = {
    id: number;
  };

  type createUserMerchantGoodsOrderParams = {
    merchantId: number;
  };

  type deleteAdminAccountParams = {
    id: number;
  };

  type deleteAdminBoatParams = {
    id: number;
  };

  type deleteAdminBoatTypeParams = {
    id: number;
  };

  type deleteAdminDocksParams = {
    id: number;
  };

  type deleteAdminMerchantParams = {
    id: number;
  };

  type deleteMerchantsGoodsParams = {
    id: number;
  };

  type deleteUsingDELETEParams = {
    id: number;
  };

  type deleteVendorBoatParams = {
    id: number;
  };

  type deleteVendorBoatTypeParams = {
    id: number;
  };

  type getAdminBoatPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminBoatParams = {
    id: number;
  };

  type getAdminBoatTypePageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminBoatTypeParams = {
    id: number;
  };

  type getAdminDocksPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminDocksParams = {
    id: number;
  };

  type getAdminMerchantPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminMerchantParams = {
    id: number;
  };

  type getAdminUnitPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminUnitParams = {
    id: number;
  };

  type getAdminUserCertifyPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminUserCertifyParams = {
    id: number;
  };

  type getAdminUserPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getAdminUserParams = {
    id: number;
  };

  type getAdminVendorPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getGoodsParams = {
    id: number;
  };

  type getMerchantGoodsPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getMerchantOrdersPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getParams = {
    id: number;
  };

  type getUserBoatRequestsPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getUserDockPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getUserMerchantGoodsListParams = {
    merchantId: number;
  };

  type getUserMerchantGoodsPageParams = {
    merchantId: number;
    pageNum?: number;
    pageSize?: number;
  };

  type getUserMerchantPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getUserMerchantParams = {
    id: number;
  };

  type getUserParams = {
    id: number;
  };

  type getVendorBoatRequestsPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getVendorBoatsPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getVendorBoatTypeParams = {
    id: number;
  };

  type getVendorBoatTypesPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getVendorDockPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getVendorDockParams = {
    id: number;
  };

  type getVendorOrdersPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type handleOrderParams = {
    requestId: number;
  };

  type joinUnitParams = {
    types: string;
    unitId: number;
  };

  type leaveUnitParams = {
    types: string;
  };

  type NameRequestDTO = {
    username?: string;
  };

  type PageBaseAccountsVO = {
    records?: BaseAccountsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseBoatOrdersVO = {
    records?: BaseBoatOrdersVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseBoatRequestsVO = {
    records?: BaseBoatRequestsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseBoatsVO = {
    records?: BaseBoatsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseBoatTypesVO = {
    records?: BaseBoatTypesVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseDocksVO = {
    records?: BaseDocksVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseGoodsOrdersVO = {
    records?: BaseGoodsOrdersVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseGoodsVO = {
    records?: BaseGoodsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseMerchantsVO = {
    records?: BaseMerchantsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseUnitsVO = {
    records?: BaseUnitsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseUserCertifyVO = {
    records?: BaseUserCertifyVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseVendorsVO = {
    records?: BaseVendorsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBoatVO = {
    records?: BoatVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type ResponseBaseAccountsVO = {
    code?: number;
    message?: string;
    data?: BaseAccountsVO;
    time?: number;
  };

  type ResponseBaseBoatsVO = {
    code?: number;
    message?: string;
    data?: BaseBoatsVO;
    time?: number;
  };

  type ResponseBaseBoatTypesVO = {
    code?: number;
    message?: string;
    data?: BaseBoatTypesVO;
    time?: number;
  };

  type ResponseBaseCertifyVOBaseUnitsVO = {
    code?: number;
    message?: string;
    data?: BaseCertifyVOBaseUnitsVO;
    time?: number;
  };

  type ResponseBaseCertifyVOBaseUserCertifyVO = {
    code?: number;
    message?: string;
    data?: BaseCertifyVOBaseUserCertifyVO;
    time?: number;
  };

  type ResponseBaseDocksVO = {
    code?: number;
    message?: string;
    data?: BaseDocksVO;
    time?: number;
  };

  type ResponseBaseGoodsVO = {
    code?: number;
    message?: string;
    data?: BaseGoodsVO;
    time?: number;
  };

  type ResponseBaseMerchantsVO = {
    code?: number;
    message?: string;
    data?: BaseMerchantsVO;
    time?: number;
  };

  type ResponseBaseUnitsVO = {
    code?: number;
    message?: string;
    data?: BaseUnitsVO;
    time?: number;
  };

  type ResponseBaseUserCertifyVO = {
    code?: number;
    message?: string;
    data?: BaseUserCertifyVO;
    time?: number;
  };

  type ResponseBaseVendorsVO = {
    code?: number;
    message?: string;
    data?: BaseVendorsVO;
    time?: number;
  };

  type ResponseBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
    time?: number;
  };

  type ResponseListBaseAccountsVO = {
    code?: number;
    message?: string;
    data?: BaseAccountsVO[];
    time?: number;
  };

  type ResponseListBaseBoatOrdersVO = {
    code?: number;
    message?: string;
    data?: BaseBoatOrdersVO[];
    time?: number;
  };

  type ResponseListBaseBoatRequestsVO = {
    code?: number;
    message?: string;
    data?: BaseBoatRequestsVO[];
    time?: number;
  };

  type ResponseListBaseBoatsVO = {
    code?: number;
    message?: string;
    data?: BaseBoatsVO[];
    time?: number;
  };

  type ResponseListBaseBoatTypesVO = {
    code?: number;
    message?: string;
    data?: BaseBoatTypesVO[];
    time?: number;
  };

  type ResponseListBaseDocksVO = {
    code?: number;
    message?: string;
    data?: BaseDocksVO[];
    time?: number;
  };

  type ResponseListBaseGoodsOrdersVO = {
    code?: number;
    message?: string;
    data?: BaseGoodsOrdersVO[];
    time?: number;
  };

  type ResponseListBaseGoodsVO = {
    code?: number;
    message?: string;
    data?: BaseGoodsVO[];
    time?: number;
  };

  type ResponseListBaseMerchantsVO = {
    code?: number;
    message?: string;
    data?: BaseMerchantsVO[];
    time?: number;
  };

  type ResponseListBaseUnitsVO = {
    code?: number;
    message?: string;
    data?: BaseUnitsVO[];
    time?: number;
  };

  type ResponseListBaseUserCertifyVO = {
    code?: number;
    message?: string;
    data?: BaseUserCertifyVO[];
    time?: number;
  };

  type ResponseListBaseVendorsVO = {
    code?: number;
    message?: string;
    data?: BaseVendorsVO[];
    time?: number;
  };

  type ResponseListBoatVO = {
    code?: number;
    message?: string;
    data?: BoatVO[];
    time?: number;
  };

  type ResponsePageBaseAccountsVO = {
    code?: number;
    message?: string;
    data?: PageBaseAccountsVO;
    time?: number;
  };

  type ResponsePageBaseBoatOrdersVO = {
    code?: number;
    message?: string;
    data?: PageBaseBoatOrdersVO;
    time?: number;
  };

  type ResponsePageBaseBoatRequestsVO = {
    code?: number;
    message?: string;
    data?: PageBaseBoatRequestsVO;
    time?: number;
  };

  type ResponsePageBaseBoatsVO = {
    code?: number;
    message?: string;
    data?: PageBaseBoatsVO;
    time?: number;
  };

  type ResponsePageBaseBoatTypesVO = {
    code?: number;
    message?: string;
    data?: PageBaseBoatTypesVO;
    time?: number;
  };

  type ResponsePageBaseDocksVO = {
    code?: number;
    message?: string;
    data?: PageBaseDocksVO;
    time?: number;
  };

  type ResponsePageBaseGoodsOrdersVO = {
    code?: number;
    message?: string;
    data?: PageBaseGoodsOrdersVO;
    time?: number;
  };

  type ResponsePageBaseGoodsVO = {
    code?: number;
    message?: string;
    data?: PageBaseGoodsVO;
    time?: number;
  };

  type ResponsePageBaseMerchantsVO = {
    code?: number;
    message?: string;
    data?: PageBaseMerchantsVO;
    time?: number;
  };

  type ResponsePageBaseUnitsVO = {
    code?: number;
    message?: string;
    data?: PageBaseUnitsVO;
    time?: number;
  };

  type ResponsePageBaseUserCertifyVO = {
    code?: number;
    message?: string;
    data?: PageBaseUserCertifyVO;
    time?: number;
  };

  type ResponsePageBaseVendorsVO = {
    code?: number;
    message?: string;
    data?: PageBaseVendorsVO;
    time?: number;
  };

  type ResponsePageBoatVO = {
    code?: number;
    message?: string;
    data?: PageBoatVO;
    time?: number;
  };

  type ResponseString = {
    code?: number;
    message?: string;
    data?: string;
    time?: number;
  };

  type ResponseTokenVO = {
    code?: number;
    message?: string;
    data?: TokenVO;
    time?: number;
  };

  type ResponseUserInfoVO = {
    code?: number;
    message?: string;
    data?: UserInfoVO;
    time?: number;
  };

  type TokenVO = {
    token?: string;
  };

  type transferUnitParams = {
    types: string;
    userId: number;
  };

  type UnitCertifyRequestDTO = {
    unitName?: string;
    socialCreditCode?: string;
    legalPerson?: string;
    address?: string;
    contactPhone?: string;
  };

  type updateAdminAccountParams = {
    id: number;
  };

  type updateAdminBoatParams = {
    id: number;
  };

  type updateAdminBoatTypeParams = {
    id: number;
  };

  type updateAdminDocksParams = {
    id: number;
  };

  type updateAdminMerchantParams = {
    id: number;
  };

  type updateMerchantsGoodsParams = {
    id: number;
  };

  type updateParams = {
    id: number;
  };

  type updateUserBoatRequestParams = {
    id: number;
  };

  type updateVendorBoatParams = {
    id: number;
  };

  type updateVendorBoatTypeParams = {
    id: number;
  };

  type UserCertifyRequestDTO = {
    realName?: string;
    idCard?: string;
  };

  type UserInfoVO = {
    id?: number;
    username?: string;
  };

  type WxLoginDTO = {
    code?: string;
    userInfo?: WxUserInfo;
  };

  type WxUserInfo = {
    nickName?: string;
    avatarUrl?: string;
    gender?: number;
  };
}
export type {
  API
};