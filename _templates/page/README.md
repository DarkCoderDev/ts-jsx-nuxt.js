## Страница
Кодогенерация запускается командой
```shell
npx hygen page new
```

#### После ввода команды будут заданы 2 вопроса:
- Название страницы (в формате PascalCase)
- Путь до страницы (не обязательный)
    - По дефоту компонент создается в папке `pages/page-name/`
    - Если ввести путь, то можно создавать компоненты в папках `pages/path/page-name/`

#### При кодогенерации создаются следующие файлы:
- page-name.module.css
```css
/* PageName */
```

- index.tsx
```tsx
import { VueComponent, VNode, Component } from '@fe/types'

import styles from './page-name.module.css'

@Component({
	async fetch({ store }) {
		// await useStore<RootModule>(store)
	},
})
export default class PageNamePage extends VueComponent {

	// store = useStore<RootModule>(this.$store)

	public render(): VNode {
		return (
			<div>
				PageName
			</div>
		)
	}
}
```
