<script lang="ts">
	import { noop } from 'svelte/internal';
	import type { Friend } from '../../models/friend';

	import AddFriendCard from './AddFriendCard.svelte';

	export let friends: Friend[];
	export let action: (friendId: number) => void = noop;

	const handleAction = (friendId: number) => {
		friends = friends.map((friend) => {
			if (friend.user.id === friendId) {
				friend.isPending = true;
			}
			return friend;
		});
		action(friendId);
	};
</script>

<div class=" grid gap-6 px-6 pb-28 md:grid-cols-2  xl:grid-cols-3 ">
	{#each friends as friend}
		<AddFriendCard {friend} action={handleAction} />
	{/each}
</div>
