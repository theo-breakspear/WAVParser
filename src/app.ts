import { getFileFromDropEvent } from './getFileFromDropEvent'

function initialiseFileDrop() {
	const dropZone = document.getElementById('drop-zone')
	if (!dropZone) {
		throw new Error('Could not find dropzone element')
	}

	dropZone.addEventListener('dragover', (event) => {
		event.preventDefault()
	})

	dropZone.addEventListener('dragenter', (event) => {
		event.preventDefault()
		if (event.dataTransfer?.items[0]?.kind === 'file') {
			dropZone.classList.add('file-over')
			dropZone.innerText = 'drop here'
		}
	})

	dropZone.addEventListener('dragleave', (event) => {
		dropZone.classList.remove('file-over')
		dropZone.innerText = 'Drag File'
	})

	dropZone.addEventListener('drop', (event) => {
		event.preventDefault()
		dropZone.classList.remove('file-over')
		dropZone.classList.add('dropped')
		dropZone.innerText = 'File Dropped'
		const file = getFileFromDropEvent(event)
		console.log(file)
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
