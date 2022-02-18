export interface FetchState {
	isFetching: boolean
	setIsFetching(value: boolean): void
}

export function WithFetchState() {
	return function (_target: FetchState, _propertyName: string, descriptor: PropertyDescriptor) {
		const method = descriptor.value
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		descriptor.value = async function (this: FetchState, ...args: any[]) {
			this.setIsFetching(true)
			try {
				return await method.apply(this, args)
			}
			finally {
				this.setIsFetching(false)
			}
		}
	}
}
