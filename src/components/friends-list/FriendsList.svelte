<script lang="ts">
	import type { FriendData } from '../../models/friend';

	import FriendCard from './FriendCard.svelte';

	export let friends: FriendData[];
	export let mode: 'send' | 'view' | 'accept' = 'view';
</script>

<div class=" grid gap-6 px-6 pb-28 md:grid-cols-2  xl:grid-cols-3 ">
	{#each friends as friend}
		<FriendCard name={`${friend.name} ${friend.surname}`} id={friend.id} {mode} />
	{/each}
</div>
