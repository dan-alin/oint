<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import HeaderMenu from '../../components/HeaderMenu.svelte';
	import { base } from '$app/paths';
	import type { Appointment, AppointmentForm, FriendData, FriendUser } from '../../models';
	import ImageForm from '../../components/create-appointments/ImageForm.svelte';
	import InvitedFriendsForm from '../../components/create-appointments/InvitedFriendsForm.svelte';
	import DateAndTimeForm from '../../components/create-appointments/DateAndTimeForm.svelte';
	import NameAndDesc from '../../components/create-appointments/NameAndDesc.svelte';
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';
	import { myAppointmentsStore } from '../../stores/apointments';
	import LocationForm from '../../components/create-appointments/LocationForm.svelte';

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		let invitees: FriendUser[] = [];

		if (formData.invitees) {
			invitees = formData.invitees.map((invitee) => invitee.user);
		}

		const newAppointment: Appointment = {
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
			invitees
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

			sessionStorage.getItem('jwt_token') || '',
			false
		);
		myAppointmentsStore.update((appointments) => [...appointments, response]);
		goto('/appointments');
	};

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
			firstRow: 'Dimmi',
			secondRow: 'data e ora',
			paragraph: 'Uomo avvisato, mezzo salvato: non arrivare in ritardo!'
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

	let step = 0;
	let isValidNameForm = true;
	let isValidDateForm = false;

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
			<NameAndDesc
				bind:name={formData.title}
				bind:description={formData.description}
				bind:isValid={isValidNameForm}
				onSubmit={nextStep}
			/>
		{:else if step === 1}
			<DateAndTimeForm
				bind:start_date={formData.start_date}
				bind:end_date={formData.end_date}
				bind:start_time={formData.start_time}
				bind:end_time={formData.end_time}
				bind:acceptLastDay
				bind:isValid={isValidDateForm}
				onSubmit={nextStep}
			/>
		{:else if step === 2}
			<ImageForm
				onSubmit={nextStep}
				bind:image={formData.image}
				bind:can_be_forwarded={formData.can_be_forwarded}
			/>
		{:else if step === 3}
			<LocationForm
				bind:location_selection_type={formData.location_selection_type}
				bind:locations={formData.locations}
				onSubmit={nextStep}
			/>
		{:else if step === 4}
			<InvitedFriendsForm
				bind:invitedFriends={formData.invitees}
				{myFriends}
				onSubmit={() => createAppointment(formData)}
			/>
		{/if}
		<div class=" grid  grid-cols-1 gap-6 md:grid-cols-3">
			<!-- TODO add validation to forms to enable/disable button -->
			<button
				disabled={(step === 0 && !isValidNameForm) ||
					(step === 1 && !isValidDateForm) ||
					(step === 3 && formData.locations.length === 0)}
				class="disabled:disabled-primary btn-primary btn-sm btn h-10  capitalize "
				type="submit"
				form={`${step}-part`}
				>{step === 3 ? 'Ci siamo!' : step === 4 ? 'Invita!' : 'Conferma'}</button
			>
		</div>
	</div>
</div>