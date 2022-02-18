import { State, Mutation, Getter } from 'vuex-simple'

import { RootModule } from '../root'

export class BaseModule {
	protected root: RootModule

	constructor(root: RootModule) {
		this.root = root
	}

	@State()
	private isFetchingCount = 0

	@Getter()
	public get isFetching() {
		return this.isFetchingCount > 0
	}

	@Mutation()
	public setIsFetching(value: boolean): void {
		this.isFetchingCount += value ? 1 : -1
	}
}
