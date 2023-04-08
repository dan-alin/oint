<script lang="ts">
	import { get } from 'svelte/store';
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import InputText from '../../../components/InputText.svelte';
	import { userStore } from '../../../stores/user';

	const user = get(userStore);
	let birthdate = '';
	let disabled = true;

	const setDate = () => {
		const date = new Date(user.birthdate);
		birthdate = `${date.getFullYear()}-${
			date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		}-${date.getDate()}`;
	};
	setDate();

	const toggleEdit = () => (disabled = !disabled);

	const onSubmit = () => {
		console.log('submit');
	};
</script>

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="informazioni" secondRow="Account" />

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
					bind:value={user.name}
					{disabled}
				/>
				<InputText
					type="text"
					id="surname"
					name="surname"
					placeholder="Surname"
					required
					bind:value={user.surname}
					{disabled}
				/>
				<InputText
					type="text"
					id="nickname"
					name="nickname"
					placeholder="Nickname"
					required
					bind:value={user.nickname}
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
					bind:value={user.email}
					{disabled}
				/>
				<InputText
					type="text"
					id="phone"
					name="phone"
					placeholder="Phone"
					required
					bind:value={user.phone}
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
</section>
