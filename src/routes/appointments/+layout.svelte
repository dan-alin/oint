<script lang="ts">
	import CreateAppointmentModal from '../../components/CreateAppointmentModal.svelte';
	import type { Appointment } from '../../models';
	import type { AppointmentForm } from '../../models/appointment';
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';

	export let data: { appointments: Appointment[] };
	let { appointments } = data;

	// unique key for modal component
	let unique = {};

	const createAppointment = async (formData: AppointmentForm) => {
		console.log(formData);
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
				address: formData.address,
				locations: formData.locations
			};

			const response: Appointment = await apiCall(
				'/api/create-appointment',
				'post',
				'Appuntamento creato',
				JSON.stringify(newAppointment),

				sessionStorage.getItem('jwt_token') || ''
			);
			appointments = [...appointments, response];

			closeModal();
		} catch (error) {}
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

<svelte:head>
	<title>Appointments</title>
	<meta name="description" content="A section to find or create events" />
</svelte:head>

<slot />
<div
	class="flex shadow-md justify-center items-center h-24  w-full  bottom-0 left-0 bg-base-200 rounded-t-2xl z-50"
>
	<label for="create-appointment-modal" class="btn btn-circle">+</label>
</div>
<!-- toggle close modal from card when appointment is created -->
<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

<!-- restart the component after closing it to clean form and steps -->
{#key unique}
	<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
{/key}
