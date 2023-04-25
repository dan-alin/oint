<script lang="ts">
	import { Icons } from '../../enums';
	import Select from '../Select.svelte';
	import Icon from '../Icon.svelte';
	import AddLocationModal from './AddLocationModal.svelte';
	import SveltyPicker from 'svelty-picker';
	import { it } from '../../utils/datepicker-it';

	export let location_selection_type: 'single' | 'multi' = 'single';
	export let locations: { name: string; address: string }[] = [];
	export let location_selection_deadline_date: string | undefined = undefined;
	export let location_selection_deadline_time: string | undefined = undefined;
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

<form class="grid grid-cols-1 grid-rows-3 gap-6" id="3-part" on:submit|preventDefault>
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
				<div class="flex items-center gap-4">
					<div class="text-light-gray">
						<Icon icon={Icons.LOCATION_FULL} />
					</div>
					<div>
						<p class="text-xs font-semibold capitalize ">{location.name}</p>
						<p class="text-xs capitalize ">{location.address}</p>
					</div>
				</div>
				<button
					class="flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white"
					on:click={() => removeLocation(i)}
				>
					<Icon icon={Icons.CLOSE} size="14" />
				</button>
			</div>
		{/each}
	</div>
	{#if (location_selection_type === 'single' && locations.length < 1) || (location_selection_type === 'multi' && locations.length < 5)}
		<label for="modal-location" class="text-sm capitalize text-secondary underline">
			Aggiungi location
		</label>
	{/if}
	{#if location_selection_type === 'multi'}
		<div class="text-sm">
			<p class="font-bold">Mettiamo la location a sondaggio!</p>
			<p class="text-disabled">Dai un tempo ai tuoi amici per proporre e scegliere</p>
			<div class="mt-6 flex gap-2">
				<SveltyPicker
					inputClasses="input-bordered input h-10 grow text-sm px-1.5 bg-transparent"
					format="dd/mm/yyyy"
					placeholder="Giorno di scadenza"
					bind:value={location_selection_deadline_date}
					inputId="deadline_date"
					name="deadline date"
					i18n={it}
				/>
				<SveltyPicker
					inputClasses="input-bordered input h-10 grow text-sm px-1.5 bg-transparent"
					format="hh:ii"
					placeholder="Ora di scadenza"
					bind:value={location_selection_deadline_time}
					inputId="deadline_time"
					name="deadline time"
					mode="time"
					i18n={it}
				/>
			</div>
		</div>
	{/if}
</form>

{#key unique}
	<AddLocationModal action={getLocations} bind:isModalOpen />
{/key}
