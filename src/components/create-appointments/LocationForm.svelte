<script lang="ts">
	import { Icons } from '../../enums';

	// import Select from '../Select.svelte';

	import Icon from '../Icon.svelte';
	import AddLocationModal from './AddLocationModal.svelte';

	export let location_selection_type: 'single' | 'multi';
	export let locations: { name: string; address: string }[] = [];
	export let onSubmit: () => void;

	let unique = {};

	const getLocations = (location: { name: string; address: string }) => {
		locations = [...locations, location];
	};

	const removeLocation = (index: number) => {
		locations = locations.filter((_, i) => i !== index);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="grid grid-cols-1 grid-rows-3 gap-6  " id="3-part" on:submit|preventDefault={onSubmit}>
	<!-- <Select
		id="select-location-type"
		name="select-location-type"
		on:change={(event) => (location_selection_type = event.detail.value)}
		options={[
			{ text: 'Single', value: 'single', selected: true },
			{ text: 'Multi', value: 'multi' }
		]}
	/> -->
	{#each locations as location, i}
		<div class="flex flex-row justify-between">
			<div class="flex flex-col">
				<p class="text-sm font-semibold capitalize ">{location.name}</p>
				<p class="text-sm capitalize ">{location.address}</p>
			</div>
			<span on:click={() => removeLocation(i)}> <Icon icon={Icons.CLOSE} /></span>
		</div>
	{/each}
	{#if locations.length < 1}
		<label for="modal-location" class="text-sm capitalize text-secondary underline"
			>Aggiungi location</label
		>
	{/if}
	{#key unique}
		<AddLocationModal action={getLocations} />
	{/key}
</form>
