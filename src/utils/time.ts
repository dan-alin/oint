export const getDate = (date: Date) => {
	return new Date(date).toLocaleDateString('it-IT', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

export const getTime = (date: Date) => {
	return new Date(date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
};
