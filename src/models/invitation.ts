export type Invitation = {
	appointment_id: number;
	created_by: number;
	id: number;
	invitee_id: number;
	status: 'accepted' | 'declined';
	invitee: Invitee;
};

type Invitee = {
	id: number;
	name: string;
	nickname: string;
	surname: string;
};
