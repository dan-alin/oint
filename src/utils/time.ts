import { onDestroy } from 'svelte';
import type { Appointment } from '../models';
import type { Countdown } from '../models/time';
import { identity } from 'svelte/internal';

export const getDate = (date: Date) => {
	const strDate = new Date(date).toLocaleDateString('it-IT', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	});
	return `${strDate[0].toUpperCase()}${strDate.substring(1, 7)}${strDate
		.substring(7, 10)
		.toUpperCase()}${strDate.substring(10)}`;
};

export const getTime = (date: Date) => {
	return new Date(date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
};

export const getTimeDifference = (start: Date, end: Date): Countdown => {
	const timeDiff = end.getTime() - start.getTime();
	const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
	const diffHours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
	const diffMinutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
	const diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

	return {
		days: diffDays,
		hours: diffHours,
		minutes: diffMinutes,
		seconds: diffSeconds
	};
};

/**
 * Hook-like function to calculate the countdown and the tokensToShow object.
 * it uses an interval to update the countdown every second, and it clears the interval on destroy.
 * You need to pass the updater function to update the countdown.
 * @param appointment appointment to get the deadline from
 * @param updater updater function to update the countdown and the tokensToShow object
 */
export const updateCountDown = (
	appointment: Appointment,
	updater: (
		_value: Countdown,
		_tokensToShow: Record<keyof Countdown, boolean>,
		_countdownExpired: boolean
	) => void
) => {
	const deadline = new Date(appointment.location_selection_deadline as string);

	const { countdown, tokensToShow, countdownExpired } = calcCountDownAndTokensToShow(deadline);
	updater(countdown, tokensToShow, countdownExpired);
	// update every second
	const interval = setInterval(() => {
		const { countdown, tokensToShow, countdownExpired } = calcCountDownAndTokensToShow(deadline);
		updater(countdown, tokensToShow, countdownExpired);
		countdownExpired && clearInterval(interval);
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
};

const calcCountDownAndTokensToShow = (deadline: Date) => {
	const countdown = getTimeDifference(new Date(), deadline);
	const tokensToShow = {
		days: false,
		hours: false,
		minutes: false,
		seconds: false
	};
	tokensToShow.days = !!countdown.days;
	tokensToShow.hours = !!countdown.days || (!countdown.days && !!countdown.hours);
	tokensToShow.minutes = Object.values(tokensToShow).filter(identity).length < 2;
	tokensToShow.seconds = Object.values(tokensToShow).filter(identity).length < 2;

	const countdownExpired = Object.values(countdown).every((value) => value <= 0);
	return { countdown, tokensToShow, countdownExpired };
};
