<script lang="ts">
	import { goto } from '$app/navigation';
	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import CreateAppointmentModal from '../../components/CreateAppointmentModal.svelte';
	import type { Appointment } from '../../models';
	import type { AppointmentForm, DeletedAppointment } from '../../models/appointment';
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';

	export let data: { appointments: Appointment[] };
	let { appointments } = data;

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

	const cancelAppointment = async (appointmentId: number) => {
		try {
			const response: DeletedAppointment = await apiCall(
				'/api/delete-appointment',
				'delete',
				'Appuntamento eliminato',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || ''
			);
			appointments = appointments.filter((event) => event.id !== response.appointmentId);
		} catch (error) {}
	};

	const goToDetail = (id: number) => {
		goto(`appointments/${id}`, { state: appointments.find((item) => item.id === id) });
	};
</script>

<div class="flex flex-col gap-6  md:grid md:grid-cols-2 xl:grid-cols-3 pb-6 h-full ">
	{#each appointments as appointment}
		<AppointmentCard {appointment} deleteAction={cancelAppointment} action={goToDetail} />
	{/each}
</div>

<div
	class="flex shadow-md justify-center items-center h-24  w-screen fixed bottom-0 left-0  bg-base-200 rounded-t-2xl z-40"
>
	<label for="create-appointment-modal" class="btn btn-circle">+</label>
</div>
<!-- toggle close modal from card when appointment is created -->
<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

<!-- restart the component after closing it to clean form and steps -->
{#key unique}
	<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
{/key}
