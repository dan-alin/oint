<script lang="ts">
	import Icon from '../../components/Icon.svelte';
	import Menu from '../../components/Menu.svelte';
	import ChangeProfilePictureModal from '../../components/profile/ChangeProfilePictureModal.svelte';
	import { Icons } from '../../enums';
	import { userStore } from '../../stores/user';

	export let data: { myStats: { appointments: number; friends: number } };
	const { myStats } = data;

	const sections = [
		{ title: 'Informazioni account', link: '/profile/account-info' },
		{ title: 'Gestione account', link: '/profile/account-settings' }
		/*{ title: 'Impostazioni generali', link: '/profile' }*/
	];

	const logout = () => {
		sessionStorage.removeItem('jwt_token');
		window.location.href = '/login';
	};
</script>

<section class="flex flex-col items-center pt-4">
	{#if $userStore}
		<div class="relative mb-6 flex justify-center">
			<div class="avatar">
				<div class="w-[144px] rounded-full">
					{#if $userStore.image}
						<img src={$userStore.image} alt="avatar" />
					{:else}
						<Icon icon={Icons.PROFILE_FULL} />
					{/if}
				</div>
				<label
					class="btn-outline btn-sm btn-circle btn absolute bottom-1 right-0 bg-white"
					for="change-profile-picture-modal"
				>
					<Icon icon={Icons.EDIT} size="16" />
				</label>
			</div>
		</div>
		<p class="mb-4 text-3xl font-bold">{`${$userStore.name} ${$userStore.surname}`}</p>
		<div class="mb-8 flex justify-center">
			<p class="flex items-center p-2">
				<span class="mr-1"><Icon icon={Icons.DATE} /></span>{myStats.appointments} eventi
			</p>
			<div class="divider divider-horizontal" />
			<p class="flex items-center p-2">
				<span class="mr-1"><Icon icon={Icons.FRIENDS_OUTLINE} /></span>{myStats.friends} amici
			</p>
		</div>
	{/if}
	<Menu {sections} />
	<div class="min-h-12 flex w-full items-center gap-4 px-4">
		<div class="flex">
			<button class=" w-full self-center align-middle font-bold text-primary" on:click={logout}
				>Logout</button
			>
		</div>
	</div>
	<input type="checkbox" id="change-profile-picture-modal" class="modal-toggle" />
	<ChangeProfilePictureModal />
</section>
