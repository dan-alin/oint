import { writable } from 'svelte/store';
import type { User } from '../models';

export const userStore = writable<User>(undefined);
