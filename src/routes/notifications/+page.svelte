<script lang="ts">
	import NotificationCard from "../../components/notifications/NotificationCard.svelte";
	import PageHead from "../../components/PageHead.svelte";
	import type { Notification } from "../../models/notification";

    export let data: { myNotifications: Notification[] };
    let { myNotifications } = data;
    console.log(myNotifications)
</script>
<div class="px-6 py-8 flex flex-col gap-8">
    <PageHead firstRow="Le tue" secondRow="Notifiche"/>
    <div>
        {#each myNotifications as notification}
            <NotificationCard notification={notification}/>
        {/each}
    </div>
</div>
