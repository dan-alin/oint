import type { User } from "./user";

export type Notification = { creayed_at: string; id: number; message: {user: User, read: boolean, type: string}} 