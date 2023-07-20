import { WavHeader } from './WavHeader'

export class WavHeaderFactory {
	async create(wavFile: File): Promise<WavHeader> {
		const chunkID = await this.setHeaderField(0, 4, true, wavFile)
		const chunkSize = await this.setHeaderField(4, 4, false, wavFile)
		const format = await this.setHeaderField(8, 4, true, wavFile)
		const subchunk1ID = await this.setHeaderField(12, 4, true, wavFile)
		const subchunk1Size = await this.setHeaderField(16, 4, false, wavFile)
		const audioFormat = await this.setHeaderField(20, 2, false, wavFile)
		const numChannels = await this.setHeaderField(22, 2, false, wavFile)
		const sampleRate = await this.setHeaderField(24, 4, false, wavFile)
		const byteRate = await this.setHeaderField(28, 4, false, wavFile)
		const blockAlign = await this.setHeaderField(32, 2, false, wavFile)
		const bitsPerSample = await this.setHeaderField(34, 2, false, wavFile)

		return new WavHeader(
			chunkID,
			chunkSize,
			format,
			subchunk1ID,
			subchunk1Size,
			audioFormat,
			numChannels,
			sampleRate,
			byteRate,
			blockAlign,
			bitsPerSample
		)
	}

	private async setHeaderField(
		offset: number,
		size: number,
		parseAsText: boolean,
		wavFile: File
	): Promise<string | number> {
		const parseText = async (blob: Blob) => await blob.text()
		const parseInt = async (blob: Blob) =>
			new Uint8Array(await blob.arrayBuffer()).reduce(
				(acc, cur, i) => acc + (cur << (i * 8))
			)
		const blob = wavFile.slice(offset, offset + size)
		return await (parseAsText ? parseText(blob) : parseInt(blob))
	}
}
