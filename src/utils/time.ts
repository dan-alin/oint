export const getDate = (date: Date) => {
	const strDate = new Date(date).toLocaleDateString('it-IT', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	});
	return `${strDate[0].toUpperCase()}${strDate.substring(1, 7)}${strDate
		.substring(7, 10)
		.toUpperCase()}${strDate.substring(10)}`;
};

export const getTime = (date: Date) => {
	return new Date(date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
};
