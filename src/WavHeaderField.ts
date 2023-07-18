export class WavHeaderField {
	constructor(
		readonly offset: number,
		readonly size: number,
		readonly parseAs: 'text' | 'decimal'
	) {}

	public value: number | string | null = null
}
