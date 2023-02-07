<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/FriendCard.svelte';
	import InputAction from '../../components/InputAction.svelte';
	import type { User } from '../../models';
	import { apiCall } from '../../utils/api-call';
	import { showAlert } from '../../utils/show-alert';

	let users: User[] = [];

	const onSearch = async (searchText: string) => {
		try {
			const response: User[] = await apiCall(
				'/api/search-users',
				'post',
				JSON.stringify({ searchText }),
				sessionStorage.getItem('jwt_token') || ''
			);
			users = response;
		} catch (error: unknown) {
			console.log(error);
		}
	};

	const addFriend = async (friendId: number) => {
		try {
			const response: User[] = await apiCall(
				'/api/add-friend',
				'post',
				JSON.stringify({ friendId }),
				sessionStorage.getItem('jwt_token') || ''
			);
			console.log(response);
			showAlert({ show: true, message: 'Request sent', isSuccess: true });
		} catch (error: unknown) {
			showAlert({ show: true, message: error as string, isError: true });
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
	{#each users as user}
		<Card>
			<FriendCard name={`${user.name} ${user.surname}`} id={user.id || 0} action={addFriend} />
		</Card>
	{/each}
</div>
