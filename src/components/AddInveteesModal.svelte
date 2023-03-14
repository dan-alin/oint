<script lang="ts">
	import type { FriendData } from '../models/friend-requests';
	import Card from './Card.svelte';

	export let action: (id: number) => void;
	export let friends: FriendData[];
</script>

<div class="modal modal-bottom z-[51]  md:modal-middle " id="add-invitees-modal">
	<div class="modal-box  bg-base-200 pb-10 ">
		<label for="add-invitees-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>

		<div class="grid grid-cols-1  gap-6">
			<ul class="flex flex-col gap-6">
				{#each friends as friend}
					<li>
						{friend.name}
						<button class="btn-primary btn-xs btn" on:click={() => action(friend.id)}>add</button>
					</li>
				{/each}
				<li />
			</ul>
		</div>
	</div>
</div>
