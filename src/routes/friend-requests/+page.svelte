<script lang="ts">
	import Card from '../../components/Card.svelte';
	import FriendCard from '../../components/FriendCard.svelte';
	import type { FriendRequests } from '../../models/friend-requests';
	import { apiCall } from '../../utils/api-call';

	export let data: { requests: FriendRequests };
	let { received, sent } = data.requests;

	const acceptFriendRequest = async (friendId: number) => {
		const response: any = await apiCall(
			'/api/accept-friend-request',
			'post',
			'Request accepted',
			JSON.stringify({ friendId }),
			sessionStorage.getItem('jwt_token') || ''
		);
		received = received.filter((friendRequest) => friendRequest.id !== friendId);
	};
</script>

<h1 class="flex justify-center text-2xl font-bold uppercase">Friend requests</h1>

{#if received}
	<div class="flex flex-col gap-6 py-10 px-2">
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
