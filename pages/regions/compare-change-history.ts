type EntityChangeLogValues = {
	id: number
	name: string
	is_active: boolean
	currency_num: number
	warehouse_ids: number[]
}

const compareChangeValues = (oldValues: EntityChangeLogValues, newValues: EntityChangeLogValues): string[] => {
	const result = []

	if (oldValues['name'] !== newValues['name']) result.push(`Наименование региона: ${oldValues['name']} на ${newValues['name']}.`)

	if (oldValues['currency_num'] !== newValues['currency_num']) result.push(`Валюту: ${oldValues['currency_num']} на ${newValues['currency_num']}`)

	oldValues['warehouse_ids'].forEach((wOld) => {
		if (!newValues['warehouse_ids'].includes(wOld)) result.push(`Удалил склад: ${wOld}.`)
	})

	newValues['warehouse_ids'].forEach((wNew) => {
		if (!oldValues['warehouse_ids'].includes(wNew)) result.push(`Добавил склад: ${wNew}.`)
	})

	return result
}

export default compareChangeValues
