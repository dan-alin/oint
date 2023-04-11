<script lang="ts">
	import NotificationCard from '../../components/notifications/NotificationCard.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import type { Notification } from '../../models/notification';

	export let data: { myNotifications: Notification[] };
	let myNotifications = data.myNotifications.filter((notification) => !notification.read);
	console.log(myNotifications);
	const filterNotifications = (notificationId: number) => {
		myNotifications = myNotifications.filter((notification) => notification.id !== notificationId);
	};
</script>

<div class="flex flex-col gap-8 px-6 py-8">
	<PageHead firstRow="Le tue" secondRow="Notifiche" />
	<div>
		{#each myNotifications as notification}
			<NotificationCard {notification} action={filterNotifications} />
		{/each}
	</div>
</div>
