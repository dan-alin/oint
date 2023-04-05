<script lang="ts">
	import Icon from '../../components/Icon.svelte';
	import ChangeProfilePictureModal from '../../components/profile/ChangeProfilePictureModal.svelte';
	import { Icons } from '../../enums';
	import type { User } from '../../models';
	import { userStore } from '../../stores/user';

	export let data: { myStats: { appointments: number; friends: number } };
	const { myStats } = data;

	const sections = [
		{ title: 'Informazioni account', link: '/profile' },
		{ title: 'Gestione account', link: '/profile' },
		{ title: 'Impostazioni generali', link: '/profile' }
	];
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
	{#each sections as section}
		<div class="min-h-12 flex w-full cursor-pointer items-center gap-4 px-4">
			<div class="flex w-full ">
				<p class=" align-middl w-full self-center font-bold hover:text-warning">
					{section.title}
				</p>
				<a href={section.link}><Icon icon={Icons.ARROW_RIGHT} size="18" /></a>
			</div>
		</div>
		<div class="divider my-0" />
	{/each}
	<div class="min-h-12 flex w-full items-center gap-4 px-4">
		<div class="flex">
			<button class=" w-full self-center align-middle font-bold text-primary">Logout</button>
		</div>
	</div>
	<input type="checkbox" id="change-profile-picture-modal" class="modal-toggle" />
	<ChangeProfilePictureModal />
</section>
