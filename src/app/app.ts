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

	dropZone.addEventListener('dragleave', () => {
		dropZone.classList.remove('file-over')
		dropZone.innerText = 'Drag File'
	})

	dropZone.addEventListener('drop', async (event) => {
		event.preventDefault()
		const file = event.dataTransfer?.files[0]
		dropZone.classList.remove('file-over')
		if (!file) {
			throw new Error('No file dropped')
		}
		dropZone.classList.add('dropped')
		dropZone.innerText = 'File Dropped'

		let wavHeader
		const { WavHeaderFactory } = await import('./classes/WavHeaderFactory')
		try {
			wavHeader = await new WavHeaderFactory().create(file)
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
		} catch (e: any) {
			dropZone.classList.remove('dropped')
			dropZone.innerText = 'Drag File'
			throw new Error(e.message)
		}

		const tableBody = document.querySelector('table tbody')
		if (!tableBody) {
			throw new Error('Could not find table body element')
		}

		while (tableBody.firstChild) {
			tableBody.removeChild(tableBody.firstChild)
		}

		const { insertTableRow } = await import('./utils')
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
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
