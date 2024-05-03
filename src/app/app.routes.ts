import { Routes } from '@angular/router';
import { PlayerSelectionPageComponent } from './pages/player-selection-page/player-selection-page.component';
import { StartMenuPageComponent } from './pages/start-menu-page/start-menu-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';

export const routes: Routes = [
	{ path: '', component: StartMenuPageComponent},
	{ path: 'selection', component: PlayerSelectionPageComponent },
	{ path: 'game', component: GamePageComponent}
];
