export enum ActionType {
	VIBRATE = "VIBRATE",
	CHRONO  = "CHRONO"
};

export interface Action {
	type: ActionType;
	speed: number;
	min: number;
	max: number;
	auto?: boolean;
}
