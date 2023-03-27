<script lang="ts">
	import AddFriendList from '../../components/friends/AddFriendList.svelte';
	import FriendsList from '../../components/friends/FriendsList.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import type { FriendRequests, User } from '../../models';
	import type { Friend, FriendData } from '../../models/friend';
	import { apiCall } from '../../utils/api-call';

	export let data: {
		myFriends: FriendData[];
		friendRequest: FriendRequests;
		notificationsUnread: Notification[];
	};
	let { myFriends, friendRequest, notificationsUnread } = data;
	console.log(friendRequest);

	let filteredFriends: FriendData[] = myFriends;
	let filteredRequests: FriendData[] = friendRequest.received;
	let filteredSent: FriendData[] = friendRequest.sent;
	let foundFriends: Friend[] = [];
	let notificationsUreadCount = notificationsUnread.length;

	let tabs = [
		{
			id: 'my-friends',
			label: 'I tuoi amici',
			firstRow: 'I tuoi',
			secondRow: 'Amici'
		},
		{
			id: 'friend-requests',
			label: 'Richieste',
			firstRow: 'Richieste di',
			secondRow: 'Amicizia'
		},
		{
			id: 'search-friends',
			label: 'Cerca amici',
			firstRow: 'Cerca nuovi',
			secondRow: 'Amici'
		}
		// 	{
		// 		id: 'friend-reccomendations',
		// 		label: 'Suggerimenti'
		// 	}
	];
	let activeTab = 'my-friends';

	let searchText = '';

	const removeFriend = async (friendRequestId: number) => {
		//TODO type delete response
		const response: any = await apiCall(
			'/api/remove-friend',
			'delete',
			'',
			JSON.stringify({
				friendRequestId
			}),
			sessionStorage.getItem('jwt_token') || '',
			false
		);

		myFriends = myFriends.filter((friend) => friend.user.id !== response.user.id);
		filteredFriends = [...myFriends];
	};

	const acceptFriendRequest = async (friendRequestId: number) => {
		const request: any = await apiCall(
			'/api/accept-friend-request',
			'post',
			'Request accepted',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);

		filteredRequests = [
			...friendRequest.received.filter((friend) => friend.user.id !== request.response.user.id)
		];
		filteredFriends = [...filteredFriends, request.response];

		console.log(filteredFriends);
	};

	const declineFriendRequest = async (friendRequestId: number) => {
		const response: any = await apiCall(
			'/api/decline-friend-request',
			'post',
			'Request declined',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);

		filteredRequests = [
			...friendRequest.received.filter((friend) => friend.user.id !== response.friend.id)
		];
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

	const onSearch = (friends: FriendData[]) => {
		switch (activeTab) {
			case 'my-friends':
				filteredFriends = friends.filter(
					(friend) =>
						friend.user.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
						friend.user.surname.toLowerCase().includes(searchText.toLocaleLowerCase())
				);
				break;
			case 'friend-requests':
				filteredRequests = friendRequest.received.filter(
					(friend) =>
						friend.user.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
						friend.user.surname.toLowerCase().includes(searchText.toLocaleLowerCase())
				);
				break;
			default:
				break;
		}
	};

	const handleLiveSearch = () => {
		if (searchText.length > 2) {
			searchFriends();
		} else {
			foundFriends = [];
		}
	};

	const searchFriends = async () => {
		const response: Friend[] = await apiCall(
			'/api/search-users',
			'post',
			'',
			JSON.stringify({ searchText }),
			sessionStorage.getItem('jwt_token') || '',
			false
		);
		foundFriends = response;
	};

	console.log(filteredFriends);
</script>

<svelte:head>
	<title>Amici</title>
	<meta name="description" content="A friend list" />
</svelte:head>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-8 ">
		<PageHead
			firstRow={tabs.find((tab) => tab.id === activeTab)?.firstRow || ''}
			secondRow={tabs.find((tab) => tab.id === activeTab)?.secondRow || ''}
			{notificationsUreadCount}
		/>
		<p class="text-lg font-bold">{myFriends.length} amici</p>
		<Tabs {tabs} bind:active={activeTab} />

		<input
			class="input-bordered input h-10 w-full "
			id="search-friend"
			name="search-friend"
			placeholder="cerca"
			type="search"
			bind:value={searchText}
			on:input={activeTab === 'search-friends'
				? () => handleLiveSearch()
				: () => onSearch(myFriends)}
		/>
	</div>
</div>
{#if activeTab === 'my-friends'}
	<FriendsList friends={filteredFriends} removeAction={removeFriend} />
{/if}

{#if activeTab === 'friend-requests'}
	{#if filteredRequests.length}
		recived:
		<FriendsList
			friends={filteredRequests}
			mode="request"
			acceptAction={acceptFriendRequest}
			declineAction={declineFriendRequest}
		/>
	{/if}

	{#if filteredSent.length && filteredRequests.length}
		<div class="divider my-0 mx-6 " />
	{/if}

	{#if filteredSent.length}
		<FriendsList friends={filteredSent} mode="sent" declineAction={removeFriend} />
	{/if}
{/if}

{#if activeTab === 'search-friends'}
	<AddFriendList friends={foundFriends} action={addFriend} />
{/if}
