<script lang="ts">
	import { Icons } from '../../enums';
	import type { FriendUser } from '../../models';
	import Icon from '../Icon.svelte';

	export let friends: FriendUser[] = [];
</script>

<div class="m-auto flex w-56 items-center justify-center rounded-full bg-white p-4">
	<div class="avatar-group -space-x-3">
		{#each friends.slice(0, 3) as friend}
			<div class="avatar">
				<div class="w-[30px] bg-white">
					{#if friend.image}
						<img src={friend.image} alt={'Foto profilo di ' + friend.name} />
					{:else}
						<Icon icon={Icons.PROFILE_FULL} size="30" />
					{/if}
				</div>
			</div>
		{/each}
		<!-- display as many avatars are needed to have to at least 3 -->
		{#if friends.length < 3}
			{#each new Array(friends.length > 3 ? 3 : friends.length) as _}
				<div class="avatar">
					<div class="w-[30px] bg-white">
						<Icon icon={Icons.PROFILE_FULL} size="30" />
					</div>
				</div>
			{/each}
		{/if}
	</div>
	<p class="ml-1 text-base">{friends.length} invitati</p>
</div>
