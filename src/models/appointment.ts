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
};

export type DeletedAppointment = {
	deletedId: number;
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
	address: string;
	can_be_forwarded: false;
	image: FileList | undefined;
	locations: Location[];
};
