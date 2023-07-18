export function getFileFromDropEvent(event: DragEvent) {
	if (event.dataTransfer?.files) {
		return event.dataTransfer.files[0]
	} else {
		throw new Error('No file dropped')
	}
}
