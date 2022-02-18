const {
	pascalCase, pathCase,
} = require('change-case')

// stripRegexp - регулярка, которая разделит входные данные на слова
// В конце эти слова будут склеиваться через символ /
// Удаляем все символы, кроме букв a-z и символа -
// Такие образом у нас входные данные будут разделен по словам в kebab-case
const stripRegexp = /[^a-z-]+/g

module.exports = [
	{
		type: 'input',
		name: 'name',
		message: 'Name of the component (PascalCase)',
		validate(value) {
			return pascalCase(value) === value
		},
	},
	{
		type: 'input',
		name: 'path',
		message: 'Inner dir of the component (kebab-case, optional)',
		validate(value) {
			return pathCase(value, {
				stripRegexp: stripRegexp,
			}) === value
		},
	},
]
