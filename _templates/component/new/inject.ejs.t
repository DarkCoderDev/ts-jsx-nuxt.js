---
inject: true
append: true
to: "<%=path ? null : 'components/index.ts'%>"
---
export * from './<%=h.changeCase.paramCase(name)%>'
