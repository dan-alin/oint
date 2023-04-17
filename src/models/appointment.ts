import type { FriendData, FriendUser } from './friend';
import type { Icons } from '../enums';
import type { Invitation } from './invitation';
import type { Location } from './locations';

export type AppointmentRequest = {
	title: string;
	description: string;
	start_date: Date | string;
	end_date: Date | string;
	creator_id: number;
	image: string;
	can_be_forwarded: boolean;
	invitees: FriendUser[];
	locations: Location[];
	location_selection_deadline: Date | string;
	location_selection_type: 'multi' | 'single';
};

export type Appointment = AppointmentRequest & {
	id: number;
	invitations: Invitation[];
	creator: FriendUser;
};

export type InvitedAppointment = {
	appointment: Appointment;
	invitationStatus: 'declined' | 'accepted' | 'pending';
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
	location_selection_deadline_date: string;
	location_selection_deadline_time: string;
	invitees?: FriendData[];
};

export type AppointmentDetailSectionData = {
	icon: Icons;
	firstRow: string;
	secondRow: string;
	btnLabel?: string;
	callback?: () => void;
};
