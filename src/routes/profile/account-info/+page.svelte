<script lang="ts">
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import InputText from '../../../components/InputText.svelte';
	import { userStore } from '../../../stores/user';
</script>

<section class="h-full px-6 pt-8 pb-28">
	<HeaderMenu firstRow="informazioni" secondRow="Account" />
	{#if $userStore}
		<form class="flex h-full flex-col justify-between">
			<div>
				<h2 class="mb-2 text-base font-bold">Dati anagrafici</h2>
				<div class="mb-6 flex flex-col gap-6">
					<InputText
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						required
						bind:value={$userStore.name}
						disabled
					/>
					<InputText
						type="text"
						id="surname"
						name="surname"
						placeholder="Surname"
						required
						bind:value={$userStore.surname}
						disabled
					/>
					<InputText
						type="text"
						id="nickname"
						name="nickname"
						placeholder="Nickname"
						required
						bind:value={$userStore.nickname}
						disabled
					/>
					<InputText
						type="date"
						id="birthdate"
						name="birthdate"
						placeholder="birthdate"
						required
						bind:value={$userStore.birthdate}
						disabled
					/>
				</div>
				<h2 class="mb-2 text-base font-bold">Contatti</h2>
				<div class="flex flex-col gap-6">
					<InputText
						type="text"
						id="mail"
						name="mail"
						placeholder="Mail"
						required
						bind:value={$userStore.email}
						disabled
					/>
					<InputText
						type="text"
						id="phone"
						name="phone"
						placeholder="Phone"
						required
						bind:value={$userStore.phone}
						disabled
					/>
				</div>
			</div>
			<button class="btn-primary btn w-full">Modifica</button>
		</form>
	{/if}
</section>
