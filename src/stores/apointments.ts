import { writable } from 'svelte/store';
import type { InvitedOccurrence, Occurrence } from '../models/appointment';

export const myAppointmentsStore = writable<Occurrence[]>([]);

export const invitedAppointmentsStore = writable<InvitedOccurrence[]>([]);
