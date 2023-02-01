<script lang="ts">
	import Button from '../../components/Button.svelte';
	import InputText from '../../components/InputText.svelte';
	import { t } from '../../i18n/i18n';
	import { isMobileStore } from '../../stores/mobile';
	import { apiCall } from '../../utils/api-call';

	let isMobile: boolean;

	isMobileStore.subscribe((value) => {
		isMobile = value;
	});

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
				JSON.stringify(user)
			);
			sessionStorage.setItem('jwt_token', await `Bearer ${response['access_token']}`);
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="A section to login" />
</svelte:head>

<section />
<h1>{$t('login.title')}</h1>
<form on:submit|preventDefault={onSubmit}>
	<div class="grid gap-6 mb-6 grid-cols-1" class:md:grid-cols-3={!isMobile}>
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
	<div class="grid gap-6 mb-6 grid-cols-1" class:md:grid-cols-3={!isMobile}>
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

	<div class="grid gap-6 mb-6 grid-cols-1 " class:md:grid-cols-3={!isMobile}>
		<div class="col-span-1" />
		<Button type="submit" text="Login" />
	</div>
</form>
