<script lang="ts">
	import Button from '../../components/Button.svelte';
	import InputText from '../../components/InputText.svelte';
	import Select from '../../components/Select.svelte';
	import { t } from '../../i18n/i18n';
	import type { Option } from '../../models';
	import { apiCall } from '../../utils/api-call';
	import { showAlert } from '../../utils/show-alert';

	export let data: { phonePrefixes: Option[] };

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const user = {
				name: formData.get('name') as string,
				surname: formData.get('surname') as string,
				password: formData.get('password') as string,
				email: formData.get('email') as string,
				phone: `${formData.get('prefix') as string}${formData.get('phone') as string}`,
				birthdate: formData.get('birthdate') as string
			};
			apiCall('/api/user', 'post', JSON.stringify(user));
			showAlert({ show: true, message: 'Signup success', isSuccess: true });
		} catch (error: unknown) {
			showAlert({ show: true, message: error as string, isError: true });
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
	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
		<InputText
			type="text"
			label="Name"
			id="name"
			name="name"
			placeholder="Insert the name"
			required={true}
			value=""
		/>
		<InputText
			type="text"
			label="Surname"
			id="surname"
			name="surname"
			placeholder="Insert the surname"
			required={true}
			value=""
		/>
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
	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-6">
		<InputText
			type="email"
			label="Email"
			id="email"
			name="email"
			placeholder="Insert the email"
			required={true}
			value=""
		/>
		<InputText
			type="date"
			label="Birthdate"
			id="birthdate"
			name="birthdate"
			placeholder="Insert the birthdate"
			required={true}
			value=""
		/>
	</div>
	<div class="grid gap-6 mb-6 md:grid-cols-12">
		<div class="col-span-2">
			<Select
				id="prefix"
				name="prefix"
				label="Prefix"
				options={data.phonePrefixes}
				required={true}
			/>
		</div>
		<div class="col-span-6">
			<InputText
				type="number"
				label="Phone"
				id="phone"
				name="phone"
				placeholder="Insert the phone"
				required={true}
				value=""
			/>
		</div>
	</div>
	<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-6">
		<div class="md:grid-cols-5" />
		<Button type="submit" text="Submit" />
	</div>
</form>
