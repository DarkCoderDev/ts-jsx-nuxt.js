import { test, expect } from '@playwright/test'

test('basic test', async ({
	page,
	baseURL,
}) => {
	await page.goto(baseURL as string)
	expect(page.url()).toContain('')
})
