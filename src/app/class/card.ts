import { Action } from "./action";

export interface Card {
	title?: string;
	text: string;
	action?: Action;
}
