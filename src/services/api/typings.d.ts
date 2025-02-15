declare namespace API {
  type auditParams = {
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
  };

  type BaseAccountsVO = {
    id?: number;
    username?: string;
    password?: string;
    phone?: string;
    email?: string;
    role?: number;
    isActive?: boolean;
    isBlocked?: boolean;
  };

  type BaseBoatsDTO = {
    name?: string;
    typeId?: number;
    boatTypeId?: number;
    dockId?: number;
  };

  type BaseBoatsVO = {
    id?: number;
    name?: string;
    typeId?: number;
    boatTypeId?: number;
    dockId?: number;
    vendorId?: number;
    unitId?: number;
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
  };

  type BaseBoatTypesVO = {
    id?: number;
    typeName?: string;
    description?: string;
    length?: number;
    width?: number;
    grossNumber?: number;
    maxLoad?: number;
    maxSpeed?: number;
    maxEndurance?: number;
    createdVendorId?: number;
    createdUnitId?: number;
  };

  type BaseDocksDTO = {
    name?: string;
    location?: string[];
    address?: string;
    contactPhone?: string;
  };

  type BaseDocksVO = {
    id?: number;
    name?: string;
    location?: string[];
    address?: string;
    contactPhone?: string;
  };

  type BaseGoodsDTO = {
    name?: string;
    description?: string;
    price?: number;
  };

  type BaseGoodsVO = {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    sales?: number;
    createdMerchantId?: number;
    createdUnitId?: number;
  };

  type BaseMerchantsDTO = {
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseMerchantsVO = {
    id?: number;
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseUnitsVO = {
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

  type BaseVendorsDTO = {
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type BaseVendorsVO = {
    id?: number;
    userId?: number;
    unitId?: number;
    status?: string;
  };

  type CertifyQueryDTO = {
    status?: string;
    type?: string;
  };

  type delete1Params = {
    id: number;
  };

  type delete2Params = {
    id: number;
  };

  type delete3Params = {
    id: number;
  };

  type delete4Params = {
    id: number;
  };

  type deleteDocksParams = {
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

  type get1Params = {
    id: number;
  };

  type get2Params = {
    id: number;
  };

  type get3Params = {
    id: number;
  };

  type get4Params = {
    id: number;
  };

  type getDocksByIdParams = {
    id: number;
  };

  type getDocksPageParams = {
    pageNum: number;
    pageSize: number;
    queryDTO: BaseDocksDTO;
  };

  type getDocksParams = {
    queryDTO: BaseDocksDTO;
  };

  type getGoodsByIdParams = {
    id: number;
  };

  type getGoodsPageParams = {
    pageNum: number;
    pageSize: number;
    queryDTO: BaseGoodsDTO;
  };

  type getGoodsParams = {
    queryDTO: BaseGoodsDTO;
  };

  type getParams = {
    id: number;
  };

  type getUserParams = {
    id: number;
  };

  type getVendorBoatsPageParams = {
    pageNum: number;
    pageSize: number;
    queryDTO: BaseBoatsDTO;
  };

  type getVendorBoatsParams = {
    queryDTO: BaseBoatsDTO;
  };

  type getVendorBoatTypesPageParams = {
    pageNum: number;
    pageSize: number;
    queryDTO: BaseBoatTypesDTO;
  };

  type getVendorBoatTypesParams = {
    queryDTO: BaseBoatTypesDTO;
  };

  type joinUnitParams = {
    types: string;
    unitId: number;
  };

  type leaveUnitParams = {
    types: string;
  };

  type list1Params = {
    queryDTO: BaseAccountsDTO;
  };

  type list2Params = {
    queryDTO: BaseMerchantsDTO;
  };

  type list3Params = {
    queryDTO: BaseBoatsDTO;
  };

  type list4Params = {
    queryDTO: BaseBoatTypesDTO;
  };

  type list5Params = {
    queryDTO: CertifyQueryDTO;
  };

  type listPage1Params = {
    page?: number;
    size?: number;
    queryDTO: BaseAccountsDTO;
  };

  type listPage2Params = {
    page?: number;
    size?: number;
    queryDTO: BaseMerchantsDTO;
  };

  type listPage3Params = {
    page?: number;
    size?: number;
    queryDTO: BaseBoatsDTO;
  };

  type listPage4Params = {
    page?: number;
    size?: number;
    queryDTO: BaseBoatTypesDTO;
  };

  type listPage5Params = {
    pageNum?: number;
    pageSize?: number;
    queryDTO: CertifyQueryDTO;
  };

  type listPageParams = {
    page?: number;
    size?: number;
    queryDTO: BaseVendorsDTO;
  };

  type listParams = {
    queryDTO: BaseVendorsDTO;
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

  type ResponseUnitCertifyVO = {
    code?: number;
    message?: string;
    data?: UnitCertifyVO;
    time?: number;
  };

  type ResponseUserCertifyVO = {
    code?: number;
    message?: string;
    data?: UserCertifyVO;
    time?: number;
  };

  type ResponseUserInfoVO = {
    code?: number;
    message?: string;
    data?: UserInfoVO;
    time?: number;
  };

  type ResponseUserPersonalInfoVO = {
    code?: number;
    message?: string;
    data?: UserPersonalInfoVO;
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

  type UnitCertifyVO = {
    certify?: BaseUnitsVO;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type update1Params = {
    id: number;
  };

  type update2Params = {
    id: number;
  };

  type update3Params = {
    id: number;
  };

  type update4Params = {
    id: number;
  };

  type updateDocksParams = {
    id: number;
  };

  type updateMerchantsGoodsParams = {
    id: number;
  };

  type updateParams = {
    id: number;
  };

  type updateVendorBoatParams = {
    id: number;
  };

  type updateVendorBoatTypeParams = {
    id: number;
  };

  type UserCertify = {
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    userId?: number;
    realName?: string;
    idCard?: string;
    status?: string;
  };

  type UserCertifyRequestDTO = {
    realName?: string;
    idCard?: string;
  };

  type UserCertifyVO = {
    certify?: UserCertify;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type UserInfoVO = {
    userId?: number;
    username?: string;
  };

  type UserPersonalInfoVO = {
    userId?: number;
    username?: string;
    email?: string;
    phone?: string;
    role?: number;
    isActive?: boolean;
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
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
export default API;
