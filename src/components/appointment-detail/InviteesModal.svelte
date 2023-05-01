<script lang="ts">
	import { Icons } from '../../enums';
	import type { Appointment, FriendUser } from '../../models';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';
	import Icon from '../Icon.svelte';
	import InputText from '../InputText.svelte';
	import BaseBottomModal from './BaseBottomModal.svelte';

	type ViewType = 'owner' | 'inviteeRead' | 'inviteeEdit';

	export let viewType: ViewType;
	export let open = false;
	export let friends: FriendUser[];
	export let invitees: FriendUser[] = [];
	export let appointment: Appointment;

	let loggedUserId = $userStore.id;
	invitees = invitees.filter((i) => i.id !== appointment.creator_id);
	friends = friends.filter((f) => f.id !== appointment.creator_id);

	const modalTitle: { [key in ViewType]: string } = {
		owner: 'Modifica partecipanti',
		inviteeRead: 'Tutti i partecipanti',
		inviteeEdit: 'Invita altri amici'
	};

	$: filteredFriends = viewType === 'inviteeRead' ? invitees : friends;
	let invitedFriendsIds = invitees.map((i) => i.id);
	let searchValue: string;

	const filterFunc = (friend: FriendUser) => {
		return friend.name.toLowerCase().includes(searchValue.toLowerCase());
	};

	const filterFriendList = () => {
		filteredFriends =
			viewType === 'inviteeRead' ? invitees.filter(filterFunc) : friends.filter(filterFunc);
	};

	const saveInvitees = async () => {
		const inviteesToRemove = invitees
			.map((i) => i.id)
			.filter((id) => !invitedFriendsIds.includes(id) && id !== loggedUserId);
		const inviteesToAdd = invitedFriendsIds.filter((id) => !invitees.map((i) => i.id).includes(id));

		if (inviteesToAdd.length === 0 && inviteesToRemove.length === 0) {
			open = false;
			return;
		}

		appointment = await apiCall<Appointment>(
			'/api/change-invitees',
			'post',
			'Invitati modificati con successo',
			JSON.stringify({
				appointmentId: appointment.id,
				inviteesToAdd,
				inviteesToRemove
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
		open = false;
	};

	$: subTitle =
		viewType === 'inviteeRead'
			? 'La tua VIP list è composta da ' +
			  (filteredFriends?.length || 0) +
			  ' partecipant' +
			  (filteredFriends?.length === 1 ? 'e' : 'i')
			: 'Ti sei dimenticato qualcuno?';
	$: btnLabel = viewType === 'owner' ? 'Salva' : viewType === 'inviteeEdit' ? 'Invita' : undefined;
</script>

<BaseBottomModal
	id="invitees-modal"
	title={modalTitle[viewType]}
	{subTitle}
	{btnLabel}
	bind:open
	on:click={saveInvitees}
>
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
					<p class="m-0 text-left">
						<!-- TODO: sostituire con valore reale -->
						{'235'} amici
					</p>
				</div>
				<!-- invited checkbox -->
				{#if viewType === 'owner' || viewType === 'inviteeEdit'}
					<input
						type="checkbox"
						bind:group={invitedFriendsIds}
						name="invitedFriendIds"
						value={friend.id}
						disabled={viewType === 'inviteeEdit' && invitees.some((i) => i.id === friend.id)}
						class="checkbox-secondary checkbox checkbox-xs ml-auto rounded"
					/>
				{/if}
			</li>
		{/each}
	</ul>
</BaseBottomModal>
