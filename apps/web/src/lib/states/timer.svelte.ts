import moment from 'moment';

class TimerState {
	readonly beginTime: number;
	count = $state('0');
	interval: Timer;

	constructor() {
		this.beginTime = Date.now();
		this.interval = setInterval(() => {
			this.update();
		}, 100);
	}

	update() {
		this.count = ((Date.now() - this.beginTime) / 1000).toFixed(1);
	}

	stop() {
		clearInterval(this.interval);
	}
}

export { TimerState };
