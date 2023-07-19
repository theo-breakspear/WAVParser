export function getFileFromDropEvent(event: DragEvent) {
	if (event.dataTransfer?.files[0]) {
		return event.dataTransfer.files[0]
	}
	throw new Error('No file dropped')
}
