interface FromDto<FromType, ToType> {
	(data: FromType): ToType
}

export { FromDto }
