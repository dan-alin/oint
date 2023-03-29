<script lang="ts">
	import type { FriendData } from '../../models/friend';

	import FriendCard from './FriendCard.svelte';

	export let friends: FriendData[];
	export let mode: 'view' | 'request' | 'sent' = 'view';
	export let removeAction: (id: number) => void = () => null;
	export let acceptAction: (id: number) => void = () => null;
	export let declineAction: (id: number, isRequest?: boolean) => void = () => null;
</script>

<div class=" grid gap-6 px-6 pb-28 md:grid-cols-2  xl:grid-cols-3 ">
	{#each friends as friend}
		<FriendCard {friend} {mode} {removeAction} {acceptAction} {declineAction} />
	{/each}
</div>
