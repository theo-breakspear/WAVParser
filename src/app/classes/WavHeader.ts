type HeaderField = string | number

export class WavHeader {
	constructor(
		public chunkID: HeaderField,
		public chunkSize: HeaderField,
		public format: HeaderField,
		public subchunk1ID: HeaderField,
		public subchunk1Size: HeaderField,
		public audioFormat: HeaderField,
		public numChannels: HeaderField,
		public sampleRate: HeaderField,
		public byteRate: HeaderField,
		public blockAlign: HeaderField,
		public bitsPerSample: HeaderField
	) {}
}
