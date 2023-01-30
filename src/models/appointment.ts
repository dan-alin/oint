export type Appointment = {
	id: number;
	creator_id: number;
	title: string;
	description: string;
	start_date: Date;
	end_date: Date;
	can_be_forwarded: boolean;
	address: string;
};
