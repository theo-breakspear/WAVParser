export function insertTableRow(tableBody: Element, col1: string, col2: string) {
	const newRow = document.createElement('tr')
	const cell1 = document.createElement('td')
	const cell2 = document.createElement('td')

	cell1.textContent = col1
	cell2.textContent = col2

	newRow.appendChild(cell1)
	newRow.appendChild(cell2)
	tableBody.appendChild(newRow)
}
