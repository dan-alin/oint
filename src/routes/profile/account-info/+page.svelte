<script lang="ts">
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import InputText from '../../../components/InputText.svelte';
	import { userStore } from '../../../stores/user';
	import ModalSuccess from '../../../components/ModalSuccess.svelte';
	import { apiCall } from '../../../utils/api-call';
	import type { User } from '../../../models';

	let birthdate = '';
	let disabled = true;
	let modalOpened = false;

	const setDate = () => {
		const date = new Date($userStore.birthdate);
		birthdate = `${date.getFullYear()}-${
			date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		}-${date.getDate()}`;
	};

	const toggleEdit = () => (disabled = !disabled);

	const onSubmit = async () => {
		console.log($userStore);
		const response: any = await apiCall(
			'/api/users',
			'post',
			'User updated',
			JSON.stringify({
				name: $userStore.name,
				surname: $userStore.surname,
				nickname: $userStore.nickname,
				birthdate: new Date(birthdate),
				email: $userStore.email,
				phone: $userStore.phone
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
		modalOpened = true;
	};

	const closeModal = () => (modalOpened = false);
	userStore.subscribe((value) => {
		if (value) {
			setDate();
		}
	});
</script>

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="informazioni" secondRow="Account" goto="/profile" />
	{#if $userStore}
		<form class="flex h-4/6  flex-col justify-between" on:submit|preventDefault={onSubmit}>
			<div>
				<h2 class="mb-2 text-base font-bold">Dati anagrafici</h2>
				<div class="mb-6 flex flex-col gap-4">
					<InputText
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						required
						bind:value={$userStore.name}
						{disabled}
					/>
					<InputText
						type="text"
						id="surname"
						name="surname"
						placeholder="Surname"
						required
						bind:value={$userStore.surname}
						{disabled}
					/>
					<InputText
						type="text"
						id="nickname"
						name="nickname"
						placeholder="Nickname"
						required
						bind:value={$userStore.nickname}
						{disabled}
					/>
					<InputText
						type="date"
						id="birthdate"
						name="birthdate"
						placeholder="birthdate"
						required
						bind:value={birthdate}
						{disabled}
					/>
				</div>
				<h2 class="mb-2 text-base font-bold">Contatti</h2>
				<div class="flex flex-col gap-4">
					<InputText
						type="text"
						id="mail"
						name="mail"
						placeholder="Mail"
						required
						bind:value={$userStore.email}
						{disabled}
					/>
					<InputText
						type="text"
						id="phone"
						name="phone"
						placeholder="Phone"
						required
						bind:value={$userStore.phone}
						{disabled}
					/>
				</div>
			</div>
			{#if disabled}
				<button type="button" class="btn-primary btn mt-2 w-full" on:click={toggleEdit}
					>Modifica</button
				>
			{:else}
				<button type="submit" class="btn-primary btn mt-2 w-full">Salva</button>
			{/if}
		</form>
	{/if}
</section>
<input type="checkbox" id="prova" class="modal-toggle" checked={modalOpened} />
<ModalSuccess id="prova" {closeModal} />
