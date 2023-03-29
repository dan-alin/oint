<script lang="ts">
	import AddFriendList from '../../components/friends/AddFriendList.svelte';
	import FriendsList from '../../components/friends/FriendsList.svelte';
	import ModalRadio from '../../components/ModalRadio.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import Tabs from '../../components/Tabs.svelte';
	import type { FriendRequests, RadioItem, User } from '../../models';
	import type { Friend, FriendData, FriendUser } from '../../models/friend';
	import { apiCall } from '../../utils/api-call';

	export let data: {
		myFriends: FriendData[];
		friendRequest: FriendRequests;
		notificationsUnread: Notification[];
	};
	let { myFriends, friendRequest, notificationsUnread } = data;

	let filteredFriends: FriendData[] = myFriends;
	let filteredRequests: FriendData[] = friendRequest.received;
	let filteredSent: FriendData[] = friendRequest.sent;
	let foundFriends: Friend[] = [];
	let notificationsUreadCount = notificationsUnread.length;

	const tabs = [
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

	const requestOptions = [
		{ label: 'Ricevute', value: 'recived' },
		{ label: 'Inviate', value: 'sent' }
	];

	const friendListOptions = [
		{ label: 'Predefinito', value: 'default' },
		{ label: 'Ordine alfabetico', value: 'alphabeth' },
		{ label: 'Recenti', value: 'recent' }
	];

	let activeTab = 'my-friends';
	let requestActive: RadioItem = requestOptions[0];
	let friendListActive: RadioItem = friendListOptions[0];
	let searchText = '';

	const removeFriend = async (friendRequestId: number, isRequest = false) => {
		//TODO type delete response
		type DeleteResponse = {
			message: string;
			status: number;
			user: FriendUser;
		};
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

		if (isRequest) {
			filteredSent = [
				...friendRequest.sent.filter((friend) => friend.user.id !== response.user.id)
			];
		} else {
			filteredFriends = [...myFriends.filter((friend) => friend.user.id !== response.user.id)];
		}
		// myFriends = myFriends.filter((friend) => friend.user.id !== response.user.id);
		// filteredFriends = [...myFriends];
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
	};

	const declineFriendRequest = async (friendRequestId: number) => {
		const request: any = await apiCall(
			'/api/reject-friend-request',
			'post',
			'Request declined',
			JSON.stringify({ friendRequestId }),
			sessionStorage.getItem('jwt_token') || ''
		);

		filteredRequests = [
			...friendRequest.received.filter((friend) => friend.user.id !== request.response.user.id)
		];
	};

	const addFriend = async (friendId: number) => {
		const friend: any = await apiCall(
			'/api/add-friend',
			'post',
			'Request sent',
			JSON.stringify({ friendId }),
			sessionStorage.getItem('jwt_token') || ''
		);

		filteredSent = [...filteredSent, friend.response];
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

	const changeFilter = (active: RadioItem) => {
		requestActive = active;
	};

	const changeOrder = (active: RadioItem) => {
		friendListActive = active;
		switch (active.value) {
			case 'alphabeth':
				filteredFriends = [...filteredFriends].sort((a, b) => {
					if (a.user.name < b.user.name) {
						return -1;
					}
					if (a.user.name > b.user.name) {
						return 1;
					}
					return 0;
				});
				break;
			case 'recent':
				filteredFriends = [...filteredFriends].sort((a, b) => {
					if (a.user.id < b.user.id) {
						return 1;
					}
					if (a.user.id > b.user.id) {
						return -1;
					}
					return 0;
				});
				break;
			default:
				filteredFriends = [...myFriends];
				break;
		}
	};

	//Reset searchbar when tab changes
	$: {
		if (activeTab !== null) searchText = '';
	}
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
	<div class="mx-6 mb-6 flex items-center justify-between">
		<p class=" text-lg ">{myFriends.length} amici</p>
		<div class="flex flex-col items-end text-xs">
			<p class=" font-bold text-primary">Ordina per:</p>
			<label for="friend-list" class="capitalize">{friendListActive.label} </label>
		</div>
	</div>

	<FriendsList friends={filteredFriends} removeAction={removeFriend} />
	<ModalRadio
		title="Ordina per"
		id="friend-list"
		options={friendListOptions}
		active={friendListActive}
		action={changeOrder}
	/>
{/if}

{#if activeTab === 'friend-requests'}
	<div class="mx-6 flex items-center justify-end ">
		<div class="flex flex-col items-end text-xs">
			<p class=" font-bold text-primary">Filtra per:</p>
			<label for="friend-request" class="capitalize">{requestActive.label} </label>
		</div>
	</div>
	{#if filteredRequests.length && requestActive.value === 'recived'}
		<FriendsList
			friends={filteredRequests}
			mode="request"
			acceptAction={acceptFriendRequest}
			declineAction={declineFriendRequest}
		/>
	{/if}

	{#if filteredSent.length && requestActive.value === 'sent'}
		<FriendsList friends={filteredSent} mode="sent" declineAction={removeFriend} />
	{/if}
	<ModalRadio
		title="Filtra per"
		id="friend-request"
		options={requestOptions}
		active={requestActive}
		action={changeFilter}
	/>
{/if}

{#if activeTab === 'search-friends'}
	<AddFriendList friends={foundFriends} action={addFriend} />
{/if}
