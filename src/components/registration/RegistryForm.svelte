<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: () => void;

	export let name: string;
	export let surname: string;
	export let nickname: string;
	export let birthdate: string;
</script>

<form
	class="grid grid-cols-1 grid-rows-3 gap-6  "
	id="1-register"
	on:submit|preventDefault={onSubmit}
>
	<InputText type="text" id="name" name="name" placeholder="Nome" required bind:value={name} />
	<InputText
		type="text"
		id="surname"
		name="surname"
		placeholder="Cognome"
		required
		bind:value={surname}
	/>
	<InputText
		type="text"
		id="nickname"
		name="nickname"
		placeholder="Nickename"
		required
		bind:value={nickname}
	/>
	<InputText
		type="date"
		id="birthdate"
		name="birthdate"
		placeholder="Data di nascita"
		required
		bind:value={birthdate}
	/>
</form>
