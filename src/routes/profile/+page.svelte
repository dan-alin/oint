<script lang="ts">
	import Icon from '../../components/Icon.svelte';
	import Menu from '../../components/Menu.svelte';
	import { Icons } from '../../enums';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';

	export let data: { myStats: { appointments: number; friends: number } };
	const { myStats } = data;

	const sections = [
		{ title: 'Informazioni account', link: '/profile/account-info' },
		{ title: 'Gestione account', link: '/profile/account-settings' }
		/*{ title: 'Impostazioni generali', link: '/profile' }*/
	];

	let inputFile: HTMLInputElement;

	const logout = () => {
		sessionStorage.removeItem('jwt_token');
		window.location.href = '/login';
	};

	const handleFileInputChange = (event: any) => {
		const filereader = new FileReader();
		filereader.readAsDataURL(event.target.files[0]);
		filereader.onload = async (evt: any) => {
			var base64 = evt.target.result;
			await apiCall(
				'/api/profile-image',
				'post',
				'Request sent',
				JSON.stringify({ image: base64 }),
				sessionStorage.getItem('jwt_token') || ''
			);
			userStore.update((user) => ({ ...user, image: base64 }));
		};
	};
</script>

<section class="flex h-screen flex-col  px-6 pt-8 pb-10">
	{#if $userStore}
		<div class="relative  flex w-full items-center justify-center">
			<img class="m-auto" height="190x" src="/icons/colored_lines_bg.svg" alt="" />
			<div class="avatar absolute z-10 mb-4">
				<div class=" w-[120px] rounded-full">
					{#if $userStore.image}
						<img src={$userStore.image} alt="avatar" />
					{:else}
						<img src={'/icons/profile-gray.svg'} alt="avatar" />
					{/if}
				</div>
				<label
					class="btn-outline btn-sm btn-circle btn absolute bottom-1 right-0 z-20 bg-white"
					for="change-profile-picture"
				>
					<input
						type="file"
						id="change-profile-picture"
						class="hidden"
						bind:this={inputFile}
						on:change={handleFileInputChange}
					/>

					<Icon icon={Icons.EDIT} size="16" />
				</label>
			</div>
		</div>
		<p class="mb-4 text-center text-3xl font-bold">{`${$userStore.name} ${$userStore.surname}`}</p>
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
	<div class="min-h-12 flex w-full items-center gap-4 ">
		<div class="flex">
			<button class=" w-full self-center align-middle font-bold text-primary" on:click={logout}
				>Logout</button
			>
		</div>
	</div>
	<!-- <input type="checkbox" id="change-profile-picture-modal" class="modal-toggle" />
	<ChangeProfilePictureModal /> -->
</section>
