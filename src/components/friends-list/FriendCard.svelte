<script lang="ts">
	import { Icons } from '../../enums';
	import type { FriendData } from '../../models/friend';
	import AcceptReject from '../AcceptReject.svelte';
	import Icon from '../Icon.svelte';

	export let friend: FriendData;
	// export let isViewMode = false;
	export let mode: 'view' | 'accept' | 'send' = 'view';

	export let action: (friendId: number) => void = () => null;
	export let removeAction: (friendId: number) => void = () => null;
	export let acceptAction: (friendId: number) => void = () => null;
	export let declineAction: (friendId: number) => void = () => null;
</script>

<div class="flex flex-col gap-4">
	<div class="min-h-12 flex items-center gap-4 text-xs">
		<div class="avatar">
			<div class="w-12 rounded-full">
				{#if friend.user.image}
					<img src={friend.user.image} alt="avatar" />
				{:else}
					<Icon icon={Icons.PROFILE_FULL} />
				{/if}
			</div>
		</div>
		<div class="w-full">
			<div class="mb-2  w-full ">
				<p class="ellipsis w-full self-center align-middle font-bold">{`${friend.user.name} ${friend.user.surname}`}</p>
				<p>X amici in comune</p>
			</div>
		</div>
		{#if mode === 'view'}
			<div class="dropdown h-full w-12 ">
				<button class="flex h-full w-12 items-center justify-end"
					><Icon icon={Icons.MEETBALL} /></button
				>
				<ul class="dropdown-content menu right-0  rounded-sm bg-white  p-4 shadow">
					<li class="text-xs">
						<button on:click={() => removeAction(friend.user.id)}> Rimuovi </button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	{#if mode === 'accept'}
		<AcceptReject {acceptAction} {declineAction} id={friend.friendRequestId} />
	{/if}

	{#if mode === 'send'}
		<button on:click={() => action(friend.user.id)} class="btn-primary btn-sm btn rounded-md ">
			Richiedi amicizia
		</button>
	{/if}

	<div class="divider my-0" />
</div>

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
