

export class Player {
	public name: string;
	public sextoyId?: number = -1;

	constructor(name: string) {
		this.name = name;
	}

	public setSextoy(id: number) {
		this.sextoyId = id;
	}
}
