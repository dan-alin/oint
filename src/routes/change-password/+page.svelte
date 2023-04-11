<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import InputText from '../../components/InputText.svelte';
	import type { User } from '../../models';
	import { apiCall } from '../../utils/api-call';
	import { showAlert } from '../../utils/show-alert';

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const resetPassword = {
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				tempPassword: formData.get('tempPassword') as string
			};
			if (resetPassword.password !== formData.get('cpassword')) {
				throw new Error('Password mismatch');
			}
			const response: { access_token: string; user: User } = await apiCall(
				'/api/change-password-after-reset',
				'post',
				'Reset password success',
				JSON.stringify(resetPassword)
			);

			goto('/login');
		} catch (error: unknown) {
			showAlert({ show: true, message: error.message, isError: true });
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Change password" />
</svelte:head>

<div class="background-login bg-container pb-24" transition:fade>
	<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-4 px-8" style="height: 400px">
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
				id="tempPassword"
				name="tempPassword"
				placeholder="temporary password"
				required={true}
				value=""
			/>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3 ">
			<InputText
				type="password"
				id="password"
				name="password"
				placeholder="New password"
				required={true}
				value=""
			/>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3 ">
			<InputText
				type="password"
				id="cpassword"
				name="cpassword"
				placeholder="Confirm password"
				required={true}
				value=""
			/>
		</div>

		<div class="grid grid-cols-1  gap-6 md:grid-cols-3">
			<button class="btn-primary btn-sm btn capitalize" type="submit">Reset password</button>
		</div>
	</form>
</div>

<style>
	.background-login {
		background-image: url('/backgrounds/login.svg');
	}
</style>
