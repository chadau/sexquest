import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SextoyService } from './services/sextoy.service';
import { NgTemplateOutlet } from '@angular/common';
import { PlayerSelectionPageComponent } from './pages/player-selection-page/player-selection-page.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		NgTemplateOutlet,
		PlayerSelectionPageComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	title = 'sexgame';
	gameStarted = false;

	constructor() {
	}

	async ngOnInit(): Promise<void> {
	}

	public startGame() {
		this.gameStarted = true;
	}
}
