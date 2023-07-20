import { WavHeaderFactory } from './classes/WavHeaderFactory'
import { getFileFromDropEvent, insertTableRow } from './utils'

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
			const wavFile = getFileFromDropEvent(event)

			dropZone.classList.add('dropped')
			dropZone.innerText = 'File Dropped'

			const wavHeader = await new WavHeaderFactory().create(wavFile)

			const tableBody = document.querySelector('table tbody')
			if (!tableBody) {
				throw new Error('Could not find table body element')
			}

			insertTableRow(tableBody, 'Chunk ID', `${wavHeader.chunkID}`)
			insertTableRow(tableBody, 'Chunk Size', `${wavHeader.chunkSize}`)
			insertTableRow(tableBody, 'Format', `${wavHeader.format}`)
			insertTableRow(tableBody, 'Sub Chunk ID', `${wavHeader.subchunk1ID}`)
			insertTableRow(tableBody, 'Audio Format', `${wavHeader.audioFormat}`)
			insertTableRow(tableBody, 'Num Channels', `${wavHeader.numChannels}`)
			insertTableRow(tableBody, 'Sample Rate', `${wavHeader.sampleRate}`)
			insertTableRow(tableBody, 'Byte Rate', `${wavHeader.byteRate}`)
			insertTableRow(tableBody, 'Block Align', `${wavHeader.blockAlign}`)
			insertTableRow(tableBody, 'Bits Per Sample', `${wavHeader.bitsPerSample}`)

			results.classList.add('show')
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
		} catch (e: any) {
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
			throw new Error(e.message)
		}

		dropZone.classList.remove('dropped')
		dropZone.innerText = 'Drag File'
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
