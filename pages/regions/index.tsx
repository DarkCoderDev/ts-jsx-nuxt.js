import { Component, VNode, VueComponent, Watch } from '@fe/types'
import dayjs from 'dayjs'
import {
	Autocomplete,
	Button,
	CoreIcon,
	Field,
	Fragment,
	Head,
	Loader,
	PaginationRowsPerPage,
	PopupSidebar,
	Search,
	Table,
	Tabs,
	Tooltip,
} from '@fe/ui-kit'

import styles from '~/pages/regions/index.css?module'
import GoBack from '~/components/go-back'
import ClearFilters from '~/pages/regions/clear-filters'
import BillingApiService from '~/api/services/ff-billing-settings-api'
import { EntityChangeLogDto, RegionDto } from '~/api/generated/ff-billing-settings-api'
import dangerIcon from '~/static/icons/danger.svg'
import compareChangeValues from '~/pages/regions/compare-change-history'

export type Currency = {
	label: string
	value: number
}

type Warehouse = {
	label: string
	value: number
}

type Filters = {
	region_name: string
	currency: string | number
	warehouse: string | number
}

type CreateRegion = {
	region_name: string
	region_currency_num: string | number
	region_warehouse_ids: number[]
}

const currency: Currency[] = [
	{
		label: 'Российский рубль (RUB)',
		value: 643,
	},
	{
		label: 'Тенге (KZT)',
		value: 398,
	},
]

const warehouses = [
	{
		label: 'Екатеринбург РФЦ НОВЫЙ',
		value: 1,
	},
	{
		label: 'Новая Рига РФЦ',
		value: 2,
	},
	{
		label: 'Новосибирск РФЦ НОВЫЙ',
		value: 3,
	},
	{
		label: 'Ростов на Дону РФЦ',
		value: 4,
	},
	{
		label: 'Ростов на Дону РФЦ',
		value: 5,
	},
	{
		label: 'Санкт Петербург РФЦ',
		value: 6,
	},
	{
		label: 'Тверь Хаб',
		value: 7,
	},
	{
		label: 'Хабаровск РФЦ',
		value: 8,
	},
	{
		label: 'ХОРУГВИНО РФЦ',
		value: 9,
	},
	{
		label: 'Хоругвино НЕГАБАРИТ',
		value: 10,
	},
]

@Component({ layout: 'default' })
export default class RegionsPage extends VueComponent {

	loadedRegions: Array<RegionDto> | [] = []

	async created() {
		this.loadedRegions = (await BillingApiService.getRegions())
	}

	filters: Filters = {
		region_name: '',
		currency: '',
		warehouse: '',
	}

	get countFilters() {
		return Object.values(this.filters).filter(Boolean).length
	}

	get regionList() {
		if (this.filters.region_name || this.filters.currency) {
			return this.loadedRegions.filter((region) => {
				if (this.filters.region_name && this.filters.currency) {
					return region.region_name?.toLowerCase().includes(this.filters.region_name.toLowerCase()) && region.region_currency?.currency_num === this.filters.currency
				}
				if (this.filters.region_name) {
					return region.region_name?.toLowerCase().includes(this.filters.region_name.toLowerCase())
				}
				if (this.filters.currency) {
					return region.region_currency?.currency_num === this.filters.currency
				}
			})
		}
		return this.loadedRegions
	}

	currency: Currency[] = currency

	warehouses: Warehouse[] = warehouses

	isShowRegionSidebar = false

	isCreateRegion = false

	isShowRegion = false

	isEditRegion = false

	region: RegionDto = {
		region_id: 0,
		region_currency: {
			currency_code: '',
			currency_num: 0,
			currency_eng_desc: '',
			currency_ru_desc: '',
		},
		region_name: '',
		region_warehouses: [
			{
				warehouse_id: 0,
				warehouse_type: '',
				warehouse_name: '',
			},
		],
	}

	regionHistory!: EntityChangeLogDto[] | []

	tabLabels = ['Основная информация', 'История изменений']

	selectedTab = 0

	@Watch('region')
	async getRegionChangeHistory(region: RegionDto) {
		this.regionHistory = (await BillingApiService.getRegionChangeHistory(region.region_id))
		console.log(this.regionHistory)
	}

	whenSwitchTabs(index: number, e: MouseEvent) {
		e.preventDefault()
		this.selectedTab = index
	}

	handleCloseRegionSidebar() {
		this.isShowRegionSidebar = false
		this.isCreateRegion = false
		this.isEditRegion = false
		this.isShowRegion = false
		this.selectedTab = 0
	}

	isShowSelectWarehouseSidebar = false

	handleCloseSelectWarehouseSidebar() {
		this.isShowSelectWarehouseSidebar = false
		this.handleCloseRegionSidebar()
	}

	paginationValue = 1

	paginationRowsPerPage: PaginationRowsPerPage = 10

	whenChangePaginationValue(value: number) {
		this.paginationValue = value
	}

	whenChangePaginationRowsPerPage(rowsPerPage: PaginationRowsPerPage) {
		this.paginationRowsPerPage = rowsPerPage
		this.paginationValue = 1
	}

	createRegion: CreateRegion = {
		region_name: '',
		region_currency_num: '',
		region_warehouse_ids: [],
	}

	renderSidebarCreateRegion() {
		return (
			<Fragment>
				<PopupSidebar.Title>
					<Head size={'L'}>Создание региона</Head>
				</PopupSidebar.Title>

				<PopupSidebar.Content>
					<Field
						whenChange={(value) => this.createRegion.region_name = value}
						size={'L'}
						style={{ width: '430px' }}
						disabled={false}
						placeholder={'Москва_руб'}
						label={'Наименование региона'}
						value={this.createRegion.region_name}
					/>
					<Autocomplete
						label={'Валюта'}
						placeholder={'Не выбрано'}
						size={'L'}
						style={{
							width: '430px',
							marginTop: '10px',
						}}
						options={this.currency}
						autoclose={true}
						values={[this.createRegion.region_currency_num]}
						whenChange={(value) => this.createRegion.region_currency_num = value}
					/>

					<div class={styles.addWarehouseWrapper}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Head>Склады</Head>
						</div>
						<Button
							whenClick={() => this.isShowSelectWarehouseSidebar = true}
							type="plain"
						>
							<CoreIcon name={'ic_m_plus'}/> Добавить склад
						</Button>
					</div>

					<div class={styles.dangerMessage}>
						<img src={dangerIcon} alt="danger-icon"/>
						<div style={{ marginTop: '20px' }}>
							Cклады в сохраняемом регионе не должны участвовать ни в каких других регионах с той же
							валютой.
						</div>
					</div>
				</PopupSidebar.Content>

				<PopupSidebar.Footer>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							whenClick={() => this.isShowRegionSidebar = this.isCreateRegion = false}
							type="secondary"
							style={{ marginRight: '20px' }}
						>Отмена
						</Button>
						<Button
							disabled={true}
						>Создать
						</Button>
					</div>
				</PopupSidebar.Footer>
			</Fragment>
		)
	}

	renderSidebarShowRegion() {
		return (
			<Fragment>
				<PopupSidebar.Title>
					<Head size={'L'}>{this.region.region_name}</Head>
				</PopupSidebar.Title>

				<PopupSidebar.Content>
					<Tabs
						labels={this.tabLabels}
						selected={this.selectedTab}
						whenChange={this.whenSwitchTabs}
					>
						<Tabs.Tab>
							<div class={styles.regionShowTitle}>
								<div class={styles.regionShowLabel}>Наименование региона</div>
								<div>{this.region.region_name}</div>
							</div>

							<div class={styles.regionShowTitle}>
								<div class={styles.regionShowLabel}>Валюта</div>
								<div>{this.region.region_currency?.currency_ru_desc} ({this.region.region_currency?.currency_code})</div>
							</div>

							<div class={styles.regionShowTitle}>
								<div class={styles.regionShowLabel}>Склады</div>
								<ul>
									{this.warehouses.map((warehouse) => (
										<li key={warehouse.value}>{warehouse.label}</li>
									))}
								</ul>
							</div>
						</Tabs.Tab>
						<Tabs.Tab>
							{this.regionHistory?.length && this.regionHistory.map((regionHistory) => {
								return (
									<div
										key={regionHistory.id}
										style={{
											marginTop: '15px',
											display: 'flex',
											flexFlow: 'nowrap column',
										}}
									>
										<Head size={'S'}>
											{dayjs(regionHistory.createdAt).format('DD.MM.YYYY HH:mm')}
										</Head>
										<div>
											<span style={{ color: '#005BFF' }}>{regionHistory.userName} </span>
											{regionHistory.actionType === 'Created'
												? (
													<span>
													Создал(а) регион <b>{regionHistory?.newValue && JSON.parse(regionHistory?.newValue)?.name}</b>.
													</span>
												)
												: (
													<Fragment>
														<span>Изменил(а) атрибут(ы):</span>
														{(regionHistory?.oldValue && regionHistory?.newValue) &&
															(
																<ul>
																	{compareChangeValues(JSON.parse(regionHistory?.oldValue), JSON.parse(regionHistory?.newValue))
																		.map((change) => <li key={change}>{change}</li>)
																	}
																</ul>
															)
														}
													</Fragment>
												)
											}
										</div>

									</div>
								)
							})}
						</Tabs.Tab>
					</Tabs>
				</PopupSidebar.Content>

				<PopupSidebar.Footer>
					<div style={{ display: 'flex' }}>
						<Button
							whenClick={() => {
								this.isShowRegion = false
								this.isEditRegion = true
							}}
							type="outline"
							style={{ marginRight: '20px' }}
						>Редактировать
						</Button>
						<Button
							style={{
								border: '1px solid #EA1F49',
								color: '#EA1F49',
							}}
							type="outline"
						>Удалить
						</Button>
					</div>
				</PopupSidebar.Footer>
			</Fragment>
		)
	}

	renderSidebarEditRegion() {
		return (
			<Fragment>
				<PopupSidebar.Title>
					<Head size={'L'}>Редактирование региона</Head>
				</PopupSidebar.Title>

				<PopupSidebar.Content>
					<Field
						whenChange={(value) => alert(value)}
						style={{ width: '430px' }}
						size={'L'}
						disabled={false}
						placeholder={'Москва_руб'}
						label={'Наименование региона'}
						value={this.region.region_name}
					/>
					<Autocomplete
						label={'Валюта'}
						size={'L'}
						style={{
							width: '430px',
							marginTop: '10px',
						}}
						options={this.currency}
						placeholder={'Не выбрано'}
						autoclose={false}
						values={[this.region.region_currency.currency_num]}
						whenChange={(value) => console.log(value)}
					/>

					<div class={styles.addWarehouseWrapper}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Head>Склады</Head>
						</div>
						<Button
							whenClick={() => this.isShowSelectWarehouseSidebar = true}
							type="plain"
						>
							<CoreIcon name={'ic_m_plus'}/> Добавить склад
						</Button>
					</div>

					<div class={styles.selectedWarehousesContainer}>
						{this.warehouses.map((warehouse) => {
							return (
								<div key={warehouse.value} class={styles.selectedWarehousesItem}>
									<span>{warehouse.label}</span>
									<CoreIcon style={{ color: 'red' }} name={'ic_m_trash_bin'}/>
								</div>
							)
						})}
					</div>
				</PopupSidebar.Content>

				<PopupSidebar.Footer>
					<div class={styles.btnContainer}>
						<Button
							style={{
								background: '#ea1f49',
								color: 'white',
							}}
						>
							<CoreIcon name={'ic_m_trash_bin'}/>
						</Button>

						<Button
							whenClick={() => {
								this.isShowRegion = true
								this.isEditRegion = false
							}}
							type="secondary"
						>
							Отмена
						</Button>

						<Button
							disabled={true}
						>Создать
						</Button>
					</div>
				</PopupSidebar.Footer>
			</Fragment>
		)
	}

	renderSidebarSelectWarehouses() {
		return (
			<Fragment>
				<PopupSidebar.Title>
					<Head size={'L'}>Выбор складов</Head>
				</PopupSidebar.Title>

				<PopupSidebar.Content>
					<Search
						value={''}
						whenChange={() => alert('Search warehouse')}
						label={'Поиск региона'}
						size={'L'}
						placeholder="Наименование региона"
					/>

					<div class={styles.warehousesSelectContainer}>
						<div class={styles.warehouseItem}>
							<span>Выбрать все</span>
						</div>
						{this.warehouses.map((warehouse) => {
							return (
								<div
									key={warehouse.value}
									class={[styles.warehouseItem, (warehouse.value === 2) && styles.warehouseItemActive]}
								>
									<span>{warehouse.label}</span>
									{(warehouse.value === 2) && (<CoreIcon name={'ic_m_check'}/>)}
								</div>
							)
						})}
					</div>
				</PopupSidebar.Content>

				<PopupSidebar.Footer>
					<div class={styles.btnContainer}>
						<Button
							type="secondary"
							style={'margin-right: 20px;'}
						>Сброс
						</Button>
						<Button
							whenClick={() => this.isShowSelectWarehouseSidebar = false}
							type="secondary"
							style={{ marginRight: '20px' }}
						>Отмена
						</Button>
						<Button>Сохранить
						</Button>
					</div>
				</PopupSidebar.Footer>
			</Fragment>
		)
	}

	render(): VNode {
		return (
			<main class={styles.page}>

				<GoBack path={'/'}>Регионы</GoBack>

				{this.isShowSelectWarehouseSidebar
					? (
						<PopupSidebar
							isShow={this.isShowSelectWarehouseSidebar}
							whenClose={this.handleCloseSelectWarehouseSidebar}
						>
							{this.renderSidebarSelectWarehouses()}
						</PopupSidebar>

					) : (
						<PopupSidebar
							isShow={this.isShowRegionSidebar}
							whenClose={this.handleCloseRegionSidebar}
						>
							{this.isCreateRegion && this.renderSidebarCreateRegion()}
							{this.isShowRegion && this.renderSidebarShowRegion()}
							{this.isEditRegion && this.renderSidebarEditRegion()}
						</PopupSidebar>
					)
				}

				<div class={styles.menu}>

					<div class={styles.menuLeft}>
						<Search
							value={this.filters.region_name}
							whenChange={(value) => this.filters.region_name = value}
							label={'Поиск региона'}
							size={'L'}
							placeholder="Наименование региона"
						/>

						<Autocomplete
							label={'Валюта'}
							size={'L'}
							options={this.currency}
							placeholder={'Не выбрано'}
							autoclose={true}
							values={[this.filters.currency]}
							whenChange={(value) => this.filters.currency = value}
						/>

						<Autocomplete
							label={'Склад'}
							size={'L'}
							options={this.warehouses}
							placeholder={'Не выбрано'}
							autoclose={true}
							values={[this.filters.warehouse]}
							whenChange={(value) => this.filters.warehouse = value}
						/>

						{!!this.countFilters && (
							<ClearFilters
								countFilters={this.countFilters}
								whenClick={() => this.filters.region_name = this.filters.currency = this.filters.warehouse = ''}
							/>
						)}
					</div>

					<Button
						whenClick={() => this.isShowRegionSidebar = this.isCreateRegion = true}
						style={{ whiteSpace: 'nowrap' }}
						inputType={'button'}
						size={'L'}
					>
						<CoreIcon name={'ic_m_plus'}/> Создать регион
					</Button>
				</div>

				<div class={styles.tableWrapper}>
					{!this.loadedRegions.length && <Loader/>}
					<Table
						style={{
							boxShadow: 'none',
							background: 'none',
						}}
					>
						<Table.Head>
							<Table.Sorting
								style={{
									whiteSpace: 'nowrap',
									background: 'none',
								}}
								width={250}
								whenChange={(sortOrder: number) => alert(`sort ${sortOrder}`)}
								sortOrder={1}
								items={['По убыванию', 'По возрастанию']}
							>
								Наименование региона
							</Table.Sorting>
							<Table.Sorting
								style={{ background: 'none' }}
								width={250}
								whenChange={(sortOrder: number) => alert(`sort ${sortOrder}`)}
								sortOrder={0}
								items={['По убыванию', 'По возрастанию']}
							>
								Валюта
							</Table.Sorting>
							<Table.Cell style={{ background: 'none' }}>Склады</Table.Cell>
						</Table.Head>
						{this.regionList.map((region) => (
							<Table.Row
								whenClick={() => {
									this.isShowRegionSidebar = !this.isShowRegionSidebar
									this.region = region
									this.isShowRegion = !this.isShowRegion
								}}
								key={region.region_id}
							>
								<Table.Cell>{region.region_name}</Table.Cell>
								<Table.Cell>{region?.region_currency?.currency_ru_desc}</Table.Cell>
								<Table.Cell>
									<Tooltip
										placement="top"
										trigger="hover"
										scopedSlots={{
											content: () => (
												<div>{region?.region_warehouses?.map((warehouse) => (
													<span key={warehouse}>{warehouse} •</span>
												))}
												</div>
											),
										}}
									>
										{region?.region_warehouses?.map((warehouse) => (
											<span key={warehouse}>{warehouse} •</span>
										))}
									</Tooltip>
								</Table.Cell>
							</Table.Row>
						))
						}
					</Table>
					{(!this.regionList.length && this.countFilters) && (
						<div
							style={{
								textAlign: 'center',
								margin: '5% 0',
							}}
						>Не найдено.
						</div>
					)}
				</div>

				<Table.Pagination
					value={this.paginationValue}
					totalRows={this.loadedRegions.length}
					whenChangeValue={this.whenChangePaginationValue}
					rowsPerPage={this.paginationRowsPerPage}
					whenChangeRowsPerPage={this.whenChangePaginationRowsPerPage}
				/>

			</main>
		)
	}

}
