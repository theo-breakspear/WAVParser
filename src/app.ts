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
		dropZone.classList.add('file-over')
		dropZone.innerText = 'drop here'
	})

	dropZone.addEventListener('dragleave', (event) => {
		event.preventDefault()
		dropZone.classList.remove('file-over')
		dropZone.innerText = 'Drag File'
	})

	dropZone.addEventListener('drop', (event) => {
		event.preventDefault()
		dropZone.classList.remove('file-over')
		dropZone.classList.add('dropped')
		dropZone.innerText = 'File Dropped'
		//todo - load and process file
	})
}

window.addEventListener('load', () => {
	initialiseFileDrop()
})
