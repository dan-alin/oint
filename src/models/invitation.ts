export type Invitation = {
	appointment_id: number;
	created_by: number;
	id: number;
	invitee_id: number;
	status: 'accepted' | 'declined';
};
