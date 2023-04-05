export const notificationTimeString = (notificationDate: Date): string => {
    const currentDate = new Date();

    const differenceInMilliseconds = notificationDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.abs(Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)));

    const differenceInHours = Math.abs(Math.floor(differenceInMilliseconds / (1000 * 60 * 60)));
    const differenceInMinutes = Math.abs(Math.floor(differenceInDays / (1000 * 60)));
    const differenceInSeconds = Math.abs(Math.floor(differenceInMilliseconds / 1000));
    // const differenzaInWeeks = Math.floor(differenceInDays / 7);
    if (differenceInDays > 0) {
        return `${differenceInDays} giorni fa`;
    } else if (differenceInHours > 0) {
        return `${differenceInHours} ore fa`;
    } else if (differenceInMinutes > 0) {
        return `${differenceInMinutes} minuti fa`;
    } else {
        return `${differenceInSeconds} secondi fa`;
    }
}