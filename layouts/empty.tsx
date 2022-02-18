import { VueComponent, Component, VNode } from '@fe/types'

@Component
export default class EmptyLayout extends VueComponent {
	render(): VNode {
		return (<nuxt />)
	}
}
