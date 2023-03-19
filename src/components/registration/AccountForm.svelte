<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: () => void;

	export let phone: string;
	export let email: string;
	export let password: string;
	export let passwordConfirmation: string;
</script>

<form
	class="grid grid-cols-1 grid-rows-3 gap-6"
	id="2-register"
	on:submit|preventDefault={onSubmit}
>
	<InputText
		type="number"
		id="phone"
		name="phone"
		placeholder="Cellulare"
		required
		bind:value={phone}
	/>
	<InputText type="email" id="email" name="email" placeholder="Email" required bind:value={email} />
	<InputText
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		required
		bind:value={password}
	/>
	<InputText
		type="password"
		id="confrm-password"
		name="confirm password"
		placeholder="Conferma password"
		required
		bind:value={passwordConfirmation}
	/>
</form>
