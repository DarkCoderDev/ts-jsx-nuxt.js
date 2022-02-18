import { NuxtAppOptions } from '@nuxt/types'

import { RootModule } from '../root'

import { BaseModule } from './base-module'

import { createServices } from '~/api/services'

export class ModuleWithApi extends BaseModule {
	protected api: ReturnType<typeof createServices>

	constructor(root: RootModule) {
		super(root)
		this.api = createServices(root
			.getContext()
			.then((app: NuxtAppOptions) => app.$wmsAuthClient))
	}
}
