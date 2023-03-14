<script lang="ts">
	import type { Location } from '../../models/locations';
	import type { Place } from '../../models/place';
	import { apiCall } from '../../utils/api-call';
	import InputAction from '../InputAction.svelte';
	import Select from '../Select.svelte';

	export let onSubmit: (locations: Location[], location_selection_type: 'single' | 'multi') => void;
	export let locations: Location[];
	export let location_selection_type: 'single' | 'multi';

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
		onSubmit(locations, location_selection_type);
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
	<div>
		<InputAction id="places" name="places" placeholder="Search places" action={onSearchPlaces} />
		<div class="dropdown-content top-14 max-h-96 flex-col overflow-auto rounded-md bg-base-200">
			<ul class="absolute flex max-h-60 flex-col overflow-scroll bg-white">
				{#if places}
					{#each places as place, i}
						<li tabIndex={i + 1} class="w-full rounded border border-solid  border-slate-400  p-2">
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
				<div class="flex justify-between rounded border border-solid border-slate-400 p-2">
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
