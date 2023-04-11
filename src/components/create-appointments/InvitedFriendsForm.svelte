<script lang="ts">
	import type { FriendData } from '../../models';

	export let invitedFriends: FriendData[] = [];
	export let myFriends: FriendData[] = [];
	export let onSubmit: () => void = () => null;

	$: {
		console.log(invitedFriends);
	}
</script>

<form class="grid grid-cols-1  gap-6 " id="0-part" on:submit|preventDefault={onSubmit}>
	{#each myFriends as friend}
		<label class=" label  w-full cursor-pointer">
			<div>{friend.user.name}</div>
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
	{/each}
</form>
