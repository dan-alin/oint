import type { Invitation } from "../models";
import { invitedAppointmentsStore } from "../stores/apointments";
import { apiCall } from "../utils/api-call";

	const acceptAppointment = async (appointmentId: number, jwt: string) => {
		const acceptRes: Invitation = await apiCall(
			'/api/accept-invitation',
			'post',
			'Accepted',
			JSON.stringify({
				appointmentId
			}),
            jwt,
			false
		);
		updateInvitationStatusStore(acceptRes);
	};

	const declineAppointment = async (appointmentId: number, jwt: string) => {
		const declineRes: Invitation = await apiCall(
			'/api/reject-invitation',
			'post',
			'Refused',
			JSON.stringify({
				appointmentId
			}),
			jwt,
			false
		);
		updateInvitationStatusStore(declineRes);
	};

	const updateInvitationStatusStore = (res: Invitation) => {
		invitedAppointmentsStore.update((myAppointments) => {
            const ds= myAppointments.map(occurrence => occurrence.appointment.id === res.appointment_id ? {...occurrence, invitationStatus: res.status}: occurrence)
            return ds });
	};

    export const invitationService = {
            acceptAppointment, declineAppointment
    }