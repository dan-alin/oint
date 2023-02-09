import { writable } from 'svelte/store';
import type { Appointment } from '../models';

export const events = writable<Appointment[]>([]);
