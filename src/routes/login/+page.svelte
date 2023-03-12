<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from 'postcss';
	import { onMount } from 'svelte';
	import InputText from '../../components/InputText.svelte';
	import { t } from '../../i18n/i18n';
	import type { User } from '../../models';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';

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

<!-- <section /> -->

<!-- <h1 class="text-2xl font-bold capitalize flex justify-center">{$t('login.title')}</h1> -->
<div class="h-2/5" />
<form on:submit|preventDefault={onSubmit} class="px-8 flex flex-col gap-6">
	<div class="flex flex-col gap-1">
		<h2 class="text-2xl">Bentornato!</h2>
		<p class="text-md font-light">
			Torniamo a pianificare questa settimana, pronto ad organizzare qualcosa di nuovo?
		</p>
	</div>

	<!-- TODO extract classes in an @apply -->
	<div class="grid gap-6  grid-cols-1 md:grid-cols-3">
		<InputText type="email" id="email" name="email" placeholder="Email" required={true} value="" />
	</div>

	<div class="grid gap-6 grid-cols-1 md:grid-cols-3">
		<InputText
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			required={true}
			value=""
		/>
	</div>

	<div class="flex justify-between items-center">
		<div class="flex gap-2 items-center text-xs">
			<input type="checkbox" checked={true} class="checkbox h-4 w-4 rounded-md" /> Rimani connesso
		</div>
		<a class="text-xs text-secondary underline " href="/">Password dimenticata?</a>
	</div>

	<div class="grid gap-6  grid-cols-1 md:grid-cols-3">
		<button class="btn capitalize btn-primary btn-sm" type="submit">Accedi</button>
	</div>
</form>
<div class="divider px-6" />
<div class="flex justify-center text-xs">
	<span>Non hai ancora un account?</span>
	<a class="text-secondary underline" href="/register">Registrati</a>
</div>

<style>
	.blue {
		position: absolute;
		width: 28px;
		height: 318px;
		left: 0px;
		top: 23px;

		/* Color/primary/blue */

		background: #2e46ff;
		border-radius: 80px;
		transform: rotate(45deg);
	}

	.red {
		position: absolute;
		width: 68px;
		height: 271px;
		left: 239px;
		top: 69px;

		/* Color/primary/fucsia */

		background: #ff5580;
		border-radius: 80px;
		transform: rotate(45deg);
	}

	.yellow {
		position: absolute;
		width: 19px;
		height: 111px;
		left: 94px;
		top: 76px;

		/* Color/primary/yellow */

		background: #ffdc00;
		border-radius: 80px;
		transform: rotate(45deg);
	}
</style>
