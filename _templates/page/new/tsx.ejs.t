---
to: pages/<%=path%>/<%=h.changeCase.paramCase(name)%>/index.tsx
---
import { VueComponent, VNode, Component } from '@fe/types'

import styles from './<%=h.changeCase.paramCase(name)%>.module.css'

@Component({
	async fetch({ store }) {
		// await useStore<RootModule>(store)
	},
})
export default class <%=h.changeCase.pascal(name)%>Page extends VueComponent {

	// store = useStore<RootModule>(this.$store)

	public render(): VNode {
		return (
			<div>
				<%=name%>
			</div>
		)
	}
}
