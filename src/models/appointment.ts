import type { Invitation } from './invitation';
import type { Location } from './locations';

export type Appointment = {
	id: number;
	creator_id: number;
	title: string;
	description: string;
	start_date: Date;
	end_date: Date;
	can_be_forwarded: boolean;
	image: string;
	locations: Location[];
	invitations: Invitation[];
};

export type InvitedAppointment = {
	appointment: Appointment;
	invitationStatus?: 'declined' | 'accepted';
};

export type DeletedAppointment = {
	appointmentId: number;
	message: 'string';
	status: number;
};

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
