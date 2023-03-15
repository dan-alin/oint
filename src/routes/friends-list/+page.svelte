<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/friends-list/FriendCard.svelte';
	import type { FriendData } from '../../models';

	import { apiCall } from '../../utils/api-call';

	export let data: { friendList: FriendData[] };
	let { friendList } = data;

	const removeFriend = async (friendId: number) => {
		//TODO type delete response
		const response: any = await apiCall(
			'/api/remove-friend',
			'delete',
			'',
			JSON.stringify({
				friendId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		friendList = friendList.filter((friend) => friend.id !== response.id);
	};
</script>

<h1 class="flex justify-center text-2xl font-bold uppercase">Friend list</h1>

{#if friendList}
	<div class="flex flex-col gap-6 py-10 px-2">
		{#each friendList as friend}
			<div class="w-full md:max-w-md ">
				<Card>
					<FriendCard
						name={`${friend.name} ${friend.surname}`}
						id={friend.id || 0}
						action={() => removeFriend(friend.id)}
					/>
				</Card>
			</div>
		{/each}
	</div>
{/if}
