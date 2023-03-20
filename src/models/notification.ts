import type { EnumNotificationType } from "../utils/notification-messages";
import type { User } from "./user";

export type Notification = { created_at: string; id: number; message: {user: User, read: boolean}, type: EnumNotificationType} 