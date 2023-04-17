export const getNotificationMessage = (
	notificationType: EnumNotificationType,
	prefix: string,
	suffix?: string
) => {
	switch (notificationType) {
		case EnumNotificationType.FRIEND_REQ:
			return `${prefix} ti ha inviato una richiesta di amicizia`;
		case EnumNotificationType.FRIEND_ACC:
			return `${prefix} è ora tra i tuoi amici`;
		case EnumNotificationType.FRIEND_REJ:
			return `Ops, sembra che ${prefix} non voglia far parte dei tuoi amici`;
		case EnumNotificationType.INVITATION_REQ:
			return `${prefix} ti ha invitato a <b><u>${suffix}</u></b>`;
		case EnumNotificationType.INVITATION_ACC:
			return `${prefix} ha accettato il tuo invito a <b><u>${suffix}</u></b>`;
		case EnumNotificationType.INVITATION_REJ:
			return `${prefix} ha rifiutato il tuo invito a <b><u>${suffix}</u></b>`;
		case EnumNotificationType.EVENT_DELETED:
			return `${prefix} ha eliminato l'evento <b><u>${suffix}</u></b>`;
		default:
			return notificationType;
	}
};

export enum EnumNotificationType {
	FRIEND_REQ = 'FRIEND_REQ',
	FRIEND_ACC = 'FRIEND_ACC',
	FRIEND_REJ = 'FRIEND_REJ',
	INVITATION_REQ = 'INVITATION_REQ',
	INVITATION_ACC = 'INVITATION_ACC',
	INVITATION_REJ = 'INVITATION_REJ',
	EVENT_UPDATED = 'EVENT_UPDATED',
	EVENT_DELETED = 'EVENT_DELETED'
}
