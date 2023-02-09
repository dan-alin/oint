import { writable } from 'svelte/store';

export const toggleAlert = writable<AlertState>({
	show: false,
	message: '',
	isError: false,
	isSuccess: false
});

export type AlertState = {
	show: boolean;
	message: string;
	isError?: boolean;
	isSuccess?: boolean;
};
