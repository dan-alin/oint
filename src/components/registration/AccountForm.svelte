<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: () => void;

	export let phone: string;
	export let email: string;
	export let password: string;
	export let passwordConfirmation: string;
	let passwordValidation = true;

	$: if (password === passwordConfirmation) {
		let input = document.getElementById('confirm-password') as HTMLInputElement;
		if (input) {
			input.setCustomValidity('');
			passwordValidation = input.validity.valid;
		}
	}

	const validate = () => {
		let input = document.getElementById('confirm-password') as HTMLInputElement;
		if (password !== passwordConfirmation) {
			input.setCustomValidity('Le password non coincidono');
		} else {
			input.setCustomValidity('');
		}
		passwordValidation = input.validity.valid;
	};

	const validatePhone = () => {
		let input = document.getElementById('phone') as HTMLInputElement;
		const phoneNrRegEx = /^3[\d]{9}$/;
		if (phoneNrRegEx.test(input.value)) {
			input.setCustomValidity('');
		} else {
			input.setCustomValidity('Inserire un numero di telefono valido');
		}
	};
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
		validate={validatePhone}
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
		id="confirm-password"
		name="confirm password"
		placeholder="Conferma password"
		required
		bind:value={passwordConfirmation}
		customValidation={passwordValidation}
		{validate}
	/>
</form>
