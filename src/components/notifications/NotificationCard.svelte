<script lang="ts">
	import type { Notification } from "../../models/notification";
	import { getNotificationMessage } from "../../utils/notification-messages";
	import { notificationTimeString } from "../../utils/notification-time";


	export let notification: Notification;
</script>

<div class="flex flex-col gap-4">
    <div class="min-h-12 flex items-center gap-4 text-xs">
        <div class="placeholder avatar h-12 w-12 ">
			<div class="h-12 w-12 rounded-full bg-gray-400 text-neutral-content shadow ">
				<span class="text-3xl">{notification.message.user.name.charAt(0)}</span>
			</div>
		</div>
        <div class="w-full">
            <div class="mb-2  w-full ">
                <p class=" w-full self-center align-middle font-bold">{getNotificationMessage(notification.type, `${notification.message.user.name} ${notification.message.user.surname}`)}</p>
            </div>
        </div>
    </div>
</div>
<div class="flex justify-end text-xs text-gray-400">{notificationTimeString(new Date(notification.created_at))}</div>

<div class="divider my-0" />

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
