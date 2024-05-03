import { Component, OnInit, model, signal } from '@angular/core';
import { SextoyService } from '../../services/sextoy.service';
import { NgTemplateOutlet } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Player } from '../../class/player';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sexquest-player-selection-page',
  standalone: true,
  imports: [NgTemplateOutlet, FormsModule],
  templateUrl: './player-selection-page.component.html',
  styleUrl: './player-selection-page.component.scss'
})
export class PlayerSelectionPageComponent implements OnInit{
	public playerMale: Player = new Player("");
	public playerFemale: Player = new Player("");

	constructor(private sextoy: SextoyService, private game: GameService, private router: Router) {
		
	}
	ngOnInit(): void {
	}

	public async addSextoy() {
		await this.sextoy.connect();
	}

	public get sextoys() {
		return this.sextoy.getSextoys();
	}

	public startGame() {
		this.game.setPlayerMale(this.playerMale);
		this.game.setPlayerFemale(this.playerFemale);

		if (this.game.gameisReady()) {
			console.log("Game is ready to start");
			this.game.nextTurn();
			this.router.navigateByUrl("/game");
		}
	}
}
