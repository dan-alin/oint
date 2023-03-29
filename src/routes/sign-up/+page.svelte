<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import AccountForm from '../../components/registration/AccountForm.svelte';
	import RegistryForm from '../../components/registration/RegistryForm.svelte';

	import { t } from '../../i18n/i18n';

	import { apiCall } from '../../utils/api-call';

	// export let data: { phonePrefixes: Option[] };

	let step = 1;
	let formData: any = {
		name: '',
		surname: '',
		nickname: '',
		birthdate: '',
		phone: '',
		email: '',
		password: '',
		prefix: '+39',
		passwordConfirmation: ''
	};

	const onSubmit = async () => {
		const user = {
			name: formData.name,
			surname: formData.surname,
			nickname: formData.nickname,
			password: formData.password,
			email: formData.email,
			phone: `${formData.prefix}${formData.phone}`,
			birthdate: formData.birthdate
		};
		try {
			await apiCall('/api/user', 'post', 'Signup success', JSON.stringify(user));
			goto('/login');
		} catch (error) {
			console.log(error);
		}
	};

	const nextStep = () => {
		step++;
	};
</script>

<svelte:head>
	<title>{$t('signup.title')}</title>
	<meta name="description" content="A section to sign up" />
</svelte:head>

<div class={`background-${step} bg-container pb-6`} transition:fade>
	<div class="flex flex-col gap-4 px-8">
		<div class="flex flex-col gap-1">
			<h2 class="text-2xl">Ciao!</h2>
			<p class="text-md font-light ">
				Iscriviti ora e scopri i vantaggi di essere un nostro utente!
			</p>
		</div>
		<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 ">
			{#if step === 1}
				<RegistryForm
					onSubmit={nextStep}
					bind:name={formData.name}
					bind:surname={formData.surname}
					bind:nickname={formData.nickname}
					bind:birthdate={formData.birthdate}
				/>
			{:else if step === 2}
				<AccountForm
					{onSubmit}
					bind:phone={formData.phone}
					bind:email={formData.email}
					bind:password={formData.password}
					bind:passwordConfirmation={formData.passwordConfirmation}
				/>
			{/if}
			<button
				class="btn-primary btn-sm btn h-10 capitalize"
				type="submit"
				disabled={step === 1
					? !formData.name || !formData.surname || !formData.nickname || !formData.birthdate
					: !formData.phone ||
					  !formData.email ||
					  !formData.password ||
					  !formData.passwordConfirmation}
				form={`${step}-register`}>Iniziamo!</button
			>
		</div>
		<div class="flex justify-center text-xs">
			<span>Hai già un account?</span>
			<a class="text-secondary underline" href="/login">Accedi</a>
		</div>
	</div>
</div>

<style>
	.background-1 {
		background-image: url('/backgrounds/register-checklist.svg');
	}

	.background-2 {
		background-image: url('/backgrounds/register-step.svg');
	}
</style>
