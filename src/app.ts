import { getFileFromDropEvent } from './getFileFromDropEvent'
import { getWavMetadata } from './getWavMetadata'

function initialiseFileDrop() {
	const dropZone = document.getElementById('drop-zone')
	const results = document.getElementById('results')
	if (!dropZone) {
		throw new Error('Could not find dropzone element')
	}
	if (!results) {
		throw new Error('Could not find results element')
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

	dropZone.addEventListener('drop', async (event) => {
		event.preventDefault()
		dropZone.classList.remove('file-over')
		dropZone.classList.add('dropped')
		dropZone.innerText = 'File Dropped'

		const file = getFileFromDropEvent(event)
		const metadata = await getWavMetadata(file)
		// pause to show file dropped?
		results.classList.add('show')
		dropZone.innerText = 'Drag File'
		console.log(metadata)
		/// todo:
		// do styles for processing
		// load metadata in results
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
