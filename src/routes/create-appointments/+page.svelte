<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import HeaderMenu from '../../components/HeaderMenu.svelte';
	import DateAndTimeForm from '../../components/create-appointments/DateAndTimeForm.svelte';
	import ImageForm from '../../components/create-appointments/ImageForm.svelte';
	import InvitedFriendsForm from '../../components/create-appointments/InvitedFriendsForm.svelte';
	import LocationForm from '../../components/create-appointments/LocationForm.svelte';
	import NameAndDesc from '../../components/create-appointments/NameAndDesc.svelte';
	import type {
		AppointmentForm,
		Appointment,
		FriendData,
		FriendUser,
		AppointmentRequest
	} from '../../models';
	import { myAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		let invitees: FriendUser[] = [];

		if (formData.invitees) {
			invitees = formData.invitees.map((invitee) => invitee.user);
		}
		formData.start_date = formData.start_date.split('/').reverse().join('-');
		if (formData.end_date) {
			formData.end_date = formData.end_date.split('/').reverse().join('-');
		}
		formData.location_selection_deadline_date = formData.location_selection_deadline_date
			.split('/')
			.reverse()
			.join('-');

		const newAppointment: AppointmentRequest = {
			title: formData.title,
			description: formData.description,
			start_date: new Date(`${formData.start_date} ${formData.start_time}`).toISOString(),
			end_date: new Date(
				`${formData.end_date || formData.start_date} ${formData.end_time}`
			).toISOString(),
			image,
			can_be_forwarded: formData.can_be_forwarded,
			locations: formData.locations,
			location_selection_type: formData.location_selection_type,
			location_selection_deadline: formData.location_selection_deadline_date,
			invitees,
			creator_id: $userStore.id
		};

		if (newAppointment.location_selection_type === 'multi') {
			if (formData.location_selection_deadline_date && formData.location_selection_deadline_time) {
				newAppointment.location_selection_deadline = new Date(
					`${formData.location_selection_deadline_date} ${formData.location_selection_deadline_time}`
				).toISOString();
			} else if (formData.location_selection_deadline_date) {
				newAppointment.location_selection_deadline = new Date(
					`${formData.location_selection_deadline_date}`
				).toISOString();
			}
		}

		const response: Appointment = await apiCall(
			'/api/create-appointment',
			'post',
			'',
			JSON.stringify(newAppointment),

			sessionStorage.getItem('jwt_token') || ''
		);
		myAppointmentsStore.update((appointments) => [...appointments, response]);
		goto('/appointments');
	};

	let previousPage: string = base;
	afterNavigate(({ from }) => {
		if (!from || from?.url.pathname.includes('/create-appointments')) {
			previousPage = '/appointments';
		} else {
			previousPage = from?.url.pathname || previousPage;
		}
	});

	export let data: {
		myFriends: FriendData[];
	};
	let { myFriends } = data;

	const pageHeaders = [
		{
			firstRow: 'Organizza un',
			secondRow: 'nuovo evento!',
			paragraph: 'Non aspettare il divertimento, crealo! \nInizia a stupire tutti i tuoi amici'
		},
		{
			firstRow: 'Dimmi',
			secondRow: 'data e ora',
			paragraph: 'Uomo avvisato, mezzo salvato: \nnon arrivare in ritardo!'
		},
		{
			firstRow: 'Aggiungi',
			secondRow: "l'immagine giusta",
			paragraph:
				'Un evento senza l`immagine è come un cielo senza \nstelle... scegli quella giusta!'
		},
		{
			firstRow: 'E ora...',
			secondRow: 'scegli la locassshion!',
			paragraph: 'Aggiungi un tocco di magia al tuo evento con una \nlocation da 10.'
		},
		{
			firstRow: 'Invita tutti',
			secondRow: 'i tuoi amici!',
			paragraph:
				'Attento a chi inviti... ricordati di scegliere anche chi \nrimane a mettere a posto!'
		}
	];

	let step = 0;
	let isValidNameForm = true;
	let isValidDateForm = false;
	let isValidLocationForm = false;

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
		location_selection_deadline_time: '',
		invitees: []
	};

	const nextStep = () => step++;
</script>

<svelte:head>
	<title>Crea evento</title>
	<meta name="description" content="create events form" />
</svelte:head>

<div class="flex h-full flex-col bg-background px-6 pt-8 pb-10">
	<div class="flex flex-col gap-4 ">
		<HeaderMenu
			firstRow={pageHeaders[step].firstRow}
			secondRow={pageHeaders[step].secondRow}
			goto={previousPage}
		/>

		<p class="whitespace-pre text-sm">
			{pageHeaders[step].paragraph}
		</p>

		<div class="relative flex h-24 w-full items-center justify-center">
			<img class="h-24" src="/icons/colored_lines_bg.svg" alt="colored lines background" />
			<img class="absolute z-10 h-12" src={`/icons/wiz-${step + 1}.svg`} alt="step" />
		</div>
		<!-- TODO accept until the day before -->
		{#if step === 0}
			<NameAndDesc
				bind:name={formData.title}
				bind:description={formData.description}
				bind:isValid={isValidNameForm}
				on:submit={nextStep}
			/>
		{:else if step === 1}
			<DateAndTimeForm
				bind:start_date={formData.start_date}
				bind:end_date={formData.end_date}
				bind:start_time={formData.start_time}
				bind:end_time={formData.end_time}
				bind:acceptLastDay
				bind:isValid={isValidDateForm}
				on:submit={nextStep}
			/>
		{:else if step === 2}
			<ImageForm
				on:submit={nextStep}
				bind:image={formData.image}
				bind:can_be_forwarded={formData.can_be_forwarded}
			/>
		{:else if step === 3}
			<LocationForm
				bind:location_selection_type={formData.location_selection_type}
				bind:locations={formData.locations}
				bind:location_selection_deadline_date={formData.location_selection_deadline_date}
				bind:location_selection_deadline_time={formData.location_selection_deadline_time}
				bind:isValid={isValidLocationForm}
				startDate={formData.start_date}
				startTime={formData.start_time}
				on:submit={nextStep}
			/>
		{:else if step === 4}
			<InvitedFriendsForm
				bind:invitedFriends={formData.invitees}
				{myFriends}
				on:submit={() => createAppointment(formData)}
			/>
		{/if}
	</div>
	<button
		disabled={(step === 0 && !isValidNameForm) ||
			(step === 1 && !isValidDateForm) ||
			(step === 3 && !isValidLocationForm)}
		class="disabled:disabled-primary btn-primary btn-sm btn mt-auto h-10 capitalize"
		type="submit"
		form={`${step}-part`}>{step === 3 ? 'Ci siamo!' : step === 4 ? 'Invita!' : 'Conferma'}</button
	>
</div>
