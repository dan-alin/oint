import type { Location } from './locations';

export type Appointment = Occurrence | InvitedOccurrence;

export type Occurrence = {
	id: number;
	creator_id: number;
	title: string;
	description: string;
	start_date: Date;
	end_date: Date;
	can_be_forwarded: boolean;
	image: string;
	locations: Location[];
};

export type InvitedOccurrence = {
	appointment: Occurrence;
	invitationStatus?: 'declined' | 'accepted';
};

export type DeletedAppointment = {
	appointmentId: number;
	message: 'string';
	status: number;
};

export function isInvitedOccurrence(appointment: Appointment): appointment is InvitedOccurrence {
	return (appointment as InvitedOccurrence).appointment !== undefined;
}

export type AppointmentForm = {
	title: string;
	description: string;
	start_date: string;
	end_date: string;
	start_time: string;
	end_time: string;
	can_be_forwarded: boolean;
	image: FileList | undefined;
	locations: Location[];
	location_selection_type: 'single' | 'multi';
};
