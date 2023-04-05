<script lang="ts">
	import { Icons } from '../../enums';
	import type { FriendData } from '../../models';
	import Icon from '../Icon.svelte';

	export let friends: FriendData[];
</script>

<div class="m-auto flex w-56 items-center justify-center rounded-full bg-white p-4">
	<div class="avatar-group -space-x-3">
		{#each friends.slice(0, 3) as friend}
			<div class="avatar ">
				<div class="w-[35px] bg-white">
					<Icon icon={Icons.PROFILE_FULL} />
				</div>
			</div>
		{/each}
	</div>
	<p class="ml-1 text-base">{friends.length} invitati</p>
</div>
