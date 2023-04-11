<script lang="ts">
	import { noop } from 'svelte/internal';
	import InputText from '../InputText.svelte';

	let location_name: string;
	let location_address: string;

	export let action: (location: { name: string; address: string }) => void = noop;

	const composeLocation = () => {
		return {
			name: location_name,
			address: location_address
		};
	};
</script>

<input type="checkbox" id="modal-location" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle" id="modal-location">
	<div class="modal-box flex flex-col gap-10">
		<h3 class="text-center text-lg font-bold">Aggiungi Location</h3>
		<InputText
			type="text"
			id="location_name"
			name="location name"
			placeholder="Nome location"
			required
			bind:value={location_name}
		/>

		<InputText
			type="text"
			id="location_address"
			name="location address"
			placeholder="Indirizzo"
			required
			bind:value={location_address}
		/>
		<div class="modal-action">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label
				for="modal-location"
				class="btn-primary btn h-10 w-full capitalize"
				on:click={() => action(composeLocation())}>Conferma</label
			>
		</div>
	</div>
</div>
