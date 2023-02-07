import { toggleAlert, type AlertState } from '../stores/alert';

export const showAlert = (alertState: AlertState) => {
	toggleAlert.update((_) => ({
		show: true,
		message: alertState.message,
		isError: alertState.isError,
		isSuccess: alertState.isSuccess
	}));
	setTimeout(
		() =>
			toggleAlert.update((_) => ({
				show: false,
				message: alertState.message,
				isError: alertState.isError,
				isSuccess: alertState.isSuccess
			})),
		3000
	);
};
