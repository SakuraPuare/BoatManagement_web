declare namespace API {
  type adminAssignRoleParams = {
    userId: number;
    roleId: number;
    unitId?: number;
  };

  type adminDeleteBoatParams = {
    id: number;
  };

  type adminDeleteBoatRequestParams = {
    id: number;
  };

  type adminDeleteBoatTypeParams = {
    id: number;
  };

  type adminDeleteDockParams = {
    id: number;
  };

  type adminDeleteGoodsParams = {
    id: number;
  };

  type adminDeleteMerchantParams = {
    id: number;
  };

  type adminDeletePermissionParams = {
    id: number;
  };

  type adminDeleteRoleParams = {
    id: number;
  };

  type adminDeleteUnitParams = {
    id: number;
  };

  type adminDeleteUserParams = {
    id: number;
  };

  type adminDeleteVendorParams = {
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

  type adminGetBoatOrdersByIdsParams = {
    ids: string;
  };

  type adminGetBoatOrdersListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
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

  type adminGetBoatRequestByIdsParams = {
    ids: string;
  };

  type adminGetBoatRequestListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatRequestPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatRequestParams = {
    id: number;
  };

  type adminGetBoatTypeByIdsParams = {
    ids: string;
  };

  type adminGetBoatTypeListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatTypePageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetBoatTypeParams = {
    id: number;
  };

  type adminGetDockByIdsParams = {
    ids: string;
  };

  type adminGetDockListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetDockPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetDockParams = {
    id: number;
  };

  type adminGetGoodsByIdsParams = {
    ids: string;
  };

  type adminGetGoodsListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsOrdersByIds1Params = {
    ids: string;
  };

  type adminGetGoodsOrdersByIdsParams = {
    ids: string;
  };

  type adminGetGoodsOrdersList1Params = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsOrdersListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsOrdersPage1Params = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsOrdersPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetGoodsParams = {
    id: number;
  };

  type adminGetMerchantByIdsParams = {
    ids: string;
  };

  type adminGetMerchantListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetMerchantPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetMerchantParams = {
    id: number;
  };

  type adminGetPermissionByIdsParams = {
    ids: string;
  };

  type adminGetPermissionListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetPermissionPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetPermissionParams = {
    id: number;
  };

  type adminGetRoleByIdsParams = {
    ids: string;
  };

  type adminGetRoleListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetRolePageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetRoleParams = {
    id: number;
  };

  type adminGetUnitByIdsParams = {
    ids: string;
  };

  type adminGetUnitListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUnitPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetUnitParams = {
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

  type adminGetVendorByIdsParams = {
    ids: string;
  };

  type adminGetVendorListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetVendorPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type adminGetVendorParams = {
    id: number;
  };

  type adminRevokeRoleParams = {
    userId: number;
    roleId: number;
    unitId?: number;
  };

  type adminUpdateBoatParams = {
    id: number;
  };

  type adminUpdateBoatRequestParams = {
    id: number;
  };

  type adminUpdateBoatTypeParams = {
    id: number;
  };

  type adminUpdateDockParams = {
    id: number;
  };

  type adminUpdateGoodsParams = {
    id: number;
  };

  type adminUpdateMerchantParams = {
    id: number;
  };

  type adminUpdatePermissionParams = {
    id: number;
  };

  type adminUpdateRoleParams = {
    id: number;
  };

  type adminUpdateUnitParams = {
    id: number;
  };

  type adminUpdateUserParams = {
    id: number;
  };

  type adminUpdateVendorParams = {
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

  type BaseFileUploadsDTO = {
    originalName?: string;
    storedName?: string;
    filePath?: string;
    fileSize?: number;
    fileType?: string;
    mimeType?: string;
    uploaderId?: number;
    businessType?: string;
    businessId?: number;
  };

  type BaseFileUploadsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    originalName?: string;
    storedName?: string;
    filePath?: string;
    fileSize?: number;
    fileType?: string;
    mimeType?: string;
    uploaderId?: number;
    businessType?: string;
    businessId?: number;
  };

  type BaseGoodsDTO = {
    name?: string;
    description?: string;
    price?: number;
    unit?: string;
    stock?: number;
    isEnabled?: boolean;
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
    isEnabled?: boolean;
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

  type BaseNotificationsDTO = {
    userId?: number;
    title?: string;
    content?: string;
    type?: string;
    businessType?: string;
    businessId?: number;
    isRead?: boolean;
  };

  type BaseNotificationsVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    title?: string;
    content?: string;
    type?: string;
    businessType?: string;
    businessId?: number;
    isRead?: boolean;
  };

  type BasePermissionDTO = {
    name?: string;
    code?: string;
    description?: string;
  };

  type BasePermissionVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    code?: string;
    description?: string;
  };

  type BaseRoleDTO = {
    name?: string;
    description?: string;
  };

  type BaseRoleVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    name?: string;
    description?: string;
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

  type deleteBoatTypeParams = {
    id: number;
  };

  type deleteFileParams = {
    fileId: number;
  };

  type deleteFileUploadParams = {
    id: number;
  };

  type deleteNotificationParams = {
    id: number;
  };

  type downloadFileParams = {
    fileId: number;
  };

  type getBoatTypeByIdsParams = {
    ids: string;
  };

  type getBoatTypeListParams = {
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

  type getDockByIdsParams = {
    ids: string;
  };

  type getDockListParams = {
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

  type getFilesByBusinessParams = {
    businessType: string;
    businessId: number;
  };

  type getFileUploadsByIdsParams = {
    ids: string;
  };

  type getFileUploadsListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getFileUploadsPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getNotificationsByIdsParams = {
    ids: string;
  };

  type getNotificationsList1Params = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getNotificationsListParams = {
    userId: number;
    isRead?: boolean;
    type?: string;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getNotificationsPage1Params = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getNotificationsPageParams = {
    userId: number;
    pageNum?: number;
    pageSize?: number;
    isRead?: boolean;
    type?: string;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicBoatTypeByIdsParams = {
    ids: string;
  };

  type getPublicBoatTypeListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicBoatTypePageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicBoatTypeParams = {
    id: number;
  };

  type getPublicDockByIdsParams = {
    ids: string;
  };

  type getPublicDockListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicDockPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicDockParams = {
    id: number;
  };

  type getPublicGoodsByIdsParams = {
    ids: string;
  };

  type getPublicGoodsListParams = {
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicGoodsPageParams = {
    pageNum?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  type getPublicGoodsParams = {
    id: number;
  };

  type getUnreadCountParams = {
    userId: number;
  };

  type getUserFilesListParams = {
    userId: number;
    businessType?: string;
    search?: string;
    sort?: string;
    startDateTime?: string;
    endDateTime?: string;
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

  type markAsReadParams = {
    userId: number;
    notificationId: number;
  };

  type markMultipleAsReadParams = {
    userId: number;
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

  type PageBaseFileUploadsVO = {
    records?: BaseFileUploadsVO[];
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

  type PageBaseNotificationsVO = {
    records?: BaseNotificationsVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBasePermissionVO = {
    records?: BasePermissionVO[];
    pageNumber?: number;
    pageSize?: number;
    totalPage?: number;
    totalRow?: number;
    optimizeCountQuery?: boolean;
  };

  type PageBaseRoleVO = {
    records?: BaseRoleVO[];
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

  type previewFileParams = {
    fileId: number;
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

  type ResponseBaseFileUploadsVO = {
    code?: number;
    message?: string;
    data?: BaseFileUploadsVO;
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

  type ResponseBaseNotificationsVO = {
    code?: number;
    message?: string;
    data?: BaseNotificationsVO;
    time?: number;
  };

  type ResponseBasePermissionVO = {
    code?: number;
    message?: string;
    data?: BasePermissionVO;
    time?: number;
  };

  type ResponseBaseRoleVO = {
    code?: number;
    message?: string;
    data?: BaseRoleVO;
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

  type ResponseListBaseFileUploadsVO = {
    code?: number;
    message?: string;
    data?: BaseFileUploadsVO[];
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

  type ResponseListBaseNotificationsVO = {
    code?: number;
    message?: string;
    data?: BaseNotificationsVO[];
    time?: number;
  };

  type ResponseListBasePermissionVO = {
    code?: number;
    message?: string;
    data?: BasePermissionVO[];
    time?: number;
  };

  type ResponseListBaseRoleVO = {
    code?: number;
    message?: string;
    data?: BaseRoleVO[];
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

  type ResponseLong = {
    code?: number;
    message?: string;
    data?: number;
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

  type ResponsePageBaseFileUploadsVO = {
    code?: number;
    message?: string;
    data?: PageBaseFileUploadsVO;
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

  type ResponsePageBaseNotificationsVO = {
    code?: number;
    message?: string;
    data?: PageBaseNotificationsVO;
    time?: number;
  };

  type ResponsePageBasePermissionVO = {
    code?: number;
    message?: string;
    data?: PageBasePermissionVO;
    time?: number;
  };

  type ResponsePageBaseRoleVO = {
    code?: number;
    message?: string;
    data?: PageBaseRoleVO;
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

  type ResponseUserWithRoleVO = {
    code?: number;
    message?: string;
    data?: UserWithRoleVO;
    time?: number;
  };

  type ResponseVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    time?: number;
  };

  type sendNotificationParams = {
    userId: number;
    title: string;
    content: string;
    type: string;
    businessType?: string;
    businessId?: number;
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

  type updateBoatTypeParams = {
    id: number;
  };

  type updateFileUploadParams = {
    id: number;
  };

  type updateNotificationParams = {
    id: number;
  };

  type uploadFileParams = {
    uploaderId: number;
    businessType: string;
    businessId?: number;
  };

  type uploadFilesParams = {
    files: string[];
    uploaderId: number;
    businessType: string;
    businessId?: number;
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

  type UserWithRoleVO = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    username?: string;
    password?: string;
    phone?: string;
    email?: string;
    isActive?: boolean;
    isBlocked?: boolean;
    role?: number;
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
