import { Injectable } from '@angular/core';
import { ButtplugClient, ButtplugClientDevice } from 'buttplug';
// @ts-ignore
import { ButtplugWasmClientConnector } from 'buttplug-wasm/dist/buttplug-wasm.mjs';


const DEFAULT_SCAN_TIME = 3000;

@Injectable({
	providedIn: 'root'
})
export class SextoyService {
	private connector?: ButtplugWasmClientConnector;
	private client?: ButtplugClient;
	private devices: ButtplugClientDevice[] = [];
	private scanning: boolean = false;
	private debug: boolean = false;

	constructor() {

	}

	public async startScanning() {
		this.scanning = true;
		await this.client?.startScanning();
		setTimeout(async () => await this.client?.stopScanning(), DEFAULT_SCAN_TIME);
	}

	public async connect() {
		if (this.client) {
			this.client.connect(this.connector);
		}

		this.client = new ButtplugClient("SexQuest Client");

		// Set up our DeviceAdded/DeviceRemoved event handlers before connecting. If
		// devices are already held to the server when we connect to it, we'll get
		// "deviceadded" events on successful connect.
		this.client.addListener("deviceadded", (device) => this.onDeviceListChanged(device));
		this.client.addListener("deviceremoved", (device) => this.onDeviceListChanged(device));
		this.client.addListener("scanningfinished", () => this.onScanningFinished());

		// Usual embedded connector setup.
		this.connector = new ButtplugWasmClientConnector();
		await this.client.connect(this.connector);

		// Now that everything is set up, we can scan.
		await this.startScanning();
	}

	public async debug_mode() {
		if (!this.debug)
			await ButtplugWasmClientConnector.activateLogging();
	}

	public async vibrate(speed: number, sextoyId?: number, timeout?: number) {
		if (!this.client)
			return;

		if (this.client.devices.length < 1)
			return;

		if (sextoyId)
			await this.devices[sextoyId].vibrate(speed);

		for (var device of this.client.devices) {
			await device.vibrate(speed);
		}

		if (timeout) {
			setTimeout(async () => await this.stop(), timeout * 1000);
		}
	}

	public async stop() {
		for ( var device of this.devices )
			await device.stop();
	}

	public getSextoys(): ButtplugClientDevice[] {
		return this.devices;
	}
	

	public onDeviceListChanged(device: ButtplugClientDevice) {
		this.devices = this.client?.devices ?? [];

		console.log(`Device Connected: ${device.name}`);
		console.log("Client currently knows about these devices:");
		this.client?.devices.forEach((device) => console.log(`- ${device.name}`));
	}

	private onScanningFinished() {
		this.scanning = false;
		console.log("scanning stopped");
	}
}