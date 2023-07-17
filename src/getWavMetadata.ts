import { wavHeaderFormat } from './wavHeaderFormat'

export async function getWavMetadata(file: File) {
	let metadata: Record<string, string | number> = {}

	for (let field of wavHeaderFormat) {
		const blob = file.slice(field.offset, field.offset + field.size)
		if (field.type == 'string') {
			metadata[field.name] = await blob.text()
		} else if (field.type == 'decimal') {
			const data = new Uint8Array(await blob.arrayBuffer())
			metadata[field.name] = data.reduce(
				(acc, cur, i) => acc + (cur << (i * 8))
			)
		} else {
			throw new Error('unrecognised type key in wavHeaderFormat')
		}
	}
	return metadata
}