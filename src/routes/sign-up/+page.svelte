<script lang="ts">
	import Button from '../../components/Button.svelte';
	import InputText from '../../components/InputText.svelte';
	import { t } from '../../i18n/i18n';
	import { apiCall } from '../../utils/api-call';

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const user = {
				name: formData.get('name') as string,
				surname: formData.get('surname') as string,
				password: formData.get('password') as string,
				email: formData.get('email') as string,
				phone: `+${formData.get('phone') as string}`,
				birthdate: formData.get('birthdate') as string
			};
			apiCall('/api/user', 'post', JSON.stringify(user));
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>Sign up</title>
	<meta name="description" content="A section to sign up" />
</svelte:head>

<section />
<h1>{$t('signup.title')}</h1>
<form on:submit|preventDefault={onSubmit}>
	<div class="grid gap-6 mb-6 md:grid-cols-3">
		<InputText
			type="text"
			label="Name:"
			id="name"
			name="name"
			placeholder="Insert the name"
			required={true}
		/>
		<InputText
			type="text"
			label="Surname:"
			id="surname"
			name="surname"
			placeholder="Insert the surname"
			required={true}
		/>
		<InputText
			type="password"
			label="Password:"
			id="password"
			name="password"
			placeholder="Insert the password"
			required={true}
		/>
		<InputText
			type="email"
			label="Email:"
			id="email"
			name="email"
			placeholder="Insert the email"
			required={true}
		/>
		<InputText
			type="number"
			label="Phone:"
			id="phone"
			name="phone"
			placeholder="Insert the phone"
			required={true}
		/>
		<InputText
			type="date"
			label="Birthdate:"
			id="birthdate"
			name="birthdate"
			placeholder="Insert the birthdate"
			required={true}
		/>
	</div>
	<div class="grid gap-6 mb-6 md:grid-cols-6">
		<div class="col-span-5" />
		<Button type="submit" text="Submit" />
	</div>
</form>
