// 👉 1. Заимпортируй сгенерированный сервис:
// import { GeneratedService } from '../generated/wms-csharp-web-login'
import { ServiceHandleError } from '../base/error-handler'

// 👉 2. Унасладуй класс сервиса от сгенерированного:
// export default class MyService extends GeneratedService
export class WmsCsharpWebLoginService {
	@ServiceHandleError(() => [])
	async method() {
		// 👉 3. Добавь вызов сгенерированного метода, если надо — преобразуй данные
		// const { data } = await this.generateMethod()

		//return data || []
	}
}
