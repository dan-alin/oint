<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/FriendCard.svelte';
	import type { FriendRequests } from '../../models/friend-requests';
	import { apiCall } from '../../utils/api-call';

	export let data: { requests: FriendRequests };
	let { received, sent } = data.requests;
	console.log(data);
	const acceptFriendRequest = async (friendId: number) => {
		try {
			const response: any = await apiCall(
				'/api/accept-friend-request',
				'post',
				'Request accepted',
				JSON.stringify({ friendId }),
				sessionStorage.getItem('jwt_token') || ''
			);
			received = received.filter((friendRequest) => friendRequest.id !== friendId);
		} catch (error) {}
	};
</script>

<h1>Friend requests</h1>
{#if received}
	<div class="flex">
		{#each received as request}
			<div class="w-full md:max-w-md ">
				<Card>
					<FriendCard
						name={`${request.name} ${request.surname}`}
						id={request.id || 0}
						action={acceptFriendRequest}
						isAcceptingMode
					/>
				</Card>
			</div>
		{/each}
	</div>
{/if}
