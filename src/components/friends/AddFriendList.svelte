<script lang="ts">
	import type { Friend } from '../../models/friend';

	import AddFriendCard from './AddFriendCard.svelte';

	export let friends: Friend[];
	export let action: (friendId: number) => void = () => null;
</script>

<div class=" grid gap-6 px-6 pb-28 md:grid-cols-2  xl:grid-cols-3 ">
	{#each friends as friend}
		<AddFriendCard {friend} {action} />
	{/each}
</div>
