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
				'',
				JSON.stringify(newAppointment),

				sessionStorage.getItem('jwt_token') || '',
				false
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
				'',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || '',
				false
			);
			appointments = appointments.filter((event) => event.id !== response.appointmentId);
		} catch (error) {}
	};

	const goToDetail = (id: number) => {
		goto(`appointments/${id}`, { state: appointments.find((item) => item.id === id) });
	};
</script>

<!-- modal -->
<div class="flex  justify-center items-center h-16 w-screen sticky top-24 bg-base-100  z-40">
	<label for="create-appointment-modal" class="btn btn-primary ">nuovo appuntamento</label>
</div>

<!-- toggle close modal from card when appointment is created -->
<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

<!-- restart the component after closing it to clean form and steps -->
{#key unique}
	<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
{/key}

<!-- cards -->
<div class=" gap-6 grid md:grid-cols-2 xl:grid-cols-3 pb-10">
	{#each appointments as appointment}
		<AppointmentCard {appointment} deleteAction={cancelAppointment} action={goToDetail} />
	{/each}
</div>
