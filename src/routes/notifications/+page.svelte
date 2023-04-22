<script lang="ts">
	import NoContent from '../../components/appointments/NoContent.svelte';
	import Icon from '../../components/Icon.svelte';
	import NotificationCard from '../../components/notifications/NotificationCard.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import { Icons } from '../../enums';
	import type { Notification } from '../../models/notification';

	export let data: { myNotifications: Notification[] };
	let myNotifications = data.myNotifications.filter((notification) => !notification.read);

	const filterNotifications = (notificationId: number) => {
		myNotifications = myNotifications.filter((notification) => notification.id !== notificationId);
	};
</script>

<div class="flex flex-col gap-8 px-6 py-8">
	<PageHead firstRow="Le tue" secondRow="Notifiche" />
	<div>
		{#each myNotifications as notification}
			<NotificationCard {notification} action={filterNotifications} />
		{:else}
			<NoContent
				heading="Non hai nessuna nuova notifica"
				subHeading="Smuoviamo le acque? Non vorrai mica rimanere a casa tutta la settimana?!?"
			>
				<div class="rotate-[20deg] relative">
					<Icon icon={Icons.NOTIFICATION_OUTLINE} size="45" />
					<span
						class="bg-light-gray absolute -rotate-[20deg] top-0 right-0 inline-block w-5 h-5 leading-5 rounded-[50%] font-bold text-white text-xs"
					>
						0
					</span>
				</div>
			</NoContent>
		{/each}
	</div>
</div>
