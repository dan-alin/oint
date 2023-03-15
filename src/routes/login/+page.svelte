<script lang="ts">
	import { goto } from '$app/navigation';
	import Checkbox from '../../components/Checkbox.svelte';
	import InputText from '../../components/InputText.svelte';
	import type { User } from '../../models';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';

	let keepAccess = false;

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const user = {
				email: formData.get('email') as string,
				password: formData.get('password') as string
			};
			const response: { access_token: string; user: User } = await apiCall(
				'/api/login',
				'post',
				'Login success',
				JSON.stringify(user)
			);

			sessionStorage.setItem('jwt_token', await `Bearer ${response['access_token']}`);
			userStore.update(() => response.user);
			goto('/appointments');
		} catch (error: unknown) {
			console.error(error);
		}
	};

	// onMount(() => {
	// 	if (sessionStorage.getItem('jwt_token')) {
	// 		goto('/appointments');
	// 	}
	// });
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="A section to login" />
</svelte:head>

<!-- <h1 class="text-2xl font-bold capitalize flex justify-center">{$t('login.title')}</h1> -->

<div class="background-login bg-container">
	<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-4 px-8">
		<div class="flex flex-col gap-1">
			<h2 class="text-2xl">Rieccoti!</h2>
			<p class="text-md font-light ">
				Torniamo a pianificare questa settimana, pronto ad organizzare qualcosa di nuovo?
			</p>
		</div>

		<!-- TODO extract classes in an @apply -->
		<div class="grid grid-cols-1  gap-6 md:grid-cols-3 ">
			<InputText
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				required={true}
				value=""
			/>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3 ">
			<InputText
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				required={true}
				value=""
			/>
		</div>

		<div class="flex items-center justify-between">
			<Checkbox
				label="Rimani connesso"
				onChange={() => (keepAccess = !keepAccess)}
				checked={keepAccess}
			/>
			<a class=" text-xs text-secondary underline " href="/">Password dimenticata?</a>
		</div>

		<div class="grid grid-cols-1  gap-6 md:grid-cols-3">
			<button class="btn-primary btn-sm btn capitalize" type="submit">Accedi</button>
		</div>
	</form>
	<div class="divider px-6" />
	<div class="flex justify-center text-xs">
		<span>Non hai ancora un account?</span>
		<a class="text-secondary underline" href="/sign-up">Registrati</a>
	</div>
</div>

<style>
	.background-login {
		background-image: url('/backgrounds/Login_1.svg');
	}
</style>
