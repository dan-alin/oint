import type { FriendData, FriendUser } from './friend';
import type { Icons } from '../enums';
import type { Invitation } from './invitation';
import type { Location } from './locations';

export type Appointment = {
	id?: number;
	creator_id?: number;
	title: string;
	description: string;
	start_date: Date | string;
	end_date: Date | string;
	can_be_forwarded: boolean;
	image: string;
	locations: Location[];
	invitations?: Invitation[];
	location_selection_deadline?: Date | string;
	invitees: FriendUser[];
	location_selection_type?: 'multi' | 'single';
	creator?: FriendUser;
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
