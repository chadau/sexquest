import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../class/card';
import { Action, ActionType } from '../../class/action';
import { SextoyService } from '../../services/sextoy.service';
import { AsyncPipe } from '@angular/common';
import { Subscription, interval, take, timer } from 'rxjs';

@Component({
	selector: 'sexquest-simple-card',
	standalone: true,
	imports: [],
	templateUrl: './simple-card.component.html',
	styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {

	private chronoCancelToken?: Subscription;
	protected action?: Action;
	// State variables
	protected launched: boolean = false;
	protected finished: boolean = false;
	protected isFlipped: boolean = false;
	protected blinked: boolean = false;

	public time: string = "";

	@Input({ required: true })
	public text!: string;
	@Input()
	public cardTitle?: string;

	@Output()
	public launchedChange = new EventEmitter<boolean>();


	constructor(private sextoy: SextoyService) {
	}

	public async flip() {
		// Prevent double activation
		if (this.isFlipped)
			return;

		this.isFlipped = true;
		this.blinked = false;

		if (this.action && (this.action.auto ?? true)) {
			// Let time to flip and read
			setTimeout(async () => await this.startAction(), 1000);
		}
	}

	public flipBack() {
		this.isFlipped = false;
	}

	public toggleBlink(state: boolean) {
		if (this.isFlipped) {
			this.blinked = false;
			return;
		}
		this.blinked = state;
	}

	public setCard(card: Card) {
		this.cardTitle = card.title;
		this.text = card.text;
		this.action = card.action;

		// Reset state variable
		this.launched = false;
		this.finished = false;
	}

	public async startAction() {
		if (!this.action)
			return;

		const time = Math.floor(Math.random() * (this.action.max - this.action.min + 1) + this.action.min);
		console.log("start action for: ", time, "seconds");
		console.log(this.action);

		this.setLaunched(true);

		switch (this.action.type) {
			case ActionType.VIBRATE:
				const speed = this.action.speed ?? Math.random();
				console.log("speed used: ", speed);
				await this.timer(time);
				await this.sextoy.vibrate(speed, undefined, time);
				break;

			case ActionType.CHRONO:
				await this.timer(time);
				break;

			default:
				break;
		}
	}

	public cancelAction() {
		if (!this.chronoCancelToken)
			return;

		console.log("action finished");
		this.chronoCancelToken.unsubscribe();
		this.chronoCancelToken = undefined;
		this.setLaunched(false);
		this.finished = true;
		this.time = "";
	}

	private setLaunched(value: boolean) {
		this.launched = value;
		this.launchedChange.emit(this.launched);
	}

	private secondToChrono(seconds: number) {
		const min: number = Math.floor(seconds / 60);
		const sec: number = seconds - 60 * min;
		let result: string = "";

		return result.concat(min < 10 ? `0${min}` : `${min}`, ':', sec < 10 ? `0${sec}` : `${sec}`);
	}

	private async timer(seconds: number) {
		// +1 to display 00:00 before stopping
		const chrono = interval(1000).pipe(take(seconds + 1));

		this.time = this.secondToChrono(seconds);
		this.chronoCancelToken = chrono.subscribe({
			next: () => {
				seconds--;
				this.time = this.secondToChrono(seconds);
			},
			complete: () => { this.cancelAction() }
		});
	}

	protected async startEvent(e: Event) {
		e.stopPropagation();

		await this.startAction();
	}

}
