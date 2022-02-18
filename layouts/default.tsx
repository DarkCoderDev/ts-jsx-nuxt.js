import { Component, VNode, VueComponent } from '@fe/types'

import styles from './default.module.css'

import TopMenu from '~/components/top-menu'

@Component({
	async fetch() {
		// const store = useStore<RootModule>(this.$store)

		// 👉 Неплохое место для инициализации общих для проекта зависимостей
		const claims = this.$wmsAuthClient.claims
	},
})
export default class DefaultLayout extends VueComponent {

	private readonly projectName = 'FF Billing'

	private logout() {
		this.$wmsAuthClient && this.$wmsAuthClient.logout()
	}

	private get isLoggedIn() {
		return this.$wmsAuthClient ? Boolean(this.$wmsAuthClient.getUser()) : false
	}

	private get userName() {
		return this.$wmsAuthClient && this.$wmsAuthClient.getUser()?.name || ''
	}

	render(): VNode {
		return (
			<div class={styles.layout}>
				<TopMenu
					userName={this.userName}
					logout={this.logout}
					isLoggedIn={this.isLoggedIn}
					projectName={this.projectName}
				/>

				<div class={styles.page}>
					<nuxt/>
				</div>
			</div>
		)
	}

}
