<script lang="ts">
	import type { DeletedAppointment, Invitation } from '../../models';
	import { invitedAppointmentsStore, myAppointmentsStore } from '../../stores/apointments';
	import { apiCall } from '../../utils/api-call';
	import AcceptReject from '../AcceptReject.svelte';
	import AppointmentCard from './AppointmentCard.svelte';

	export let invited = false;

	const cancelAppointment = async (appointmentId: number) => {
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

		myAppointmentsStore.update((appointments) =>
			appointments.filter((event) => event.id !== response.appointmentId)
		);
	};

	const acceptAppointment = async (appointmentId: number) => {
		const acceptRes: Invitation = await apiCall(
			'/api/accept-invitation',
			'post',
			'Accepted',
			JSON.stringify({
				appointmentId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		updateInvitationStatusStore(acceptRes);
	};

	const declineAppointment = async (appointmentId: number) => {
		const declineRes: Invitation = await apiCall(
			'/api/reject-invitation',
			'post',
			'Refused',
			JSON.stringify({
				appointmentId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		updateInvitationStatusStore(declineRes);
	};

	const updateInvitationStatusStore = (res: Invitation) => {
		const appointmentsToSet = $invitedAppointmentsStore;

		const appointmentToUpdate = appointmentsToSet.find(
			(occurrence) => occurrence.appointment.id === res.appointment_id
		);

		if (appointmentToUpdate) {
			appointmentToUpdate['invitationStatus'] = res.status;
		}

		invitedAppointmentsStore.update(() => appointmentsToSet);
	};
</script>

<div class=" grid gap-6 px-6 pb-32 md:grid-cols-2  xl:grid-cols-3 ">
	{#if invited}
		{#each $invitedAppointmentsStore as invitedOccurrence}
			<AppointmentCard appointment={invitedOccurrence.appointment} />
			<AcceptReject
				id={invitedOccurrence.appointment.id || -1}
				acceptAction={acceptAppointment}
				declineAction={declineAppointment}
			/>
			<div class="divider my-0" />
		{/each}
	{:else}
		{#each $myAppointmentsStore as occurrence}
			<AppointmentCard appointment={occurrence} deleteAction={cancelAppointment} />
		{/each}
	{/if}
</div>
