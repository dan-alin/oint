<script lang="ts">
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import Icon from '../../../components/Icon.svelte';
	import InputText from '../../../components/InputText.svelte';
	import { Icons } from '../../../enums';

	let password = '';
	let confirmPassword = '';
	const onSubmit = () => console.log('submit');
	const allCases = (password: string) => {
		const upper = /[A-Z]/.test(password);
		const lower = /[a-z]/.test(password);
		return upper && lower;
	};

	const hasNumber = (password: string) => {
		const number = /[0-9]/.test(password);
		return number;
	};

	const hasSpecial = (password: string) => {
		const special = /[!_?*-]/.test(password);
		return special;
	};
</script>

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="Modifica" secondRow="Password" goto="/profile" />
	<p class="mb-6 text-base">
		Qua puoi modificare la password associata al tuo account. Ti servirà per effettuare l'accesso
		sia da web che da mobile
	</p>
	<p class="mb-2 text-base">La tua password deve avere:</p>
	<ul class="mb-6">
		<li class="flex items-center text-base">
			<span class="mr-1 flex flex-col">
				{#if password.length < 8}
					<Icon icon={Icons.DENIED} size="18" />
				{:else}
					<Icon icon={Icons.ACCEPTED} size="18" />
				{/if}
			</span>almeno 8 caratteri
		</li>
		<li class="flex items-center text-base">
			<span class="mr-1 flex flex-col"
				>{#if !allCases(password)}
					<Icon icon={Icons.DENIED} size="18" />
				{:else}
					<Icon icon={Icons.ACCEPTED} size="18" />
				{/if}</span
			>lettere maiuscole e minuscole
		</li>
		<li class="flex items-center text-base">
			<span class="mr-1 flex flex-col"
				>{#if !hasNumber(password)}
					<Icon icon={Icons.DENIED} size="18" />
				{:else}
					<Icon icon={Icons.ACCEPTED} size="18" />
				{/if}</span
			>almeno un numero
		</li>
		<li class="flex items-center text-base">
			<span class="mr-1 flex flex-col"
				>{#if !hasSpecial(password)}
					<Icon icon={Icons.DENIED} size="18" />
				{:else}
					<Icon icon={Icons.ACCEPTED} size="18" />
				{/if}</span
			>almeno 1 dei seguenti caratteri speciali: !_*?-
		</li>
	</ul>
	<form class="flex h-4/6  flex-col justify-between" on:submit|preventDefault={onSubmit}>
		<div>
			<div class="mb-6 flex flex-col gap-4">
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
					id="confirmPassword"
					name="confirmPassword"
					placeholder="Conferma password"
					required
					bind:value={confirmPassword}
				/>
			</div>
		</div>
		<div class="flex justify-end">
			<button class="btn-primary btn" type="submit">Salva</button>
		</div>
	</form>
</section>
