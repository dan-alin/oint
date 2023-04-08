<script lang="ts">
	import { Icons } from '../../enums';
	import type { FriendUser } from '../../models';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';
	import Icon from '../Icon.svelte';
	import InputText from '../InputText.svelte';

	type ViewType = 'owner' | 'inviteeRead' | 'inviteeEdit';

	export let viewType: ViewType;
	export let open = false;
	export let friends: FriendUser[];
	export let invitees: FriendUser[] = [];
	export let appointmentId: number | undefined;
	export let creatorId: number;

	let loggedUserId = $userStore.id;
	invitees = invitees.filter((i) => i.id !== creatorId);
	friends = friends.filter((f) => f.id !== creatorId);

	const modalTitle: { [key in ViewType]: string } = {
		owner: 'Modifica partecipanti',
		inviteeRead: 'Tutti i partecipanti',
		inviteeEdit: 'Invita altri amici'
	};
	let filteredFriends: FriendUser[];
	$: if (viewType === 'inviteeRead') {
		filteredFriends = invitees;
	} else {
		filteredFriends = friends;
	}
	let invitedFriendsIds = invitees.map((i) => i.id);
	const inviteesToAdd: number[] = [];
	$: group = [...invitedFriendsIds, ...inviteesToAdd];
	let searchValue: string;
	let modalBody: HTMLDivElement;

	const filterFriendList = () => {
		if (viewType === 'inviteeRead') {
			filteredFriends = invitees.filter((friend) => {
				return friend.name.toLowerCase().includes(searchValue.toLowerCase());
			});
		} else {
			filteredFriends = friends.filter((friend) => {
				return friend.name.toLowerCase().includes(searchValue.toLowerCase());
			});
		}
	};

	const handleClickOutside = (e: MouseEvent | KeyboardEvent) => {
		if (e.type == 'click') {
			if (e.target && !modalBody.contains(e.target as Node)) open = false;
		} else {
			const keyboardE = e as KeyboardEvent;
			if (keyboardE.key === 'Escape') open = false;
		}
	};

	const saveInvitees = async () => {
		const inviteesToRemove = invitees
			.map((i) => i.id)
			.filter((id) => !invitedFriendsIds.includes(id));

		// wait for change-invitees endpoint
		// const response: any = await apiCall(
		// 	'/api/change-invitees',
		// 	'post',
		// 	'Invitati modificati con successo',
		// 	JSON.stringify({
		// 		appointmentId,
		// 		inviteesToAdd,
		// 		inviteesToRemove
		// 	}),
		// 	sessionStorage.getItem('jwt_token') || ''
		// );
	};
</script>

<div
	class="modal modal-bottom z-[51] md:modal-middle "
	id="add-invitees-modal"
	class:modal-open={open}
	on:click={handleClickOutside}
	on:keydown={handleClickOutside}
>
	<div bind:this={modalBody} class="modal-box flex h-[90%] flex-col bg-base-100 pb-10">
		<!-- Title and subtitle -->
		<button class="absolute right-7 top-7" on:click={() => (open = false)}>
			<Icon icon={Icons.CLOSE} size="15" />
		</button>
		<div class="mt-[4.5rem] text-center">
			<h2 class="text-xl font-bold">{modalTitle[viewType]}</h2>
			<h3>
				{viewType === 'inviteeRead'
					? 'La tua VIP list è composta da ' +
					  (filteredFriends?.length || 0) +
					  ' partecipant' +
					  (filteredFriends?.length === 1 ? 'e' : 'i')
					: 'Ti sei dimenticato qualcuno?'}
			</h3>
		</div>

		<!-- search bar -->
		<div class="mt-4">
			<InputText
				id="search-friends"
				name="search"
				type="text"
				placeholder="Cerca"
				bind:value={searchValue}
				onInput={filterFriendList}
			/>
		</div>

		<ul class="mt-10">
			{#each filteredFriends as friend}
				<li
					class="mt-4 flex items-center gap-4 border-b border-solid border-disabled pb-4 first:mt-0"
				>
					<!-- propic -->
					<div class="avatar">
						<div class="w-12 rounded-full">
							{#if !friend.image}
								<Icon icon={Icons.PROFILE_FULL} size="48" />
							{:else}
								<img src={friend.image} alt={'Foto profilo di ' + friend.name} />
							{/if}
						</div>
					</div>
					<!-- name + friends count -->
					<div class="text-sm">
						<p class="m-0 font-bold">
							{friend.name}
							{friend.surname}
							{friend.id === loggedUserId ? ' (tu)' : ''}
						</p>
						<p class="m-0">
							235 amici
							<!-- TODO: sostituire con valore reale -->
						</p>
					</div>
					<!-- invited checkbox -->
					{#if viewType === 'owner' || viewType === 'inviteeEdit'}
						<input
							type="checkbox"
							bind:group
							name="invitedFriendIds"
							value={friend.id}
							disabled={viewType === 'inviteeEdit' && invitedFriendsIds.includes(friend.id)}
							class="checkbox-secondary checkbox checkbox-xs ml-auto rounded"
						/>
					{/if}
				</li>
			{/each}
		</ul>
		{#if viewType === 'owner' || viewType === 'inviteeEdit'}
			<button class="btn-primary btn mt-auto w-full" on:click={saveInvitees}>
				{viewType === 'owner' ? 'Salva' : 'Invita!'}
			</button>
		{/if}
	</div>
</div>
