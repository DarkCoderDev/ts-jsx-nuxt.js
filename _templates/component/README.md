## Компонент
Кодогенерация запускается командой
```shell
npx hygen page new
```

#### После ввода команды будут заданы 2 вопроса:
- Название компонента (в формате PascalCase)
- Путь до компонента (не обязательный)
    - По дефоту компонент создается в папке `components/component-name/`
    - Если ввести путь, то можно создавать компоненты в папках `components/path/component-name/`

#### При кодогенерации создаются следующие файлы:
- index.ts
```ts
export * from './component-name'
```

- component-name.module.css
```css
/* ComponentName */
```

- component-name.tsx
```tsx
import { VueComponent, VNode, Component, Prop } from '@fe/types'

import styles from './component-name.module.css'

interface Props {

}

@Component
export class ComponentName extends VueComponent<Props> {
	// @Prop() readonly test!: Props['test']

	public render(): VNode {
		return (
			<div>
				ComponentName
			</div>
		)
	}
}
```

- ~/components/index.ts

В файл добавляется запись, если не был указан параметр путь
```ts
export * from './component-name'
```
