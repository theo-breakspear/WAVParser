import { WavHeader } from './classes/WavHeader'
import { getFileFromDropEvent } from './utils'

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
		dropZone.classList.remove('file-over')
		try {
			const file = getFileFromDropEvent(event)

			dropZone.classList.add('dropped')
			dropZone.innerText = 'File Dropped'

			const header = new WavHeader()
			await header.populate(file)
			console.log(header)

			results.classList.add('show')
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'

			console.log(header)
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
