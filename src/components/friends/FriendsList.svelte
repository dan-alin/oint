<script lang="ts">
	import { noop } from 'svelte/internal';
	import type { FriendData } from '../../models/friend';

	import FriendCard from './FriendCard.svelte';

	export let friends: FriendData[];
	export let mode: 'view' | 'request' | 'sent' = 'view';
	export let removeAction: (id: number) => void = noop;
	export let acceptAction: (id: number) => void = noop;
	export let declineAction: (id: number, isRequest?: boolean) => void = noop;
</script>

<div class=" grid gap-6 px-6 pt-2 pb-28 md:grid-cols-2  xl:grid-cols-3 ">
	{#each friends as friend}
		<FriendCard {friend} {mode} {removeAction} {acceptAction} {declineAction} />
	{/each}
</div>
