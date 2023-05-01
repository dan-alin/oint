import type { Icons } from '../enums';
import type { FriendData, FriendUser } from './friend';
import type { Invitation } from './invitation';
import type { Location, LocationRequest } from './locations';

export type AppointmentRequest = {
	title: string;
	description: string;
	start_date: Date | string;
	end_date: Date | string;
	creator_id: number;
	image: string;
	can_be_forwarded: boolean;
	invitees: FriendUser[];
	locations: LocationRequest[];
	location_selection_deadline: Date | string;
	location_selection_type: 'multi' | 'single';
};

export type Appointment = Omit<AppointmentRequest, 'locations'> & {
	id: number;
	invitations: Invitation[];
	creator: FriendUser;
	locations: Location[];
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
	locations: LocationRequest[];
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
