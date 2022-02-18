import { NuxtAppOptions } from '@nuxt/types'

import { createApi, TokenProvider, ApiConstructor } from './base/api-wrapper'
import BillingApiService from './services/ff-billing-settings-api'
import { WmsCsharpWebLoginService } from './services/wms-csharp-web-login'

export function createServices(wmsClient: Promise<NuxtAppOptions['$wmsAuthClient']>) {
	return {
		ffBillingSettingsApi: createApi(BillingApiService, '/api/ff-billing-settings-api', wmsClient),
		wmsCsharpWebLogin: createApi(WmsCsharpWebLoginService, '/api/wms-csharp-web-login', wmsClient),
	}
}
