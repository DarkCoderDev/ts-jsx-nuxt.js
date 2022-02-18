import { Module, State, Mutation } from 'vuex-simple'
export { useStore } from 'vuex-simple'
import { NuxtAppOptions } from '@nuxt/types'

type GetContext = () => Promise<NuxtAppOptions>

type RootOptions = {
	getContext: GetContext
}

class RootBase {
	getContext: GetContext

	constructor({
		getContext,
	}: RootOptions) {
		this.getContext = getContext
	}
}

export class RootModule extends RootBase {

	@State()
	public version = '1.0.0'

	@Mutation()
	public setVersion(version: string): void {
		this.version = version
	}
}
