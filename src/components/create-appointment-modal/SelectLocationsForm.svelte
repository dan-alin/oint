<script lang="ts">
	import type {Location} from '../../models/locations';
	import type {Place} from '../../models/place';
	import {apiCall} from '../../utils/api-call';
	import InputAction from '../InputAction.svelte';
	import Select from '../Select.svelte';
	import InputText from "../InputText.svelte";

	export let onSubmit: (locations: Location[], location_selection_type: 'single' | 'multi', location_selection_deadline_date: string,location_selection_deadline_time: string) => void;
	export let locations: Location[];
	export let location_selection_type: 'single' | 'multi';
	export let location_selection_deadline_date: string;
	export let location_selection_deadline_time: string

	let addedPlaces: Place[] = [];
	let places: Place[];

	const onSearchPlaces = async (text: string) => {
		const response: Place[] = await apiCall(
				'/api/places',
				'post',
				'',
				JSON.stringify({
					search: text
				}),
				sessionStorage.getItem('jwt_token') || ''
		);
		places = response;
	};

	const handleSubmit = () => {
		locations = addedPlaces.map((place) => ({
			name: place.address.amenity,
			address: `${place.address.house_number || 'snc'}, ${place.address.city}, ${
					place.address.postcode
			}`
		}));
		onSubmit(locations, location_selection_type, location_selection_deadline_date, location_selection_deadline_time);
	};

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form
	class="grid grid-cols-1 grid-rows-3 gap-6  "
	id="4-part"
	on:click|stopPropagation={() => (places = [])}
	on:submit|preventDefault={handleSubmit}
>
	<Select
		id="select-location-type"
		name="select-location-type"
		label="Location type"
		on:change={(event) => (location_selection_type = event.detail.value)}
		options={[
			{ text: 'Single', value: 'single', selected: true },
			{ text: 'Multi', value: 'multi' }
		]}
	/>
	{#if location_selection_type === 'multi'}
		<div class="columns-2 gap-6">
			<InputText
					type="date"
					label="Select deadline for voting"
					id="dead_line"
					name="dead_line"
					placeholder="Insert the deadline for voting"
					bind:value={location_selection_deadline_date}
					required= {location_selection_type === 'multi'}
			/>
			<InputText
					type="time"
					label="Select last allowed time for voting"
					id="dead_line_time"
					name="dead_line_time"
					placeholder="Select last allowd time for voting"
					required={location_selection_deadline_date && location_selection_deadline_date !== ''}
					bind:value={location_selection_deadline_time}
			/>
		</div>
	{/if}
	<div>
		<InputAction id="places" name="places" placeholder="Search places" action={onSearchPlaces} />
		<div class="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
			<ul class="flex flex-col absolute bg-white overflow-scroll max-h-60">
				{#if places}
					{#each places as place, i}
						<li tabIndex={i + 1} class="border border-solid rounded border-slate-400  w-full  p-2">
							<button
								type="button"
								on:click|stopPropagation={() => {
									if (location_selection_type === 'single' && addedPlaces.length === 1) {
										places = [];
										return;
									}
									if (!addedPlaces.some((addedPlace) => addedPlace.place_id === place.place_id)) {
										addedPlaces = [...addedPlaces, place];
									}
									places = [];
								}}
								><span class="font-bold">{place.address.amenity}</span> - {place.address.road}
								{place.address.house_number || 'snc'}, {place.address.city}, {place.address
									.postcode}</button
							>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
	<div class="flex flex-col justify-center">
		{#if !addedPlaces.length}
			<span class="font-bold">No Place added</span>
		{:else}
			{#each addedPlaces as addedPlace}
				<div class="flex justify-between border border-solid rounded border-slate-400 p-2">
					<span
						><span class="font-bold">{addedPlace.address.amenity}</span> - {addedPlace.address.road}
						{addedPlace.address.house_number || 'snc'}, {addedPlace.address.city}, {addedPlace
							.address.postcode}</span
					>
					<button
						on:click={() =>
							(addedPlaces = addedPlaces.filter((place) => place.place_id !== addedPlace.place_id))}
					>
						<span class="font-bold">x</span>
					</button>
				</div>
			{/each}
		{/if}
	</div>
</form>
