<script lang="ts">
	import type { FriendData } from '../models/friend-requests';

	export let action: () => void;
	export let friends: FriendData[];
</script>

<div class="modal modal-bottom md:modal-middle  z-50 " id="add-invitees-modal">
	<div class="modal-box  bg-base-200 pb-10 ">
		<label for="add-invitees-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

		<div class="grid gap-6  grid-cols-1">
			<ul>
				{#each friends as friend}
					<li>{friend.name}</li>
				{/each}
				<li />
			</ul>
		</div>
		<button class="btn btn-primary" on:click={action}>save</button>
	</div>
</div>
