import { Component, Prop, VNode, VueComponent } from '@fe/types'
import { Head } from '@fe/ui-kit'

import styles from './index.css?module'

import arrowIcon from '~/static/regions/arrow.svg'

interface IGoBackProps {
	readonly path: string
}

@Component
export default class GoBack extends VueComponent<IGoBackProps> {

	@Prop()
	readonly path!: IGoBackProps['path']

	render(): VNode {
		return (
			<div class={styles.goBack} onClick={() => this.$router.push(this.path)}>
				<img src={arrowIcon} alt="arrow-icon"/>
				<Head size={'L'} style={'margin-bottom: 0;'}>{this.$slots.default}</Head>
			</div>
		)
	}

}
