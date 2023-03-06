import { writable } from 'svelte/store';
import type { InvitedAppointment, Appointment } from '../models/appointment';

export const myAppointmentsStore = writable<Appointment[]>([]);

export const invitedAppointmentsStore = writable<InvitedAppointment[]>([]);
