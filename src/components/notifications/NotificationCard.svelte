<script lang="ts">
	import type { Notification } from '../../models/notification';
	import { invitationService } from '../../services/invitation.service';
	import { apiCall } from '../../utils/api-call';
	import { EnumNotificationType, getNotificationMessage } from '../../utils/notification-messages';
	import { notificationTimeString } from '../../utils/notification-time';
	import AcceptReject from '../AcceptReject.svelte';

	export let notification: Notification;
	export let action = (notificationId: number) => {
		//TODO: check what to do here
	};

	let acceptAction: (id: number) => void;
	let declineAction: (id: number) => void;
	let actionId: number;

	const acceptFriendRequest = async (friendRequestId: number) => {
		const response: any = await apiCall(
			'/api/accept-friend-request',
			'post',
			'Request accepted',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);
		action(notification.id);
	};

	const declineFriendRequest = async (friendRequestId: number) => {
		const response: any = await apiCall(
			'/api/reject-friend-request',
			'post',
			'Request declined',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);
		action(notification.id);
	};

	const acceptAppointment = async (appointmentId: number) => {
		invitationService.acceptAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
		action(notification.id);
	};

	const declineAppointment = async (appointmentId: number) => {
		invitationService.declineAppointment(appointmentId, sessionStorage.getItem('jwt_token') || '');
		action(notification.id);
	};

	switch (notification.type) {
		case EnumNotificationType.FRIEND_REQ:
			acceptAction = acceptFriendRequest;
			declineAction = declineFriendRequest;
			actionId = notification.message.friendRequestId;
			break;
		case EnumNotificationType.INVITATION_REQ:
			acceptAction = acceptAppointment;
			declineAction = declineAppointment;
			actionId = notification.message.invitation?.appointment_id || 0;
	}
</script>

<div class="flex flex-col gap-4">
	<div class="min-h-12 flex items-center gap-4 text-xs">
		<div class="placeholder avatar h-12 w-12 ">
			<div class="h-12 w-12 rounded-full bg-gray-400 text-neutral-content shadow ">
				<span class="text-3xl">{notification.message.user.name.charAt(0)}</span>
			</div>
		</div>
		<div class="flex w-full flex-col">
			<div class="w-full">
				<div class="mb-2  w-full ">
					{#if notification.type === EnumNotificationType.FRIEND_REQ || notification.type === EnumNotificationType.FRIEND_ACC || notification.type === EnumNotificationType.FRIEND_REJ}
						<p class=" w-full self-center align-middle font-bold">
							{getNotificationMessage(
								notification.type,
								`${notification.message.user.name} ${notification.message.user.surname}`
							)}
						</p>
					{:else if notification.type === EnumNotificationType.INVITATION_REQ || notification.type === EnumNotificationType.INVITATION_ACC}
						<p class=" w-full self-center align-middle font-bold">
							{@html getNotificationMessage(
								notification.type,
								`${notification.message.user.name} ${notification.message.user.surname}`,
								`${notification.message.appointment.title}`
							)}
						</p>
					{:else}
						<p>{notification.type} Notifica non gestita</p>
					{/if}
				</div>
			</div>
			{#if notification.type === EnumNotificationType.FRIEND_REQ || notification.type === EnumNotificationType.INVITATION_REQ}
				<div class="mb-4">
					<AcceptReject {acceptAction} {declineAction} id={actionId} />
				</div>
			{/if}
		</div>
	</div>
</div>
<div class="flex justify-end text-xs text-gray-400">
	{notificationTimeString(new Date(notification.created_at))}
</div>

<div class="divider my-0" />

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
