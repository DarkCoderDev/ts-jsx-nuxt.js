import { Component, VNode, VueComponent } from '@fe/types'
import dayjs from 'dayjs'

import styles from './index.css?module'

import clockIcon from '~/static/clock/clock.svg'
import Timeout = NodeJS.Timeout

@Component
export default class Clock extends VueComponent {

	private time: string = dayjs().format('HH:mm:ss')

	updateTime(): void {
		this.time = dayjs().format('HH:mm:ss')
	}

	private timeInterval!: Timeout

	mounted() {
		this.timeInterval = setInterval(this.updateTime, 1000)
	}

	unmounted() {
		clearInterval(this.timeInterval)
	}

	render(): VNode {
		return (
			<div class={styles.clock}>
				<img src={clockIcon} alt="clock-icon"/>
				<span>{this.time}</span>
			</div>
		)
	}

}

