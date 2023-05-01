<script lang="ts">
	import { Icons } from '../../enums';
	import { invitationService } from '../../services/invitation.service';
	import { invitedAppointmentsStore, myAppointmentsStore } from '../../stores/apointments';
	import AcceptReject from '../AcceptReject.svelte';
	import EventAcceptedRefused from '../EventAcceptedRefused.svelte';
	import AppointmentCard from './AppointmentCard.svelte';
	import NoContent from './NoContent.svelte';

	export let invited = false;

	const acceptAppointment = async (appointmentId: number) => {
		invitationService.acceptAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
	};

	const declineAppointment = async (appointmentId: number) => {
		invitationService.declineAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
	};
</script>

<div class=" grid gap-6 px-6 pt-2 pb-32 md:grid-cols-2  xl:grid-cols-3 ">
	{#if invited}
		{#each $invitedAppointmentsStore as invitedOccurrence, index}
			<div>
				{#if index !== 0}
					<div class="divider mt-0 mb-6" />
				{/if}
				<h2 class="mb-1 text-xs font-bold">
					Invito da {invitedOccurrence.appointment.invitations[0].invitee.name}
					{invitedOccurrence.appointment.invitations[0].invitee.surname}
				</h2>
				{#if invitedOccurrence.invitationStatus === 'pending'}
					<AppointmentCard appointment={invitedOccurrence.appointment} />
					<div class="mt-6">
						<AcceptReject
							id={invitedOccurrence.appointment.id || -1}
							acceptAction={acceptAppointment}
							declineAction={declineAppointment}
						/>
					</div>
				{:else}
					<div>
						<AppointmentCard appointment={invitedOccurrence.appointment} />
						<EventAcceptedRefused {index} appointment={invitedOccurrence} />
					</div>
				{/if}
			</div>
		{:else}
			<NoContent
				icon={Icons.INVITE}
				size="50"
				heading="Non hai inviti per questa settimana"
				subHeading="...ma magari i tuoi amici staranno già pensando a qualcosa!"
			/>
		{/each}
	{:else}
		{#each $myAppointmentsStore as occurrence}
			<AppointmentCard appointment={occurrence} />
		{:else}
			<NoContent
				icon={Icons.DATE}
				size="50"
				heading="Non hai eventi in programma questa settimana"
				subHeading="Ma quella partita di bowling che cerchi di organizzare da tempo immemore?"
			/>
		{/each}
	{/if}
</div>
