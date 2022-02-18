import { Component, Prop, VNode, VueComponent } from '@fe/types'
import { Tooltip } from '@fe/ui-kit/index'

import styles from '~/pages/regions/clear-filters/index.css?module'
import clearFiltersIcon from '~/static/regions/clear-filters.svg'

interface IClearFilters {
	countFilters: number
	whenClick: () => void
}

@Component
export default class ClearFilters extends VueComponent<IClearFilters> {

	@Prop()
	readonly countFilters!: IClearFilters['countFilters']

	@Prop()
	whenClick!: IClearFilters['whenClick']

	render(): VNode {
		return (
			<div>

				<Tooltip
					placement="bottom"
					trigger="hover"
					scopedSlots={{
						content: () => <span>Сбросить все фильтры</span>,
					}}
				>
					<div class={styles.clearFilter} onclick={this.whenClick}>
						<span class={styles.countFilters}>{this.countFilters}</span>
						<img
							src={clearFiltersIcon}
							alt="clear-filters-icon"
							class={styles.clearFilterIcon}
						/>
					</div>
				</Tooltip>
			</div>

		)
	}

}
