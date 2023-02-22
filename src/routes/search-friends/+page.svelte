<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/FriendCard.svelte';
	import InputAction from '../../components/InputAction.svelte';
	import type { User } from '../../models';
	import type { Friend } from '../../models/friend';
	import { apiCall } from '../../utils/api-call';

	let friends: Friend[] = [];

	const onSearch = async (searchText: string) => {
		try {
			const response: Friend[] = await apiCall(
				'/api/search-users',
				'post',
				'',
				JSON.stringify({ searchText }),
				sessionStorage.getItem('jwt_token') || ''
			);
			friends = response;
		} catch (error: unknown) {
			console.log(error);
		}
	};

	const addFriend = async (friendId: number) => {
		try {
			const response: User[] = await apiCall(
				'/api/add-friend',
				'post',
				'Request sent',
				JSON.stringify({ friendId }),
				sessionStorage.getItem('jwt_token') || ''
			);
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>Add frineds</title>
	<meta name="description" content="A section to find and add friends" />
</svelte:head>
<h1>Add friends</h1>
<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
	<InputAction
		name="friend"
		id="friend"
		value=""
		placeholder="Search by friend's name"
		action={onSearch}
	/>
</div>
<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
	{#each friends as friend}
		<Card>
			<FriendCard
				name={`${friend.user.name} ${friend.user.surname}`}
				id={friend.user.id || 0}
				action={addFriend}
			/>
		</Card>
	{/each}
</div>
