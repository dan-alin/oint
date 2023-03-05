<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Appointment } from '../models';
	import {
		isInvitedOccurrence,
		type InvitedOccurrence,
		type Occurrence
	} from '../models/appointment';
	import type { Invitation } from '../models/invitation';
	import { invitedAppointmentsStore } from '../stores/apointments';
	import { apiCall } from '../utils/api-call';

	import AppointmentCard from './AppointmentCard.svelte';

	export let appointments: Appointment[];
	export let invited = false;

	const getCurrentAppointment = (occurrence: Appointment): Occurrence => {
		if (isInvitedOccurrence(occurrence)) return occurrence.appointment;

		return occurrence;
	};

	const acceptAppointment = async (appointmentId: number) => {
		try {
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
		} catch (error) {
			console.log(error);
		}
	};

	const declineAppointment = async (appointmentId: number) => {
		try {
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
		} catch (error) {
			console.log(error);
		}
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

		console.log($invitedAppointmentsStore);
	};

	const getInvitationStatus = (appointment: Appointment) => {
		if (!invited) return '';

		if (isInvitedOccurrence(appointment)) {
			return (
				$invitedAppointmentsStore.find(
					(occurrence) => occurrence.appointment.id === appointment.appointment.id
				)?.invitationStatus || ''
			);
		}
	};

	const goToDetail = (id: number) => {
		goto(`appointments/${id}`);
	};
</script>

<div class=" gap-6 grid md:grid-cols-2 xl:grid-cols-3 pb-10">
	{#each appointments as appointment}
		<AppointmentCard
			appointment={getCurrentAppointment(appointment)}
			inviteMode={invited}
			invitationStatus={getInvitationStatus(appointment)}
			declineAction={declineAppointment}
			confirmAction={acceptAppointment}
			action={goToDetail}
		/>
	{/each}
</div>
