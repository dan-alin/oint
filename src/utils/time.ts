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

export const getTimeDifference = (start: Date, end: Date) => {
	const timeDiff = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
	const diffHours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
	const diffMinutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
	const diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

	let tokens = 0;
	let formattedString = '';
	if (diffDays > 0) {
		const formattedDays = diffDays.toString().padStart(2, '0');
		formattedString = `${formattedDays}d `;
		tokens++;
	}
	if (tokens <= 1) {
		const formattedHours = diffHours.toString().padStart(2, '0');
		formattedString += `${formattedHours}h`;
		if (tokens < 1) formattedString += ' : ';
		tokens++;
	}
	if (tokens <= 1) {
		const formattedMinutes = diffMinutes.toString().padStart(2, '0');
		formattedString += `${formattedMinutes}m`;
		if (tokens < 1) formattedString += ' : ';
		tokens++;
	}
	if (tokens == 1) {
		const formattedSeconds = diffSeconds.toString().padStart(2, '0');
		formattedString += `${formattedSeconds}s`;
	}
	return formattedString;
};
