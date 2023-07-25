import { readFile } from 'node:fs/promises'
import { WavHeaderFactory } from '../src/app/classes/WavHeaderFactory'

const WAV_PATH = `${__dirname}/media/sin.wav`
const CORRUPTED_WAV_PATH = `${__dirname}/media/brokenSin.wav`

describe('WavHeaderFactory', () => {
	test('create method returns WavHeader with correct properties for given wav file', async () => {
		const blob = new Blob([await readFile(WAV_PATH)])
		const wavHeader = await new WavHeaderFactory().create(blob as File)
		expect(wavHeader.audioFormat).toBe(1)
		expect(wavHeader.chunkID).toBe('RIFF')
		expect(wavHeader.chunkSize).toBe(176436)
		expect(wavHeader.format).toBe('WAVE')
		expect(wavHeader.subchunk1ID).toBe('fmt ')
		expect(wavHeader.subchunk1Size).toBe(16)
		expect(wavHeader.audioFormat).toBe(1)
		expect(wavHeader.numChannels).toBe(1)
		expect(wavHeader.sampleRate).toBe(44100)
		expect(wavHeader.byteRate).toBe(88200)
		expect(wavHeader.blockAlign).toBe(2)
		expect(wavHeader.bitsPerSample).toBe(16)
	})

	test('create method throws error if given file does not contain valid wav data', async () => {
		const blob = new Blob([await readFile(CORRUPTED_WAV_PATH)])
		expect(async () => {
			try {
				await new WavHeaderFactory().create(blob as File)
			} catch (e) {
				expect(e).toMatch('File does not contain valid wave data')
			}
		})
	})
})
