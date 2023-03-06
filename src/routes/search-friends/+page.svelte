<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/FriendCard.svelte';
	import InputAction from '../../components/InputAction.svelte';
	import type { Friend, User } from '../../models';
	import { apiCall } from '../../utils/api-call';

	let friends: Friend[] = [];

	const onSearch = async (searchText: string) => {
		const response: Friend[] = await apiCall(
			'/api/search-users',
			'post',
			'',
			JSON.stringify({ searchText }),
			sessionStorage.getItem('jwt_token') || ''
		);
		friends = response;
	};

	const addFriend = async (friendId: number) => {
		const response: User[] = await apiCall(
			'/api/add-friend',
			'post',
			'Request sent',
			JSON.stringify({ friendId }),
			sessionStorage.getItem('jwt_token') || ''
		);
	};
</script>

<svelte:head>
	<title>Add frineds</title>
	<meta name="description" content="A section to find and add friends" />
</svelte:head>
<h1 class="text-2xl font-bold uppercase flex justify-center">Add friends</h1>

<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3 mx-2 my-10">
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
