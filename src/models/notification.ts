import type { EnumNotificationType } from "../utils/notification-messages";
import type { Appointment } from "./appointment";
import type { User } from "./user";

export type Notification = { created_at: string; id: number; message: {friendRequestId: number, user: User, read: boolean, invitation?: {appointment: Appointment, appointmentId: number}}, type: EnumNotificationType} 