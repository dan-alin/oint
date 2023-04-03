import type { EnumNotificationType } from '../utils/notification-messages';
import type { Appointment } from './appointment';
import type { User } from './user';

export type Notification = {
	created_at: string;
	id: number;
	read: boolean;
	message: {
		friendRequestId: number;
		user: User;
		invitation?: { appointment: Appointment; appointment_id: number };
	};
	type: EnumNotificationType;
};
