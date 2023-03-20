export const getNotificationMessage = (notificationType: EnumNotificationType, prefix: string) => {
    switch(notificationType) {
        case('FRIEND_REQ'):
         return `${prefix} ti ha inviato una richiesta di amicizia`;
        case('FRIEND_ACC'):
            return `${prefix} è ora tra i tuoi amici`;
        case('FRIEND_REJ'):
            return `Ops, sembra che ${prefix} non voglia far parte dei tuoi amici`;

    }
}

export enum EnumNotificationType {
  FRIEND_REQ = 'FRIEND_REQ',
  FRIEND_ACC = 'FRIEND_ACC',
  FRIEND_REJ = 'FRIEND_REJ',
  INVITATION_REQ = 'INVITATION_REQ',
  INVITATION_ACC = 'INVITATION_ACC',
  INVITATION_REJ = 'INVITATION_REJ',
  EVENT_UPDATED = 'EVENT_UPDATED',
  EVENT_DELETED = 'EVENT_DELETED',
}