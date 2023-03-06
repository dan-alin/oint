<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '../../components/Card.svelte';
	import InputText from '../../components/InputText.svelte';
	import { t } from '../../i18n/i18n';
	import { apiCall } from '../../utils/api-call';

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const user = {
				email: formData.get('email') as string,
				password: formData.get('password') as string
			};
			const response: { access_token: string } = await apiCall(
				'/api/login',
				'post',
				'Login success',
				JSON.stringify(user)
			);
			sessionStorage.setItem('jwt_token', await `Bearer ${response['access_token']}`);
			goto('/appointments');
		} catch (error: unknown) {
			console.error(error);
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="A section to login" />
</svelte:head>

<section />

<h1 class="text-2xl font-bold uppercase flex justify-center">{$t('login.title')}</h1>
<form on:submit|preventDefault={onSubmit} class="px-2 py-10">
	<!-- TODO extract classes in an @apply -->
	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
		<div class="col-span-1" />
		<InputText
			type="email"
			label="Email"
			id="email"
			name="email"
			placeholder="Insert the email"
			required={true}
			value=""
		/>
	</div>

	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
		<div class="col-span-1" />
		<InputText
			type="password"
			label="Password"
			id="password"
			name="password"
			placeholder="Insert the password"
			required={true}
			value=""
		/>
	</div>

	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
		<div class="col-span-1" />
		<button class="btn" type="submit">Login</button>
	</div>
</form>
