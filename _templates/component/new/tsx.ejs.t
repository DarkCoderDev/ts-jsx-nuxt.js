---
to: components/<%=path%>/<%=h.changeCase.paramCase(name)%>/<%=h.changeCase.paramCase(name)%>.tsx
---
import { VueComponent, VNode, Component, Prop } from '@fe/types'

import styles from './<%=h.changeCase.paramCase(name)%>.module.css'

interface Props {

}

@Component
export class <%=h.changeCase.pascal(name)%> extends VueComponent<Props> {
	// @Prop() readonly test!: Props['test']

	public render(): VNode {
		return (
			<div>
				<%=name%>
			</div>
		)
	}
}
