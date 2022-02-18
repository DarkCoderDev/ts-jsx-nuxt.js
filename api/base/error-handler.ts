import { Notification } from '@fe/ui-kit'

const handlePromiseReject = async function <T>(promise: Promise<T>, callback?: () => void): Promise<T> {
	try {
		return await promise
	} catch (error: any) {
		typeof callback === 'function' && callback()
		return error
	}
}

// Декоратор
function HandleErrorDecorator<T, R extends () => T>(handler: (error: Error) => void, defaultValueConstructor: R | void) {
	return function (target: object, key: string, descriptor: PropertyDescriptor) {
		const original = descriptor.value

		descriptor.value = async function (...args: unknown[]) {
			try {
				return await original.apply(this, args)
			} catch (error: any) {
				handler(error)

				if (defaultValueConstructor) {
					return defaultValueConstructor()
				}
			}
		}

		return descriptor
	}
}

const errorNotification = (error: Error) => Notification.error({
	message: error.message,
})

// Генератор декоратора с привязанной функцией обрабоки ошибки
const ServiceHandleError = <T, R extends () => T>(defaultValueConstructor?: R | void) => {
	return HandleErrorDecorator<T, R>(() => errorNotification, defaultValueConstructor)
}

export { handlePromiseReject, HandleErrorDecorator, ServiceHandleError }
