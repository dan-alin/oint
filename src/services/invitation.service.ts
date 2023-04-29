import type { Invitation } from '../models';
import { invitedAppointmentsStore } from '../stores/apointments';
import { apiCall } from '../utils/api-call';

const acceptAppointment = async (appointmentId: number, jwt: string, showLoader = false) => {
	const acceptRes: Invitation = await apiCall(
		'/api/accept-invitation',
		'post',
		'Accepted',
		JSON.stringify({
			appointmentId
		}),
		jwt,
		showLoader
	);
	updateInvitationStatusStore(acceptRes);
};

const declineAppointment = async (appointmentId: number, jwt: string, showLoader = false) => {
	const declineRes: Invitation = await apiCall(
		'/api/reject-invitation',
		'post',
		'Refused',
		JSON.stringify({
			appointmentId
		}),
		jwt,
		showLoader
	);
	updateInvitationStatusStore(declineRes);
};

const updateInvitationStatusStore = (res: Invitation) => {
	invitedAppointmentsStore.update((myAppointments) =>
		myAppointments.map((occurrence) =>
			occurrence.appointment.id === res.appointment_id
				? { ...occurrence, invitationStatus: res.status }
				: occurrence
		)
	);
};

export const invitationService = {
	acceptAppointment,
	declineAppointment
};
