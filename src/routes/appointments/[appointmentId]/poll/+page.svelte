<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '../../../../components/Icon.svelte';
	import ModalSuccess from '../../../../components/ModalSuccess.svelte';
	import { Endpoints, Icons, Routes } from '../../../../enums';
	import type { Appointment } from '../../../../models';
	import type { Countdown } from '../../../../models/time';
	import { apiCall } from '../../../../utils/api-call';
	import { updateCountDown } from '../../../../utils/time';

	export let data: { appointment: Appointment };
	let { appointment } = data;

	const getLocationsId = () =>
		appointment.locations.filter((l) => l.i_voted_this_location).map((l) => l.id);

	const refreshLocations = () => {
		selectedLocations = getLocationsId();
		initialLocations = getLocationsId();
	};

	let selectedLocations: (number | undefined)[] | undefined;
	let initialLocations: (number | undefined)[] | undefined;
	$: {
		appointment;
		refreshLocations();
	}

	const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'];
	$: iVoted = appointment.locations.some((l) => l.i_voted_this_location);
	$: totVotes = appointment.locations.reduce((acc, curr) => acc + (curr.votes?.length ?? 0), 0);
	$: votesPercents = appointment.locations.map((location, i) => {
		const votes = location.votes?.length ?? 0;
		return {
			percent: Math.round((votes / totVotes) * 100),
			color: colors[i % colors.length]
		};
	});
	let modalOpened = false;
	let countdown: Countdown | undefined;
	let tokensToShow: Record<keyof Countdown, boolean> | undefined;
	let countdownExpired = false;
	updateCountDown(appointment, (newCountdown, newTokensToShow, newCountdownExpired) => {
		countdownExpired = newCountdownExpired;
		if (countdownExpired) return;
		countdown = newCountdown;
		tokensToShow = newTokensToShow;
	});

	export const voteLocations = async () => {
		const votesToAdd = selectedLocations?.filter(
			(locationId) => !initialLocations?.includes(locationId)
		);
		const votesToRemove = initialLocations?.filter(
			(locationId) => !selectedLocations?.includes(locationId)
		);

		if ((votesToAdd && votesToAdd.length > 0) || (votesToRemove && votesToRemove.length > 0)) {
			const newAppointment = await apiCall<Appointment>(
				Endpoints.CHANGE_VOTES,
				'post',
				'Location votate',
				JSON.stringify({
					appointmentId: appointment.id,
					votesToAdd,
					votesToRemove
				}),
				sessionStorage.getItem('jwt_token') || ''
			);

			appointment = newAppointment;
		}

		modalOpened = true;
	};
</script>

<section class="page-container">
	<h1>
		<p class="text-xl text-disabled">{countdownExpired ? 'il tempo è' : 'Vota la tua'}</p>
		<div class="flex justify-between">
			<p class="text-2xl font-bold">{countdownExpired ? 'Scaduto!' : 'Locassshion'}</p>
			<a href={`${Routes.APPOINTMENTS}/${appointment.id}`}>
				<Icon icon={Icons.CLOSE} />
			</a>
		</div>
	</h1>

	<div class="mt-8 text-sm">
		<p>
			{countdownExpired
				? "Notizia dell'ultima ora: i partecipanti hanno finalmente deciso dove andare! Hanno lanciato una monetina, fatto una danza tribale e persino consultato un oracolo. Alla fine, la location scelta è...."
				: 'Scegli tra queste possibilità, puoi anche votarne più di una! Hai ancora del tempo a disposizione:'}
		</p>

		<!-- Countdown -->
		{#if !countdownExpired}
			<div class="mt-4 flex justify-center font-bold text-primary">
				<Icon icon={Icons.CLOCK} />
				{#if countdown && tokensToShow}
					<span class="countdown">
						<!-- days -->
						{#if tokensToShow.days}<span style={'--value:' + countdown.days} />d{/if}
						<!-- hours -->
						{#if tokensToShow.hours}<span style={'--value:' + countdown.hours} />h{/if}
						<!-- minutes -->
						{#if tokensToShow.minutes}<span style={'--value:' + countdown.minutes} />m{/if}
						<!-- seconds -->
						{#if tokensToShow.seconds}<span style={'--value:' + countdown.seconds} />s{/if}
					</span>
				{/if}
			</div>
		{/if}

		<!-- Locations -->
		<div class="mt-4 flex flex-col">
			{#each appointment.locations as location, i}
				<div class="mt-4 flex items-center rounded bg-light-gray/20 text-xs leading-[14px] ">
					<div class="flex rounded bg-light-gray/20 p-3">
						<input
							id={'check-' + location.id}
							bind:group={selectedLocations}
							disabled={countdownExpired}
							value={location.id}
							type="checkbox"
							class="checkbox-secondary checkbox checkbox-xs rounded border-disabled bg-background"
						/>
					</div>
					<label for={'check-' + location.id} class="relative h-full grow py-1.5 pl-4">
						{#if iVoted}
							<div
								class={'content absolute top-0 left-0 block h-full rounded-r opacity-10'}
								style:width={votesPercents[i].percent + '%'}
								style:background-color={'rgb(var(--color-' + votesPercents[i].color + '))'}
							/>
						{/if}
						<p class="font-bold">
							{location.name}
						</p>
						<p>
							{location.address}
						</p>
					</label>
				</div>
			{/each}
		</div>
	</div>
	<!-- Actions -->
	<div class="mt-auto">
		{#if countdownExpired}
			<a
				href={`${Routes.APPOINTMENTS}/${appointment.id}`}
				class="btn-primary btn-sm btn h-10 w-full"
			>
				Vai all’evento!
			</a>
		{:else}
			<button class="btn-primary btn-sm btn h-10 w-full" on:click={voteLocations}
				>{iVoted ? 'Modifica voto' : 'Vota'}</button
			>
		{/if}
	</div>
</section>

<!-- Modals -->
<ModalSuccess
	id="modal-success"
	title="Locassshion interessante"
	subTitle="...ma nulla è ancora deciso, gli altri voti potrebbero confermare o ribaltare la situazione!"
	confirmBtnLabel="Torna all’evento"
	onConfirm={() => {
		goto(`${Routes.APPOINTMENTS}/${appointment.id}`);
	}}
	bind:modalOpened
/>
