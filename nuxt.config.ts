import { AuthType, nuxtConfig } from '@fe/nuxt-config'

/**
 * https://gitlab.ozon.ru/fe/bootstraper/blob/master/packages/nuxt-config
 */
const config = nuxtConfig({
	/**
	 * Добавляет this.$tracker
	 * https://gitlab.ozon.ru/fe/bootstraper/blob/master/packages/nuxt-tracker
	 */
	// tracker: {
	// 	// автоматическая инициализация трекера
	// 	autoInit: false,
	// 	// автоматическое отправление событий
	// 	pageTrackerEnabled: false,
	//	// https://tracker-sdk.o3.ru/tracker/concept/configuration/
	// },
	tracker: true,

	/**
	 * Добавляет this.$logger
	 * https://gitlab.ozon.ru/fe/bootstraper/blob/master/packages/nuxt-logger
	 */
	logger: true,

	// Включает sentry.
	// Для полноценной работы необходимо передать в values.yml SENTRY_DSN
	// больше информации https://gitlab.ozon.ru/fe/bootstraper/-/blob/master/docs/tutorial/sentry.md
	sentry: false,

	// Авторизация черзе OzonID https://gitlab.ozon.ru/fe/bootstraper/blob/master/packages/nuxt-ozon-id
	// Для включения авторизации через keycloak
	// authorization: AuthType.keycloak,
	authorization: [AuthType.wms, {
		wmsAuthUrl: 'http://wms-csharp-web-login.wms.stg.s.o3.ru',
		claimsUrl: 'http://wms-csharp-web-settings.wms.stg.s.o3.ru/v1/authorize/claims',
	}],

	// Proxy для локальной разработки.
	// Для собственной настройки необходимо передать обьект
	// {'/api/example': 'http://example.stg.o3.ru'}
	proxy: 'auto',

	// Включает devtoolkit в приложении
	// Для того чтобы увидеть интерфейс необходимо добавить fe-devtoolkit = true в localStorage
	// Или добавить о query параметр fe-devtoolkit=true
	// Пример: http://localhost:3000?fe-devtoolkit=true
	devtoolkit: true,
})

export default config
