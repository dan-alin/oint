<script lang="ts">
	import { Icons } from '../../enums';
	import AcceptReject from '../AcceptReject.svelte';
	import Icon from '../Icon.svelte';

	export let name: string;
	export let avatar: string = '';
	export let id: number;
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
				{#if avatar}
					<img src={avatar} alt="avatar" />
				{:else}
					<Icon icon={Icons.PROFILE_FULL} />
				{/if}
			</div>
		</div>
		<div class="w-full">
			<div class="mb-2  w-full ">
				<p class="ellipsis w-full self-center align-middle font-bold">{name}</p>
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
						<button on:click={() => removeAction(id)}> Rimuovi </button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	{#if mode === 'accept'}
		<AcceptReject {acceptAction} {declineAction} {id} />
	{/if}

	{#if mode === 'send'}
		<button on:click={() => action(id)} class="btn-primary btn-sm btn rounded-md ">
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
