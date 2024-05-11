import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { SimpleCardComponent } from '../../cards/simple-card/simple-card.component';
import { Card } from '../../class/card';
import { SextoyService } from '../../services/sextoy.service';

@Component({
	selector: 'app-game-page',
	standalone: true,
	imports: [SimpleCardComponent],
	templateUrl: './game-page.component.html',
	styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements AfterViewInit {
	
	@ViewChild("choiceOne")
	private choiceOne!: SimpleCardComponent;
	@ViewChild("choiceTwo")
	private choiceTwo!: SimpleCardComponent;

	protected actionIsWorking: boolean = false;

	constructor(public game: GameService, private sextoy: SextoyService) {
	}

	ngAfterViewInit(): void {
		this.setCards();
	}

	private setCards() {
		const cards = this.game.shuffle([
			this.game.getMaleCard(),
			this.game.getFemaleCard()
		]);

		this.choiceOne.setCard(cards[0]);
		this.choiceTwo.setCard(cards[1]);
	}

	public async nextTurn() {
		this.choiceOne.flipBack();
		this.choiceTwo.flipBack();

		setTimeout(() => this.setCards(), 500);
		this.game.nextTurn();
	}

	public async skip() {
		this.choiceOne.cancelAction();
		this.choiceTwo.cancelAction();
	}

	protected cardIsActivated(launched: boolean) {
		this.actionIsWorking = launched;
	}
}
