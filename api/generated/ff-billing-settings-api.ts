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

export interface ContractorDto {
  /**
   * Идентификатор контрагента (Metazon ID)
   * @format int64
   */
  metazon_id?: number;

  /** Наименование контрагента. */
  name?: string | null;
  currency?: CurrencyDto;
  country?: CountryDto;
}

export interface CountryDto {
  /**
   * Идентификатор страны
   * @format int32
   */
  id?: number;

  /** Наименование страны */
  name?: string | null;
}

export interface CreateContractorRequestDto {
  /**
   * Идентификатор контрагента (Metazon ID)
   * @format int64
   * @min 1
   */
  metazon_id: number;

  /** Наименование контрагента. */
  name: string;

  /**
   * Идентификатор страны.
   * @format int32
   * @min 1
   */
  country_id: number;

  /**
   * Номер валюты.
   * @format int32
   * @min 1
   */
  currency_num: number;
}

export interface CreateContractorResponseDto {
  /**
   * Идентификатор контрагента (Metazon ID)
   * @format int64
   */
  metazon_id?: number;
}

export interface CreateLegalEntityRequestDto {
  /**
   * Идентификатор юрлица (Metazon ID)
   * @format int64
   * @min 1
   */
  legal_entity_metazon_id?: number;

  /** Наименование юрлица */
  legal_entity_name: string;

  /** ID связанных складов */
  legal_entity_ids?: number[] | null;
}

export type CreateLegalEntityResponseDto = object;

export interface CreateRegionRequestDto {
  /** Наименование региона */
  region_name: string;

  /**
   * Числовой номер валюты региона
   * @format int32
   * @min 1
   * @max 999
   */
  region_currency_num: number;

  /** ID связанных складов */
  region_warehouse_ids?: number[] | null;
}

export interface CreateRegionResponseDto {
  /**
   * ID созданного региона
   * @format int32
   */
  region_id?: number;
}

export interface CurrencyDto {
  /** Буквенный код валюты */
  code?: string | null;

  /**
   * Числовой номер валюты
   * @format int32
   */
  num?: number;

  /** Описание валюты на английском языке */
  eng_desc?: string | null;

  /** Описание валюты на русском языке */
  ru_desc?: string | null;
}

export interface DeleteContractorRequestDto {
  /**
   * Идентификатор контрагента (Metazon ID)
   * @format int64
   * @min 1
   */
  metazon_id: number;
}

export type DeleteContractorResponseDto = object;

export interface DeleteLegalEntityRequestDto {
  /**
   * Идентификатор юрлица (Metazon ID)
   * @format int64
   * @min 1
   */
  legal_entity_metazon_id?: number;
}

export type DeleteLegalEntityResponseDto = object;

export interface DeleteRegionRequestDto {
  /**
   * Идентификатор региона
   * @format int32
   * @min 1
   * @max 2147483647
   */
  region_id: number;
}

export type DeleteRegionResponseDto = object;

export enum DirectoryEntityDto {
  Undefined = "Undefined",
  Region = "Region",
  Contractor = "Contractor",
  LegalEntity = "LegalEntity",
  Operation = "Operation",
}

export interface EntityChangeLogDto {
  /**
   * Идентификатор записи об изменении
   * @format int64
   */
  id?: number;

  /**
   * Идентификатор пользователя, внесшего изменения
   * @format int64
   */
  userId?: number;

  /** ФИО пользователя, внесшего изменения */
  userName: string | null;

  /** Предыдущее состояние */
  oldValue: string | null;

  /** Обновленное состояние */
  newValue: string | null;

  /**
   * Дата внесения изменения
   * @format date-time
   */
  createdAt: string;

  /** Тип изменения (создание, редактирование, удаление) */
  actionType: string;
}

export interface ErrorModelDto {
  errorMessage?: string | null;
}

export interface GetContractorsResponseDto {
  /** Информация о контрагентах */
  contractors?: ContractorDto[] | null;
}

export interface GetEntityChangesResponseDto {
  /** Список изменений сущности */
  entity_change_logs?: EntityChangeLogDto[] | null;
}

export interface GetLegalEntitiesResponseDto {
  /** Информация о юрлицах */
  legal_entities?: LegalEntityDto[] | null;
}

export interface GetRegionsResponseDto {
  /** Информация о регионах */
  regions?: RegionDto[] | null;
}

export interface LegalEntityDto {
  /**
   * ID юрлица
   * @format int64
   */
  legal_entity_metazon_id?: number;

  /** Наименование юрлица */
  legal_entity_name?: string | null;

  /** Список складов, относящихся к юрлицу */
  legal_entity_warehouses?: WarehouseDto[] | null;
}

export interface RegionDto {
  /**
   * ID региона
   * @format int32
   */
  region_id: number;
  region_currency: RegionCurrencyDto;

  /** Наименование региона */
  region_name: string;

  /** Список складов, относящихся к региону */
  region_warehouses: WarehouseDto[];
}

export interface RegionCurrencyDto {
  /** Буквенный код валюты */
  currency_code: string;

  /**
   * Числовой номер валюты
   * @format int32
   */
  currency_num: number;

  /** Описание валюты на английском языке */
  currency_eng_desc: string;

  /** Описание валюты на русском языке */
  currency_ru_desc: string;
}

export interface UpdateContractorRequestDto {
  /**
   * Идентификатор контрагента (Metazon ID)
   * @format int64
   * @min 1
   */
  metazon_id: number;

  /** Наименование контрагента. */
  name: string;

  /**
   * Идентификатор страны.
   * @format int32
   * @min 1
   */
  country_id: number;

  /**
   * Числовой номер валюты региона
   * @format int32
   * @min 1
   * @max 999
   */
  currency_num: number;
}

export type UpdateContractorResponseDto = object;

export interface UpdateLegalEntityRequestDto {
  /**
   * Идентификатор юрлица (Metazon ID)
   * @format int64
   * @min 1
   */
  legal_entity_metazon_id?: number;

  /** Наименование юрлица */
  legal_entity_name?: string | null;

  /** ID связанных складов */
  legal_entity_ids?: number[] | null;
}

export interface UpdateLegalEntityResponseDto {
  /**
   * Идентификатор юрлица (Metazon ID)
   * @format int64
   */
  legal_entity_metazon_id?: number;

  /** Наименование юрлица */
  legal_entity_name?: string | null;

  /** Список складов, относящихся к юрлицу */
  legal_entity_warehouses?: WarehouseDto[] | null;
}

export interface WarehouseDto {
  /**
   * ID склада
   * @format int64
   */
  warehouse_id: number;

  /** Тип склада */
  warehouse_type: string;

  /** Наименовние склада */
  warehouse_name: string;
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
 * @title ff-billing-settings-api
 * @version 2022.01.25.76
 * @baseUrl http://ff-billing-settings-api.stg.a.o3.ru:80
 */
export class Api {
  http: HttpClient;
  constructor(private axios: AxiosInstance) {
    this.http = new HttpClient(axios);
  }

  /**
   * No description
   *
   * @tags Common
   * @name ChangelogDetail
   * @summary Получить информацию об изменениях сущности
   * @request GET:/common/{entityType}/{entityId}/changelog
   */
  changelogDetail = (entityId: number, entityType: DirectoryEntityDto, params: RequestParams = {}) =>
    this.http.request<GetEntityChangesResponseDto, ErrorModelDto>({
      path: `/common/${entityType}/${entityId}/changelog`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Contractor
   * @name ContractorCreate
   * @summary Создание контрагента
   * @request POST:/contractor
   */
  contractorCreate = (data: CreateContractorRequestDto, params: RequestParams = {}) =>
    this.http.request<CreateContractorResponseDto, ErrorModelDto>({
      path: `/contractor`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Contractor
   * @name ContractorDelete
   * @summary Удаление контрагента
   * @request DELETE:/contractor
   */
  contractorDelete = (data: DeleteContractorRequestDto, params: RequestParams = {}) =>
    this.http.request<DeleteContractorResponseDto, ErrorModelDto>({
      path: `/contractor`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Contractor
   * @name ContractorList
   * @summary Получить информацию о контрагентах
   * @request GET:/contractor
   */
  contractorList = (params: RequestParams = {}) =>
    this.http.request<GetContractorsResponseDto, any>({
      path: `/contractor`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Contractor
   * @name ContractorUpdate
   * @summary Редактирование контрагента
   * @request PUT:/contractor
   */
  contractorUpdate = (data: UpdateContractorRequestDto, params: RequestParams = {}) =>
    this.http.request<UpdateContractorResponseDto, ErrorModelDto>({
      path: `/contractor`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags LegalEntity
   * @name LegalEntityList
   * @summary Получить информацию о юрлицах
   * @request GET:/legal-entity
   */
  legalEntityList = (params: RequestParams = {}) =>
    this.http.request<GetLegalEntitiesResponseDto, any>({
      path: `/legal-entity`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags LegalEntity
   * @name LegalEntityCreate
   * @summary Создание юрлица
   * @request POST:/legal-entity
   */
  legalEntityCreate = (data: CreateLegalEntityRequestDto, params: RequestParams = {}) =>
    this.http.request<CreateLegalEntityResponseDto, ErrorModelDto>({
      path: `/legal-entity`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags LegalEntity
   * @name LegalEntityUpdate
   * @summary Редактирование юрлица
   * @request PUT:/legal-entity
   */
  legalEntityUpdate = (data: UpdateLegalEntityRequestDto, params: RequestParams = {}) =>
    this.http.request<UpdateLegalEntityResponseDto, ErrorModelDto>({
      path: `/legal-entity`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags LegalEntity
   * @name LegalEntityDelete
   * @summary Удаление юрлица
   * @request DELETE:/legal-entity
   */
  legalEntityDelete = (data: DeleteLegalEntityRequestDto, params: RequestParams = {}) =>
    this.http.request<DeleteLegalEntityResponseDto, ErrorModelDto>({
      path: `/legal-entity`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Region
   * @name RegionList
   * @summary Получить информацию о регионах
   * @request GET:/region
   */
  regionList = (params: RequestParams = {}) =>
    this.http.request<GetRegionsResponseDto, any>({
      path: `/region`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Region
   * @name RegionCreate
   * @summary Создание региона
   * @request POST:/region
   */
  regionCreate = (data: CreateRegionRequestDto, params: RequestParams = {}) =>
    this.http.request<CreateRegionResponseDto, ErrorModelDto>({
      path: `/region`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Region
   * @name RegionDelete
   * @summary Удаление региона
   * @request DELETE:/region
   */
  regionDelete = (data: DeleteRegionRequestDto, params: RequestParams = {}) =>
    this.http.request<DeleteRegionResponseDto, ErrorModelDto>({
      path: `/region`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
