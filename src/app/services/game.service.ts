import { Injectable, inject } from '@angular/core';
import { Player } from '../class/player';
import { Card } from '../class/card';
import fs from 'fs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	private playerMale?: Player;
	private playerFemale?: Player;
	private activePlayer?: Player;
	private maleDeck: Card[] = [];
	private femaleDeck: Card[] = [];

	constructor(private http: HttpClient) {
		this.loadDeck("soft");
		this.loadDeck("hot");
		this.loadDeck("chill");

		// We shuffle to be sure to never have the same distribution for a new game
		this.maleDeck = this.shuffle(this.maleDeck);
		this.femaleDeck = this.shuffle(this.femaleDeck);

		console.log(this.maleDeck);
		console.log(this.femaleDeck);
	}

	public setPlayerMale(player: Player) {
		if (!player.name) {
			this.playerMale = undefined;
			return;
		}

		this.playerMale = player;
	}

	public setPlayerFemale(player: Player) {
		if (!player.name) {
			this.playerFemale = undefined;
			return;
		}

		this.playerFemale = player;
	}

	public get currentPlayer() {
		return this.activePlayer;
	}

	public get Male() {
		return this.playerMale;
	}

	public get Female() {
		return this.playerFemale;
	}

	public nextTurn() {
		switch (this.activePlayer?.name) {
			case this.playerMale?.name:
				this.activePlayer = this.playerFemale;
				break;
			case this.playerFemale?.name:
				this.activePlayer = this.playerMale;
				break;
			default:
				this.activePlayer = this.playerMale;
				break;
		}

		console.log("Next turn: ", this.activePlayer?.name);
	}

	public gameisReady(): boolean {
		return this.playerFemale != undefined && this.playerMale != undefined ? true : false;
	}

	private getRandomCard(deck: Card[]): Card {
		const index = Math.floor(Math.random() * deck.length);
		let card: Card = deck[index];

		card.text = this.resolveToken(card.text);
		return card;
	}

	public getMaleCard(): Card {
		return this.getRandomCard(this.maleDeck);
	}

	public getFemaleCard(): Card {
		return this.getRandomCard(this.femaleDeck);
	}

	private getJSON(deckName: string): Observable<any> {
		return this.http.get(`./decks/${deckName}.json`);
	}

	private loadDeck(deckName: string): void {
		this.getJSON(deckName).subscribe((deck) => {
			this.maleDeck.push(...deck.male);
			this.femaleDeck.push(...deck.female);
		});
	}

	private resolveToken(str: string): string {
		type Resolver = (s?: string) => string;
		const tokens = new Map<string, Resolver>([
			["male", () => this.playerMale?.name ?? "Adam"],
			["female", () => this.playerFemale?.name ?? "Eve"]
		]);
		let result = str;

		for (var [token, resolver] of tokens.entries()) {
			result = result.replaceAll(`{${token}}`, resolver());
		}

		return result;
	}

	//https://bost.ocks.org/mike/shuffle/
	public shuffle(array: Card[]): Card[] {
		var m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}
}
