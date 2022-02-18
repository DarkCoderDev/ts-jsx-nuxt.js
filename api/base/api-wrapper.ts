import { NuxtAppOptions } from '@nuxt/types'
import Axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

import pkg from '~/package.json'

export type TokenProvider = Promise<() => Promise<{ token: string; logout: () => void }>>
export type ApiConstructor<T> = new (axios: AxiosInstance) => T

function createApi<T>(Api: ApiConstructor<T>, basePath: string, wmsClientPromise: Promise<NuxtAppOptions['$wmsAuthClient']>): T {
	let wmsClient: NuxtAppOptions['$wmsAuthClient']
	const axios = Axios.create({
		timeout: 59000,
		baseURL: basePath,
	})

	let getToken: () => Promise<{ token: string; logout: () => void }>

	axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
		if (!wmsClient) {
			wmsClient = await wmsClientPromise
		}

		const token = wmsClient.getToken()

		if (token) {
			config.headers['X-O3-App-Name'] = pkg.name
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	}, (error: AxiosError) => {
		return Promise.reject(error)
	})

	axios.interceptors.response.use((response) => response, async (error) => {
		if (error.response && error.response.status === 401) {
			if (!wmsClient) {
				wmsClient = await wmsClientPromise
			}

			wmsClient.logout()
		}

		return Promise.reject(error)
	})

	return new Api(axios)
}

export { createApi }
