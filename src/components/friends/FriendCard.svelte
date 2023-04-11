<script lang="ts">
	import { noop } from 'svelte/internal';
	import { Icons } from '../../enums';
	import type { FriendData } from '../../models/friend';
	import AcceptReject from '../AcceptReject.svelte';
	import Icon from '../Icon.svelte';

	export let friend: FriendData;

	export let mode: 'view' | 'request' | 'sent' = 'view';

	export let removeAction: (friendId: number) => void = noop;
	export let acceptAction: (friendId: number) => void = noop;
	export let declineAction: (friendId: number, isRequest?: boolean) => void = noop;
</script>

<div class="flex flex-col gap-4">
	<div class="min-h-12 flex items-center gap-4 text-xs">
		<div class="avatar">
			<div class="w-12 rounded-full">
				{#if friend.user.image}
					<img src={friend.user.image} alt="avatar" />
				{:else}
					<Icon icon={Icons.PROFILE_FULL} size="48" />
				{/if}
			</div>
		</div>
		<div class="w-full">
			<div class="mb-2  w-full ">
				<p class="ellipsis w-full self-center align-middle font-bold">
					{`${friend.user.name} ${friend.user.surname}`}
				</p>
				<!-- <p>X amici in comune</p> -->
			</div>
		</div>
		{#if mode === 'view'}
			<div class="dropdown h-full w-12 ">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="flex h-full w-12 items-center justify-end"
					><Icon icon={Icons.MEETBALL} /></label
				>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="dropdown-content menu right-0  rounded-sm bg-white  p-4 shadow">
					<li class="text-xs">
						<button on:click={() => removeAction(friend.friendRequestId)}> Rimuovi </button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	{#if mode === 'request'}
		<AcceptReject {acceptAction} {declineAction} id={friend.friendRequestId} />
	{:else if mode === 'sent'}
		<button
			class=" btn-primary btn-sm btn rounded-md"
			on:click={() => declineAction(friend.friendRequestId, true)}>Annulla</button
		>
	{/if}

	<div class="divider my-0" />
</div>

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
