import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-menu-page',
  standalone: true,
  imports: [],
  templateUrl: './start-menu-page.component.html',
  styleUrl: './start-menu-page.component.scss'
})
export class StartMenuPageComponent {

	constructor(private router: Router) {

	}

	public startGame() {
		this.router.navigateByUrl("/selection");
	}
}
