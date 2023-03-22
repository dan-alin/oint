<script lang="ts">
	import FriendsList from '../../components/friends-list/FriendsList.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import type { FriendRequests } from '../../models';
	import type { FriendData } from '../../models/friend';
	import { apiCall } from '../../utils/api-call';

	export let data: {
		myFriends: FriendData[];
		friendRequest: FriendRequests;
		notificationsUnread: Notification[];
	};
	let { myFriends, friendRequest, notificationsUnread } = data;

	let filteredFriends: FriendData[] = myFriends;
	let filteredRequests: FriendData[] = friendRequest.received;

	let notificationsUreadCount = notificationsUnread.length;

	let tabs = [
		{
			id: 'my-friends',
			label: 'I tuoi amici'
		},
		{
			id: 'friend-requests',
			label: 'Richieste'
		},
		{
			id: 'friend-reccomendations',
			label: 'Suggerimenti'
		}
	];
	let activeTab = 'my-friends';

	let searchValue = '';

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
		console.log(response);

		myFriends = myFriends.filter((friend) => friend.user.id !== response.id);
		filteredFriends = [...myFriends];
	};

	const acceptFriendRequest = async (friendRequestId: number) => {
		const response: any = await apiCall(
			'/api/accept-friend-request',
			'post',
			'Request accepted',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);
		filteredRequests = [...friendRequest.received.filter((friend) => friend.user.id !== response.friend.id)];
	};

	const declineFriendRequest = async (friendRequestId: number) => {
		const response: any = await apiCall(
			'/api/decline-friend-request',
			'post',
			'Request declined',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);
		filteredRequests = [...friendRequest.received.filter((friend) => friend.user.id !== response.friend.id)];
	};

	const onSearch = (friends: FriendData[]) => {
		switch (activeTab) {
			case 'my-friends':
				filteredFriends = friends.filter(
					(friend) =>
						friend.user.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
						friend.user.surname.toLowerCase().includes(searchValue.toLocaleLowerCase())
				);
				break;
			case 'friend-requests':
				filteredRequests = friendRequest.received.filter(
					(friend) =>
						friend.user.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
						friend.user.surname.toLowerCase().includes(searchValue.toLocaleLowerCase())
				);
				break;
			case 'friend-reccomendations':
				break;
		}
	};
</script>

<svelte:head>
	<title>Amici</title>
	<meta name="description" content="A friend list" />
</svelte:head>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-8 ">
		<PageHead firstRow="I tuoi" secondRow="Amici" {notificationsUreadCount} />
		<p class="text-lg font-bold">{myFriends.length} amici</p>
		<Tabs {tabs} bind:active={activeTab} />

		<input
			class="input-bordered input h-10 w-full "
			id="search-friend"
			name="search-friend"
			placeholder="cerca"
			type="search"
			bind:value={searchValue}
			on:input={() => onSearch(myFriends)}
		/>
	</div>
</div>
{#if activeTab === 'my-friends'}
	<FriendsList friends={filteredFriends} removeAction={removeFriend} />
{/if}

{#if activeTab === 'friend-requests'}
	<FriendsList
		friends={filteredRequests}
		mode="accept"
		acceptAction={acceptFriendRequest}
		declineAction={declineFriendRequest}
	/>
{/if}

{#if activeTab === 'friend-reccomendations'}
	<div class="flex w-full justify-center text-2xl text-gray-400">COMING SOON</div>
{/if}
