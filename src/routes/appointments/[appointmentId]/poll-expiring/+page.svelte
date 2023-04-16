<script lang="ts">
	import Icon from '../../../../components/Icon.svelte';
	import { Icons, Routes } from '../../../../enums';
	import type { Appointment } from '../../../../models';
	import type { Countdown } from '../../../../models/time';
	import { updateCountDown } from '../../../../utils/time';

	export let data: { appointment: Appointment };
	let { appointment } = data;

	// per l'animazione in w2 serve la creation_date, il radial progress di daisy sarà a 100% quando il tempo rimasto è == a creation_date
	// e sarà 0% quando il tempo rimasto è == 0

	let countdown: Countdown | undefined;
	let tokensToShow: Record<keyof Countdown, boolean> | undefined;
	let countdownExpired = false;
	updateCountDown(appointment, (newCountdown, newTokensToShow, newCountdownExpired) => {
		countdownExpired = newCountdownExpired;
		if (countdownExpired) return;
		countdown = newCountdown;
		tokensToShow = newTokensToShow;
	});

	$: activeClass = countdownExpired
		? 'bg-error border-error/30'
		: 'border-secondary/30 bg-secondary';
</script>

<section class="page-container">
	<!-- Close btn -->
	<div class="flex flex-row-reverse">
		<a href={`${Routes.APPOINTMENTS}/${appointment.id}`}>
			<Icon icon={Icons.CLOSE} />
		</a>
	</div>
	<!-- Timer -->
	<div
		class=" {activeClass} -ml-28 box-content flex h-[25rem] w-[25rem] items-center justify-center rounded-full border-[1.5rem] border-solid bg-clip-padding text-7xl font-bold text-white"
	>
		{#if countdownExpired}
			<span class="-ml-4 w-1/2 text-6xl"> Tempo Scaduto! </span>
		{:else if countdown && tokensToShow}
			<!-- days -->
			{#if tokensToShow.days}
				<span class="countdown">
					<span style={'--value:' + countdown.days} />
				</span>
				<span class="text-3xl">d</span>
			{/if}
			<!-- hours -->
			{#if tokensToShow.hours}
				<span class="countdown">
					<span style={'--value:' + countdown.hours} />
				</span>
				<span class="text-3xl">h</span>{/if}
			<!-- minutes -->
			{#if tokensToShow.minutes}
				<span class="countdown">
					<span style={'--value:' + countdown.minutes} />
				</span>
				<span class="text-3xl">m</span>
			{/if}
			<!-- seconds -->
			{#if tokensToShow.seconds}
				<span class="countdown">
					<span style={'--value:' + countdown.seconds} />
				</span>
				<span class="text-3xl">s</span>
			{/if}
		{/if}
	</div>
	<h1 class="mt-7 text-3xl font-bold">
		<span> {countdownExpired ? "E' finito" : 'Ti rimane'} </span>
		<p class="text-2xl">{countdownExpired ? 'il tempo per votare!' : 'poco tempo!'}</p>
	</h1>
	<h2 class="mt-4">
		{countdownExpired
			? 'Dopo una lunga e intensa campagna elettorale, la location vincitrice è stata scelta. Che la festa abbia inizio!'
			: 'Corri a dire la tua: è in corso la missione di trovare la location perfetta!'}
	</h2>
	<!-- Actions -->
	<a
		href={`${Routes.APPOINTMENTS}/${appointment.id}${Routes.POLL}`}
		class="btn-primary btn-sm btn mt-auto h-10"
	>
		{countdownExpired ? 'Vedi il sondaggio' : 'Scegli locassshion'}
	</a>
</section>
