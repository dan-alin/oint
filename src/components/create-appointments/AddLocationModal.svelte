<script lang="ts">
	import { noop } from 'svelte/internal';
	import InputText from '../InputText.svelte';

	let location_name: string;
	let location_address: string;

	export let action: (name: string, address: string) => void = noop;
	export let isModalOpen = false;
</script>

<input type="checkbox" id="modal-location" class="modal-toggle" bind:checked={isModalOpen} />
<label for="modal-location" class="modal modal-bottom sm:modal-middle">
	<label for="" class="modal-box flex flex-col gap-10">
		<h3 class="text-center text-lg font-bold">Aggiungi Location</h3>
		<InputText
			type="text"
			id="location_name"
			name="location_name"
			placeholder="Nome location"
			required
			bind:value={location_name}
		/>

		<InputText
			type="text"
			id="location_address"
			name="location_address"
			placeholder="Indirizzo"
			required
			bind:value={location_address}
		/>
		<div class="modal-action">
			<button
				class="btn-primary btn-sm btn h-10 w-full capitalize"
				class:btn-disabled={!location_name || !location_address}
				on:click={() => action(location_name, location_address)}>Conferma</button
			>
		</div>
	</label>
</label>
