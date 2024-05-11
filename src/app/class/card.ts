import { inject } from "@angular/core";
import { Action } from "./action";
import { GameService } from "../services/game.service";
import { SextoyService } from "../services/sextoy.service";

export interface Card {
	title?: string;
	text: string;
	once?: boolean;
	action?: Action;
}

export class CardController {
	private _card: Card;
	private _sextoy?: SextoyService;
	private _deck: Card[];
	private _index: number;

	constructor(index: number, card: Card, deck: Card[]) {
		this._index = index;
		this._card = card;
		this._deck = deck;
	}

	get title() {
		return this._card.title;
	}

	get text() {
		return this._card.text;
	}

	get action() {
		return this._card.action;
	}

	public setSextoyService(sextoy: SextoyService) {
		this._sextoy = sextoy;
	}

	public async stop() {
		await this._sextoy?.stop();
	}

	public activate() {
		if (this._card.once ?? false)
			this._deck.splice(this._index, 1);
	}
}
