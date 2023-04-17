<script lang="ts">
	import type { FriendData } from '../../models';

	export let invitedFriends: FriendData[] = [];
	export let myFriends: FriendData[] = [];
</script>

<form
	class="  custom-h  grid grid-cols-1 gap-6 overflow-auto "
	id="4-part"
	on:submit|preventDefault
>
	{#each myFriends as friend}
		<div>
			<label class=" label  w-full cursor-pointer">
				<div class="flex items-center gap-4">
					<span class="h-12 w-12 rounded-full">
						{#if friend.user.image}
							<img
								class="h-12 w-12 rounded-full object-cover"
								src={friend.user.image}
								alt="friend"
							/>
						{:else}
							<img
								class="h-12 w-12 rounded-full object-cover"
								src="/icons/profile-gray.svg"
								alt="friend"
							/>
						{/if}
					</span>
					{friend.user.name}
				</div>
				<input
					type="checkbox"
					class="checkbox-secondary checkbox checkbox-sm"
					checked={invitedFriends.includes(friend)}
					on:change={() => {
						if (invitedFriends.includes(friend)) {
							invitedFriends = invitedFriends.filter((f) => f !== friend);
						} else {
							invitedFriends = [...invitedFriends, friend];
						}
					}}
					id="forwardable"
				/>
			</label>
			<div class="divider my-0" />
		</div>
	{/each}
</form>

<style>
	/* calculate height to scroll friends on all devices */
	.custom-h {
		max-height: calc(100vh - 25rem);
	}
</style>
