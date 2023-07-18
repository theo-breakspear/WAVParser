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
		dropZone.classList.add('file-over')
		dropZone.innerText = 'drop here'
	})

	dropZone.addEventListener('dragleave', (event) => {
		dropZone.classList.remove('file-over')
		dropZone.innerText = 'Drag File'
	})

	dropZone.addEventListener('drop', async (event) => {
		event.preventDefault()
		const file = getFileFromDropEvent(event)
		dropZone.classList.remove('file-over')
		dropZone.classList.add('dropped')
		dropZone.innerText = 'File Dropped'
		// pause to show file dropped?
		try {
			const metadata = await getWavMetadata(file)
			results.classList.add('show')
			console.log(metadata)
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
		} catch (e: any) {
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
			throw new Error(e.message)
		}

		dropZone.classList.remove('dropped')
		dropZone.innerText = 'Drag File'

		/// todo:
		// load metadata in results
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
