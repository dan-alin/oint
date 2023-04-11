<script lang="ts">
	import { goto } from '$app/navigation';
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import Icon from '../../../components/Icon.svelte';
	import InputText from '../../../components/InputText.svelte';
	import ModalSuccess from '../../../components/ModalSuccess.svelte';
	import { Endpoints, Icons } from '../../../enums';
	import type { User } from '../../../models';
	import { userStore } from '../../../stores/user';
	import { apiCall } from '../../../utils/api-call';

	let password = '';
	let confirmPassword = '';
	let modalOpened = false;
	let unique = {};

	const restart = () => (unique = {});

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

	const onSubmit = async () => {
		const response: { access_token: string; user: User } = await apiCall(
			Endpoints.CHANGE_PASSWORD,
			'post',
			'',
			JSON.stringify({ password }),
			sessionStorage.getItem('jwt_token') || ''
		);
		modalOpened = true;
	};

	const closeModal = () => {
		modalOpened = false;
		password = '';
		confirmPassword = '';
		restart();
	};
</script>

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="Modifica" secondRow="Password" goto="/profile" />
	<form class="flex h-5/6 flex-col justify-between" on:submit|preventDefault={onSubmit}>
		<div>
			<p class="mb-6 text-base">
				Qua puoi modificare la password associata al tuo account. Ti servirà per effettuare
				l'accesso sia da web che da mobile
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
			{#key unique}
				<div class="flex h-3/4  flex-col justify-between">
					<div class="mb-6 flex flex-col gap-4">
						<InputText
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							required
							bind:value={password}
							enableShowHide={true}
						/>
						<InputText
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Conferma password"
							required
							bind:value={confirmPassword}
							enableShowHide={true}
						/>
					</div>
				</div>
			{/key}
		</div>
		<button
			class="btn-primary btn w-full"
			disabled={password.length < 8 ||
				!allCases(password) ||
				!hasNumber(password) ||
				!hasSpecial(password) ||
				password !== confirmPassword}>Salva</button
		>
	</form>
</section>
<ModalSuccess
	{modalOpened}
	id="successModal"
	onConfirm={closeModal}
	title="La tua password è ora modificata!"
	subTitle="Non ti preoccupare non la condivideremo con nessuno... neanche con i nostri nonni che non sanno nemmeno cosa sia una password!"
	confirmBtnLabel="Ok"
/>
