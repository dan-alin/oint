<script lang="ts">
	import { myAppointmentsStore } from '../stores/apointments';
	import { apiCall } from '../utils/api-call';
	import fileToBase64 from '../utils/to-base64';
	import CreateAppointmentModal from './create-appointment-modal/CreateAppointmentModal.svelte';
	import { page } from '$app/stores';
	import type { Appointment, AppointmentForm } from '../models';
	let unique = {};

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		let newAppointment: Appointment = {
			title: formData.title,
			description: formData.description,
			start_date: new Date(`${formData.start_date} ${formData.start_time}`).toISOString(),
			end_date: new Date(`${formData.end_date} ${formData.end_time}`).toISOString(),
			image,
			can_be_forwarded: formData.can_be_forwarded,
			locations: formData.locations,
			location_selection_type: formData.location_selection_type
		};
		if (newAppointment.location_selection_type === 'multi') {
			if (formData.location_selection_deadline_date && formData.location_selection_deadline_time) {
				newAppointment.location_selection_deadline = new Date(`${formData.location_selection_deadline_date} ${formData.location_selection_deadline_time}`).toISOString();
			} else if (formData.location_selection_deadline_date) {
				newAppointment.location_selection_deadline = new Date(`${formData.location_selection_deadline_date}`).toISOString();
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
		closeModal();
	};

	const closeModal = () => {
		const modal = document.getElementById('create-appointment-modal');
		modal?.click();
		restart();
	};

	// function to restart the component by setting a new unique key
	const restart = () => {
		unique = {};
	};
</script>

<!-- toggle close modal from card when appointment is created -->

<div class="navbar bg-base-200  w-screen  px-6  h-24   z-50">
	<div class="navbar-start  text-xs justify-evenly">
		<a
			class=" h-24 flex items-center justify-center w-16"
			class:text-primary={$page.url.pathname.startsWith('/appointments')}
			href="/appointments"
		>
			Eventi</a
		>
		<a
			class=" h-24 flex items-center justify-center w-16"
			class:text-primary={$page.url.pathname.startsWith('/friends-list')}
			href="/friends-list"
		>
			Amici</a
		>
	</div>
	<div class="navbar-center">
		<!-- modal -->
		<label for="create-appointment-modal" class="btn btn-primary btn-circle ">+</label>
	</div>
	<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

	<!-- restart the component after closing it to clean form and steps -->
	{#key unique}
		<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
	{/key}

	<div class="navbar-end text-xs justify-evenly">
		<a
			class=" h-24 flex items-center justify-center w-16"
			class:text-primary={$page.url.pathname.startsWith('/search-friends')}
			href="/search-friends"
		>
			Aggiungi</a
		>
		<a
			class=" h-24 flex items-center justify-center w-16"
			class:text-primary={$page.url.pathname.startsWith('/friend-requests')}
			href="/friend-requests"
		>
			Requests</a
		>
	</div>
</div>
