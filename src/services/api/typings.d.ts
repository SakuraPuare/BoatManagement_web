declare namespace API {
  type adminDeleteBoatParams = {
    id: number;
  };

  type adminDeleteUserParams = {
    id: number;
  };

  type adminGetBoatByIdsParams = {
    ids: string;
  };

  type adminGetBoatListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatParams = {
    id: number;
  };

  type adminGetUserByIdsParams = {
    ids: string;
  };

  type adminGetUserCertifyByIdsParams = {
    ids: string;
  };

  type adminGetUserCertifyListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUserCertifyPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUserCertifyParams = {
    id: number;
  };

  type adminGetUserListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUserPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUserParams = {
    id: number;
  };

  type adminUpdateBoatParams = {
    id: number;
  };

  type adminUpdateUserParams = {
    id: number;
  };

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
    stock?: number;
  };

  type BaseGoodsOrdersDTO = {
    status?: string;
    price?: number;
    discount?: number;
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

  type cancelOrder1Params = {
    id: number;
  };

  type cancelOrderParams = {
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

  type deleteBoatType1Params = {
    id: number;
  };

  type deleteBoatTypeParams = {
    id: number;
  };

  type deleteDockParams = {
    id: number;
  };

  type deleteGoodsParams = {
    id: number;
  };

  type deleteMerchantParams = {
    id: number;
  };

  type deleteUnitParams = {
    id: number;
  };

  type deleteVendorParams = {
    id: number;
  };

  type getBoatOrdersByIdsParams = {
    ids: string;
  };

  type getBoatOrdersListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatType1Params = {
    id: number;
  };

  type getBoatTypeByIds1Params = {
    ids: string;
  };

  type getBoatTypeByIdsParams = {
    ids: string;
  };

  type getBoatTypeList1Params = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatTypeListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatTypePage1Params = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatTypePageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getBoatTypeParams = {
    id: number;
  };

  type getDock1Params = {
    id: number;
  };

  type getDockByIds1Params = {
    ids: string;
  };

  type getDockByIdsParams = {
    ids: string;
  };

  type getDockList1Params = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getDockListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getDockPage1Params = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getDockPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getDockParams = {
    id: number;
  };

  type getGoodsByIdsParams = {
    ids: string;
  };

  type getGoodsListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getGoodsOrdersByIds1Params = {
    ids: string;
  };

  type getGoodsOrdersByIdsParams = {
    ids: string;
  };

  type getGoodsOrdersList1Params = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getGoodsOrdersListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getGoodsOrdersPage1Params = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getGoodsOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getGoodsPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getMerchantByIdParams = {
    id: number;
  };

  type getMerchantByIdsParams = {
    ids: string;
  };

  type getMerchantListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getMerchantPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getUnitByIdsParams = {
    ids: string;
  };

  type getUnitListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getUnitPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getUnitParams = {
    id: number;
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

  type getVendorBoatRequestsListQueryParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getVendorBoatRequestsPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getVendorByIdParams = {
    id: number;
  };

  type getVendorByIdsParams = {
    ids: string;
  };

  type getVendorListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getVendorOrdersPageQueryParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type getVendorPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
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

  type merchantCancelOrderParams = {
    id: number;
  };

  type merchantCompleteOrderParams = {
    id: number;
  };

  type merchantDeleteGoodsParams = {
    id: number;
  };

  type merchantGetGoodsPageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type merchantGetGoodsParams = {
    id: number;
  };

  type merchantGetOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type merchantUpdateGoodsParams = {
    id: number;
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

  type ResponseBaseAccountsVO = {
    code?: number;
    message?: string;
    data?: BaseAccountsVO;
    time?: number;
  };

  type ResponseBaseBoatRequestsVO = {
    code?: number;
    message?: string;
    data?: BaseBoatRequestsVO;
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

  type ResponseVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
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

  type updateBoatType1Params = {
    id: number;
  };

  type updateBoatTypeParams = {
    id: number;
  };

  type updateDockParams = {
    id: number;
  };

  type updateGoodsParams = {
    id: number;
  };

  type updateMerchantParams = {
    id: number;
  };

  type updateUnitParams = {
    id: number;
  };

  type updateVendorParams = {
    id: number;
  };

  type userCancelBoatOrderParams = {
    id: number;
  };

  type userCancelBoatRequestParams = {
    id: number;
  };

  type userCancelGoodsOrderParams = {
    id: number;
  };

  type UserCertifyRequestDTO = {
    realName?: string;
    idCard?: string;
  };

  type userGetBoatOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type userGetBoatRequestByIdsParams = {
    ids: string;
  };

  type userGetBoatRequestListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type userGetBoatRequestPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type userGetBoatRequestParams = {
    id: number;
  };

  type userGetDockByIdsParams = {
    ids: string;
  };

  type userGetDockListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type userGetDockPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type userGetDockParams = {
    id: number;
  };

  type userGetGoodsOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type userGetUserParams = {
    id: number;
  };

  type UserInfoVO = {
    id?: number;
    username?: string;
  };

  type userPayBoatOrderParams = {
    id: number;
  };

  type userPayGoodsOrderParams = {
    id: number;
  };

  type userUpdateBoatRequestParams = {
    id: number;
  };

  type vendorDeleteBoatParams = {
    id: number;
  };

  type vendorGetBoatByIdsParams = {
    ids: string;
  };

  type vendorGetBoatListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type vendorGetBoatPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type vendorGetBoatParams = {
    id: number;
  };

  type vendorGetBoatRequestByIdsParams = {
    ids: string;
  };

  type vendorUpdateBoatParams = {
    id: number;
  };

  type vendorUpdateBoatRequestStatusParams = {
    id: number;
    status: string;
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
