<script lang="ts">
	import { Icons } from '../../enums';
	import type { Friend } from '../../models/friend';
	import Icon from '../Icon.svelte';

	export let friend: Friend;
	export let action: (friendId: number) => void = () => null;
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
				<p class="ellipsis w-full self-center align-middle font-bold">
					{`${friend.user.name} ${friend.user.surname}`}
				</p>
				<!-- <p>X amici in comune</p> -->
			</div>
		</div>
	</div>

	<button on:click={() => action(friend.user.id)} class=" btn-primary btn-sm btn rounded-md">
		Richiedi amicizia
	</button>

	<div class="divider my-0" />
</div>
