export function getFileFromDropEvent(event: DragEvent) {
	if (event.dataTransfer?.files[0]) {
		return event.dataTransfer.files[0]
	} else {
		throw new Error('No file found')
	}
}
