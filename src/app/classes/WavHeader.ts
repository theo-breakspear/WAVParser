type HeaderField = string | number | undefined

export class WavHeader {
	ChunkID: HeaderField
	ChunkSize: HeaderField
	Format: HeaderField
	Subchunk1ID: HeaderField
	Subchunk1Size: HeaderField
	AudioFormat: HeaderField
	NumChannels: HeaderField
	SampleRate: HeaderField
	ByteRate: HeaderField
	BlockAlign: HeaderField
	BitsPerSample: HeaderField

	async populate(wavFile: File) {
		this.ChunkID = await this.setHeaderField(0, 4, true, wavFile)
		this.ChunkSize = await this.setHeaderField(4, 4, false, wavFile)
		this.Format = await this.setHeaderField(8, 4, true, wavFile)
		this.Subchunk1ID = await this.setHeaderField(12, 4, true, wavFile)
		this.Subchunk1Size = await this.setHeaderField(16, 4, false, wavFile)
		this.AudioFormat = await this.setHeaderField(20, 2, false, wavFile)
		this.NumChannels = await this.setHeaderField(22, 2, false, wavFile)
		this.SampleRate = await this.setHeaderField(24, 4, false, wavFile)
		this.ByteRate = await this.setHeaderField(28, 4, false, wavFile)
		this.BlockAlign = await this.setHeaderField(32, 2, false, wavFile)
		this.BitsPerSample = await this.setHeaderField(34, 2, false, wavFile)
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
