import { Logo } from '@fe/ui-kit'
import { Component, Prop, VNode, VueComponent } from '@fe/types'

import styles from './index.css?module'

import Clock from '~/components/clock'
import logoutIcon from '~/static/top-menu/logout.svg'

interface ITopMenuProps {
	projectName: string
	userName: string
	isLoggedIn: boolean
	logout: () => void
}

@Component
export default class TopMenu extends VueComponent<ITopMenuProps> {

	@Prop({
		default: 'Project Name',
	})
	private readonly projectName!: ITopMenuProps['projectName']

	@Prop()
	private isLoggedIn!: ITopMenuProps['isLoggedIn']

	@Prop({
		default: 'User name.',
	})
	private readonly userName!: ITopMenuProps['userName']

	@Prop()
	private logout!: ITopMenuProps['logout']

	render(): VNode {
		return (
			<nav class={styles.topMenu}>
				<div class={styles.topMenuLeftSide}>
					<Logo name={this.projectName} whenClick={() => this.$router.push('/')}/>
				</div>

				<div class={styles.topMenuRightSide}>
					<Clock/>

					<div class={styles.topMenuUsername}>{this.userName}</div>

					<img
						class={styles.topMenuLogout}
						src={logoutIcon}
						onClick={this.logout}
						alt="logout-icon"
					/>
				</div>
			</nav>
		)
	}

}
