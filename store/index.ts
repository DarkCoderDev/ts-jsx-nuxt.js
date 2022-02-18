import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple'
import { NuxtAppOptions } from '@nuxt/types'

import { RootModule } from './root'

Vue.use(Vuex)

// create and export our store
export default () => {
	const getContextPromise = new Promise<NuxtAppOptions>((resolve) => {
		// @ts-expect-error
		window.onAppReady = (app) => resolve(app)
	})

	const instance = new RootModule({
		getContext: () => getContextPromise,
	})

	const vuexStoreInstance = createVuexStore(instance, {
		strict: true,
	})

	return vuexStoreInstance
}
