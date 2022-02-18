// 👉 1. Заимпортируй сгенерированный сервис:
import axios from 'axios'

import { Api, DirectoryEntityDto } from '~/api/generated/ff-billing-settings-api'
import { ServiceHandleError } from '~/api/base/error-handler'

// 👉 2. Унасладуй класс сервиса от сгенерированного:
// export default class MyService extends GeneratedService
class BillingApiService extends Api {
	@ServiceHandleError(() => [])
	async getRegions() {
		const { data: { regions } } = (await this.regionList())
		// 👉 3. Добавь вызов сгенерированного метода, если надо — преобразуй данные
		// const { data } = await this.generateMethod()
		return regions || []
		//return data || []
	}

	@ServiceHandleError(() => [])
	async getRegionChangeHistory(regionId: number) {
		const { data: { entity_change_logs } } = (await this.changelogDetail(regionId, DirectoryEntityDto.Region))

		return entity_change_logs || []
	}
}

export default new BillingApiService(axios.create({
	baseURL: 'http://ff-billing-settings-api-release-v1-0-0.whc.stg.s.o3.ru/',
}))
