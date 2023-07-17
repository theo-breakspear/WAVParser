export const wavHeaderFormat = [
	{
		name: 'ChunkID',
		offset: 0,
		size: 4,
		type: 'string',
	},
	{
		name: 'ChunkSize',
		offset: 4,
		size: 4,
		type: 'decimal',
	},
	{
		name: 'Format',
		offset: 8,
		size: 4,
		type: 'decimal',
	},
	{
		name: 'Subchunk1ID',
		offset: 12,
		size: 4,
		type: 'string',
	},
	{
		name: 'Subchunk1Size',
		offset: 16,
		size: 4,
		type: 'decimal',
	},
	{
		name: 'AudioFormat',
		offset: 20,
		size: 2,
		type: 'decimal',
	},
	{
		name: 'NumChannels',
		offset: 22,
		size: 2,
		type: 'decimal',
	},
	{
		name: 'SampleRate',
		offset: 24,
		size: 4,
		type: 'decimal',
	},
	{
		name: 'ByteRate',
		offset: 28,
		size: 4,
		type: 'decimal',
	},
	{
		name: 'BlockAlign',
		offset: 32,
		size: 2,
		type: 'decimal',
	},
	{
		name: 'BitsPerSample',
		offset: 34,
		size: 2,
		type: 'decimal',
	},
]
