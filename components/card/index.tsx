import { Component, Prop, VNode, VueComponent } from '@fe/types'
import { Head } from '@fe/ui-kit'

import styles from './index.css?module'

export interface ICardProps {
	readonly heading: string
	readonly path: string
}

@Component
export default class Card extends VueComponent<ICardProps> {

	@Prop()
	readonly heading!: ICardProps['heading']

	@Prop()
	readonly path!: ICardProps['path']

	render(): VNode {
		return (
			<div class={styles.card} onclick={() => this.$router.push(this.path)}>
				<div class={styles.circle}></div>
				<Head size={'L'}>{this.heading}</Head>
			</div>
		)
	}

}
