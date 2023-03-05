<script lang="ts">
	import type { Appointment, AppointmentForm, Occurrence } from '../models/appointment';
	import { myAppointmentsStore } from '../stores/apointments';
	import { apiCall } from '../utils/api-call';
	import fileToBase64 from '../utils/to-base64';
	import CreateAppointmentModal from './create-appointment-modal/CreateAppointmentModal.svelte';

	let unique = {};

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		try {
			const newAppointment = {
				title: formData.title,
				description: formData.description,
				start_date: new Date(`${formData.start_date} ${formData.start_time}`).toISOString(),
				end_date: new Date(`${formData.end_date} ${formData.end_time}`).toISOString(),
				image,
				can_be_forwarded: formData.can_be_forwarded,
				locations: formData.locations
			};

			const response: Occurrence = await apiCall(
				'/api/create-appointment',
				'post',
				'',
				JSON.stringify(newAppointment),

				sessionStorage.getItem('jwt_token') || '',
				false
			);
			myAppointmentsStore.update((appointments) => [...appointments, response]);

			closeModal();
		} catch (error) {
			console.log(error);
		}
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

<div class="navbar bg-base-200  w-screen  px-6  h-24  border-t-10  z-50">
	<div class="navbar-start gap-6 text-xs justify-evenly">
		<a href="/appointments"> Eventi</a>
		<a href="/friends-list"> Amici</a>
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

	<div class="navbar-end gap-6 text-xs justify-evenly">
		<a href="/search-friends"> Aggiungi</a>
		<a href="/friend-requests"> Requests</a>
	</div>
</div>
