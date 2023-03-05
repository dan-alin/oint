<script lang="ts">
	import type { FriendData } from '../models/friend-requests';
	import Card from './Card.svelte';

	export let action: (id: number) => void;
	export let friends: FriendData[];
</script>

<div class="modal modal-bottom md:modal-middle  z-[51] " id="add-invitees-modal">
	<div class="modal-box  bg-base-200 pb-10 ">
		<label for="add-invitees-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

		<div class="grid gap-6  grid-cols-1">
			<ul class="flex flex-col gap-6">
				{#each friends as friend}
					<li>
						{friend.name}
						<button class="btn btn-xs btn-primary" on:click={() => action(friend.id)}>add</button>
					</li>
				{/each}
				<li />
			</ul>
		</div>
	</div>
</div>
