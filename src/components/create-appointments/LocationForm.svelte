<script lang="ts">
	import { Icons } from '../../enums';

	import Select from '../Select.svelte';

	import Icon from '../Icon.svelte';
	import AddLocationModal from './AddLocationModal.svelte';

	export let location_selection_type: 'single' | 'multi' = 'single';
	export let locations: { name: string; address: string }[] = [];

	let isModalOpen = false;

	let unique = {};

	//reset modal whenever it closes
	$: if (!isModalOpen) {
		unique = {};
	}

	const getLocations = (name: string, address: string) => {
		//trigger click on checkbox to close modal
		const modalLocationCheck = document.getElementById('modal-location') as HTMLInputElement;
		modalLocationCheck.click();

		const location = { name, address };
		locations = [...locations, location];
	};

	const removeLocation = (index: number) => {
		locations = locations.filter((_, i) => i !== index);
	};

	const handleChange = (e: any) => {
		location_selection_type = e.detail.value as 'single' | 'multi';
		locations = [];
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="grid grid-cols-1  gap-6  " id="3-part" on:submit|preventDefault>
	<Select
		id="select-location-type"
		name="select-location-type"
		on:change={(e) => handleChange(e)}
		options={[
			{ text: 'Single', value: 'single', selected: true },
			{ text: 'Multi', value: 'multi' }
		]}
	/>
	<div class="flex max-h-32 flex-col gap-4 overflow-auto">
		{#each locations as location, i}
			<div class="flex flex-row items-center justify-between">
				<div class="flex  items-center gap-4">
					<div class="  text-light-gray">
						<Icon icon={Icons.LOCATION_FULL} />
					</div>
					<div>
						<p class="text-xs font-semibold capitalize ">{location.name}</p>
						<p class="text-xs capitalize ">{location.address}</p>
					</div>
				</div>
				<span
					class="flex h-4 w-4  items-center justify-center rounded-full bg-secondary text-white"
					on:click={() => removeLocation(i)}
				>
					<Icon icon={Icons.CLOSE} size="14" /></span
				>
			</div>
		{/each}
	</div>

	{#if (location_selection_type === 'single' && locations.length < 1) || (location_selection_type === 'multi' && locations.length < 5)}
		<label for="modal-location" class="flex items-center gap-2 text-secondary">
			<Icon icon={Icons.ADD} />
			<span class="text-sm capitalize text-secondary underline">Aggiungi location</span>
		</label>
	{/if}
</form>

{#key unique}
	<AddLocationModal action={getLocations} bind:isModalOpen />
{/key}
