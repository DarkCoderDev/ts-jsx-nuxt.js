import { Component, VNode, VueComponent } from '@fe/types'

import styles from './index.css'

import Section from '~/components/section'
import { ICardProps } from '~/components/card'

@Component({ layout: 'default' })
export default class MainPage extends VueComponent {

	private cards: ICardProps[] = [
		{
			heading: 'Услуги',
			path: '/',
		},
		{
			heading: 'Регионы',
			path: '/regions',
		},
		{
			heading: 'Базовые цены',
			path: '/',
		},
		{
			heading: 'Тарифные планы',
			path: '/',
		},
	]

	private sections: string[] = ['Услуги', 'Договоры', 'Начисления', 'Права и роли']

	render(): VNode {
		return (
			<main class={styles.page}>
				{this.sections.map((sectionHeading) => (
					<Section
						key={sectionHeading}
						heading={sectionHeading}
						cards={this.cards}
					/>
				))}
			</main>
		)
	}
}
