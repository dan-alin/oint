<script lang="ts">
	import { Icons } from '../../enums';
	import type { DeletedAppointment } from '../../models';
	import { invitationService } from '../../services/invitation.service';
	import { invitedAppointmentsStore, myAppointmentsStore } from '../../stores/apointments';
	import { apiCall } from '../../utils/api-call';
	import AcceptReject from '../AcceptReject.svelte';
	import EventAcceptedRefused from '../EventAcceptedRefused.svelte';
	import AppointmentCard from './AppointmentCard.svelte';
	import NoAppointments from './NoAppointments.svelte';

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
		invitationService.acceptAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
	};

	const declineAppointment = async (appointmentId: number) => {
		invitationService.declineAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
	};
</script>

<div class=" grid gap-6 px-6 pb-32 md:grid-cols-2  xl:grid-cols-3 ">
	{#if invited}
		{#each $invitedAppointmentsStore as invitedOccurrence}
			{#if invitedOccurrence.invitationStatus === 'pending'}
				<AppointmentCard appointment={invitedOccurrence.appointment} />
				<AcceptReject
					id={invitedOccurrence.appointment.id || -1}
					acceptAction={acceptAppointment}
					declineAction={declineAppointment}
				/>
				<div class="divider my-0" />
			{:else}
				<div>
					<AppointmentCard appointment={invitedOccurrence.appointment} />
					<EventAcceptedRefused accepted={invitedOccurrence.invitationStatus === 'accepted'} />
				</div>
			{/if}
		{:else}
			<NoAppointments
				icon={Icons.INVITE}
				size="50"
				heading="Non hai inviti per questa settimana"
				subHeading="...ma magari i tuoi amici staranno già pensando a qualcosa!"
			/>
		{/each}
	{:else}
		{#each $myAppointmentsStore as occurrence}
			<AppointmentCard appointment={occurrence} deleteAction={cancelAppointment} />
		{:else}
			<NoAppointments
				icon={Icons.DATE}
				size="50"
				heading="Non hai eventi in programma questa settimana"
				subHeading="Ma quella partita di bowling che cerchi di organizzare da tempo immemore?"
			/>
		{/each}
	{/if}
</div>
