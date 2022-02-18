/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OzonWmsPlatformAuthorizationMiscInternalWmsAuthorizationPayloadDto {
  permissions?: string[] | null;

  /** @format int64 */
  warehouse_id?: number;
  configurable_warehouses?: number[] | null;

  /** @format int64 */
  user_id?: number;
  aud?: string[] | null;

  /** @format int32 */
  exp?: number | null;
  jti?: string | null;
  iss?: string | null;
}

export interface OzonWmsPlatformHttpAbstractionsErrorDto {
  message?: string | null;
  details?: any;
}

export interface OzonWmsPlatformHttpAbstractionsResult1OzonWmsPlatformAuthorizationMiscInternalWmsAuthorizationPayloadOzonWmsPlatformAuthorizationVersion582980CultureNeutralPublicKeyTokenNullDto {
  data?: OzonWmsPlatformAuthorizationMiscInternalWmsAuthorizationPayloadDto;
  error?: OzonWmsPlatformHttpAbstractionsErrorDto;
}

export interface OzonWmsWebLoginDtoAuthGetUserResponseDto {
  user?: OzonWmsWebLoginDtoAuthUserDto;
}

export interface OzonWmsWebLoginDtoAuthLoginByBarcodeRequestDto {
  barcode?: string | null;
}

export interface OzonWmsWebLoginDtoAuthLoginByBarcodeResponseDto {
  token?: string | null;
}

export interface OzonWmsWebLoginDtoAuthLoginByLdapRequestDto {
  login?: string | null;
  password?: string | null;
}

export interface OzonWmsWebLoginDtoAuthUserDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  login?: string | null;
}

export interface OzonWmsWebLoginDtoAuthV2LoginByBarcodeRequestDto {
  barcode?: string | null;
  host?: string | null;
  terminal_id?: string | null;
}

export interface OzonWmsWebLoginDtoAuthV2LoginByLdapRequestDto {
  login?: string | null;
  password?: string | null;
  host?: string | null;
  terminal_id?: string | null;
}

export interface OzonWmsWebLoginWmsClassesForBackwardCompatibilityErrorDto {
  message?: string | null;
  details?: any;
}

export interface OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthGetUserResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto {
  data?: OzonWmsWebLoginDtoAuthGetUserResponseDto;
  error?: OzonWmsWebLoginWmsClassesForBackwardCompatibilityErrorDto;
}

export interface OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthLoginByBarcodeResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto {
  data?: OzonWmsWebLoginDtoAuthLoginByBarcodeResponseDto;
  error?: OzonWmsWebLoginWmsClassesForBackwardCompatibilityErrorDto;
}

import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient {
  private instance: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.instance = axios;
  }

  private mergeRequestParams(params1: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];

      if (Array.isArray(property)) {
        property.forEach((item) => {
          formData.append(key, item as Blob | string);
        });

        return formData;
      }

      let value: string | Blob | File;
      if (property instanceof Blob || property instanceof File) {
        value = property;
      } else if (typeof property === "object") {
        value = JSON.stringify(property);
      } else {
        value = `${property}`;
      }

      formData.append(key, value as Blob | string);

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    path,
    type,
    query,
    format = "json",
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const requestParams = this.mergeRequestParams(params);

    if (type === ContentType.FormData && body && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: format,
      data: body,
      url: path,
    });
  };
}

/**
 * @title wms-csharp-web-login
 * @version 2022.01.17.255
 * @baseUrl http://wms-csharp-web-login.stg.a.o3.ru:80
 */
export class Api {
  http: HttpClient;
  constructor(private axios: AxiosInstance) {
    this.http = new HttpClient(axios);
  }

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Auth
   * @name AuthLoginByBarcodeCreate
   * @request POST:/v2/auth/login-by-barcode
   */
  authLoginByBarcodeCreate = (data: OzonWmsWebLoginDtoAuthV2LoginByBarcodeRequestDto, params: RequestParams = {}) =>
    this.http.request<
      OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthLoginByBarcodeResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v2/auth/login-by-barcode`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Auth
   * @name AuthLoginByLdapCreate
   * @request POST:/v2/auth/login-by-ldap
   */
  authLoginByLdapCreate = (data: OzonWmsWebLoginDtoAuthV2LoginByLdapRequestDto, params: RequestParams = {}) =>
    this.http.request<
      OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthLoginByBarcodeResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v2/auth/login-by-ldap`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Auth
   * @name AuthLoginByBarcodeCreate2
   * @request POST:/v1/auth/login-by-barcode
   * @originalName authLoginByBarcodeCreate
   * @duplicate
   */
  authLoginByBarcodeCreate2 = (data: OzonWmsWebLoginDtoAuthLoginByBarcodeRequestDto, params: RequestParams = {}) =>
    this.http.request<
      OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthLoginByBarcodeResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v1/auth/login-by-barcode`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Auth
   * @name AuthLoginByLdapCreate2
   * @request POST:/v1/auth/login-by-ldap
   * @originalName authLoginByLdapCreate
   * @duplicate
   */
  authLoginByLdapCreate2 = (data: OzonWmsWebLoginDtoAuthLoginByLdapRequestDto, params: RequestParams = {}) =>
    this.http.request<
      OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthLoginByBarcodeResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v1/auth/login-by-ldap`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Auth
   * @name AuthGetUserCreate
   * @request POST:/v1/auth/get-user
   */
  authGetUserCreate = (params: RequestParams = {}) =>
    this.http.request<
      OzonWmsWebLoginWmsClassesForBackwardCompatibilityResult1OzonWmsWebLoginDtoAuthGetUserResponseOzonWmsWebLoginVersion2022117255CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v1/auth/get-user`,
      method: "POST",
      format: "json",
      ...params,
    });

  /**
   * @description <b>Required authorization</b>
   *
   * @tags Authorization
   * @name AuthorizeClaimsCreate
   * @request POST:/v1/authorize/claims
   */
  authorizeClaimsCreate = (params: RequestParams = {}) =>
    this.http.request<
      OzonWmsPlatformHttpAbstractionsResult1OzonWmsPlatformAuthorizationMiscInternalWmsAuthorizationPayloadOzonWmsPlatformAuthorizationVersion582980CultureNeutralPublicKeyTokenNullDto,
      any
    >({
      path: `/v1/authorize/claims`,
      method: "POST",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Configuration
   * @name ConfigurationList
   * @request GET:/v1/configuration
   */
  configurationList = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/v1/configuration`,
      method: "GET",
      ...params,
    });
}
