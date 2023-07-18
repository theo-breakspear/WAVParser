import { WavHeaderField } from './WavHeaderField'

export class WavHeader {
	ChunkID: WavHeaderField
	ChunkSize: WavHeaderField
	Format: WavHeaderField
	Subchunk1ID: WavHeaderField
	Subchunk1Size: WavHeaderField
	AudioFormat: WavHeaderField
	NumChannels: WavHeaderField
	SampleRate: WavHeaderField
	ByteRate: WavHeaderField
	BlockAlign: WavHeaderField
	BitsPerSample: WavHeaderField

	constructor(wavFile: File) {
		if (!wavFile.name.includes('.wav')) {
			throw new Error('file is not a .wav')
		}
		this.ChunkID = new WavHeaderField(0, 4, 'text')
		this.ChunkSize = new WavHeaderField(4, 4, 'decimal')
		this.Format = new WavHeaderField(8, 4, 'text')
		this.Subchunk1ID = new WavHeaderField(12, 4, 'text')
		this.Subchunk1Size = new WavHeaderField(16, 4, 'decimal')
		this.AudioFormat = new WavHeaderField(20, 2, 'decimal')
		this.NumChannels = new WavHeaderField(22, 2, 'decimal')
		this.SampleRate = new WavHeaderField(24, 4, 'decimal')
		this.ByteRate = new WavHeaderField(28, 4, 'decimal')
		this.BlockAlign = new WavHeaderField(32, 2, 'decimal')
		this.BitsPerSample = new WavHeaderField(34, 2, 'decimal')

		this.populateValues(wavFile).then(() => {
			if (this.Format.value !== 'WAVE' || this.ChunkID.value !== 'RIFF') {
				throw new Error('File does not contain valid wav data')
			}
		})
	}

	private async populateValues(wavFile: File) {
		for (let propertyName of Object.keys(this)) {
			const field = this[propertyName as keyof WavHeader]
			const blob = wavFile.slice(field.offset, field.offset + field.size)

			if (field.parseAs == 'text') {
				this[propertyName as keyof WavHeader].value = await blob.text()
			} else if (field.parseAs == 'decimal') {
				const data = new Uint8Array(await blob.arrayBuffer())
				this[propertyName as keyof WavHeader].value = data.reduce(
					(acc, cur, i) => acc + (cur << (i * 8))
				)
			}
		}
	}
}
