<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import HeaderMenu from '../../components/HeaderMenu.svelte';
	import { base } from '$app/paths';
	import type { AppointmentForm, FriendData } from '../../models';
	import DescAndTimeForm from '../../components/create-appointments/DescAndTimeForm.svelte';
	import ImageForm from '../../components/create-appointments/ImageForm.svelte';
	import InvitedFriendsForm from '../../components/create-appointments/InvitedFriendsForm.svelte';

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	export let data: {
		myFriends: FriendData[];
	};
	let { myFriends } = data;

	const pageHeaders = [
		{
			firstRow: 'Organizza un',
			secondRow: 'nuovo evento!',
			paragraph: 'Non aspettare il divertimento, crealo! Inizia a stupire tutti i tuoi amici'
		},
		{
			firstRow: 'Aggiungi',
			secondRow: "l'immagine giusta",
			paragraph: 'Un evento senza l`immagine è come un cielo senza stelle... scegli quella giusta!'
		},
		{
			firstRow: 'E ora...',
			secondRow: 'scegli la locassshion!',
			paragraph: 'Aggiungi un tocco di magia al tuo evento con una location da 10.'
		},
		{
			firstRow: 'Invita tutti',
			secondRow: 'i tuoi amici!',
			paragraph:
				'Attento a chi inviti... ricordati di scegliere anche chi rimane a mettere a posto!'
		}
	];

	let step = 3;
	let isValidDateForm = false;

	let invitedFriends: FriendData[] = [];

	let acceptLastDay = false;
	let formData: AppointmentForm = {
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		can_be_forwarded: false,
		image: undefined,
		location_selection_type: 'single',
		locations: [],
		location_selection_deadline_date: '',
		location_selection_deadline_time: ''
	};

	const nextStep = () => step++;
</script>

<svelte:head>
	<title>Crea evento</title>
	<meta name="description" content="create events form" />
</svelte:head>

<div class="h-full bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-4 ">
		<HeaderMenu
			firstRow={pageHeaders[step].firstRow}
			secondRow={pageHeaders[step].secondRow}
			goto={previousPage}
		/>

		<p class="text-sm">
			{pageHeaders[step].paragraph}
		</p>

		<div class="h-24 w-full bg-green-100" />
		<!-- TODO accept until the day before -->
		{#if step === 0}
			<DescAndTimeForm
				onSubmit={nextStep}
				bind:name={formData.title}
				bind:description={formData.description}
				bind:start_date={formData.start_date}
				bind:end_date={formData.end_date}
				bind:start_time={formData.start_time}
				bind:end_time={formData.end_time}
				bind:acceptLastDay
				bind:isValid={isValidDateForm}
			/>
		{:else if step === 1}
			<ImageForm
				onSubmit={nextStep}
				bind:image={formData.image}
				bind:can_be_forwarded={formData.can_be_forwarded}
			/>
		{:else if step === 2}
			step 3
		{:else if step === 3}
			<InvitedFriendsForm bind:invitedFriends {myFriends} onSubmit={nextStep} />
		{/if}
		<div class=" grid  grid-cols-1 gap-6 md:grid-cols-3">
			<!-- TODO add validation to forms to enable/disable button -->
			<button
				disabled={step === 0 && !isValidDateForm}
				class="disabled:disabled-primary btn-primary btn-sm btn h-10  capitalize "
				type="submit"
				form={`${step}-part`}
				>{step === 2 ? 'Ci siamo!' : step === 3 ? 'Invita!' : 'Conferma'}</button
			>
		</div>
	</div>
</div>

<style>
</style>
