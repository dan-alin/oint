<script lang="ts">
	import type { AppointmentForm } from '../models/appointment';
	import type { Place } from '../models/place';
	import { apiCall } from '../utils/api-call';
	import InputAction from './InputAction.svelte';
	import InputFile from './InputFile.svelte';

	import InputText from './InputText.svelte';
	import Select from './Select.svelte';
	export let action: (form: AppointmentForm) => void;
	export let closeAction: () => void;
	let step = 1;
	let places: Place[];
	let addedPlaces: Place[] = [];

	let formData: AppointmentForm = {
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		can_be_forwarded: false,
		image: undefined,
		location_selection_type: 'single',
		locations: []
	};

	const nextStep = () => {
		step++;
	};

	const prevStep = () => {
		step--;
	};

	const onSearchPlaces = async (text: string) => {
		const response: any = await apiCall(
			'/api/places',
			'post',
			'',
			JSON.stringify({
				search: text
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
		console.log(response);
		places = response as Place[];
	};
</script>

<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200 pb-10 ">
		<button on:click={closeAction} class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

		<div class="grid gap-6  grid-cols-1">
			<h2 class="text-center">CREA EVENTO</h2>
			<ul class="steps">
				<li class="step step-primary" />
				<li class="step step-primary" class:step-primary={step >= 2} />
				<li class="step step-primary" class:step-primary={step >= 3} />
				<li class="step step-primary" class:step-primary={step === 4} />
			</ul>
			{#if step === 1}
				<form
					class="grid grid-cols-1 gap-6 grid-rows-3  "
					id="1-part"
					on:submit|preventDefault={nextStep}
				>
					<InputText
						type="text"
						label="Nome evento"
						id="title"
						name="title"
						placeholder="Insert the title"
						required
						bind:value={formData.title}
					/><InputText
						type="text"
						label="Descrizione"
						id="description"
						name="description"
						required
						placeholder="Insert the description"
						bind:value={formData.description}
					/>
				</form>
			{:else if step === 2}
				<form
					class="grid grid-cols-1 gap-6 grid-rows-3 "
					id="2-part"
					on:submit|preventDefault={nextStep}
				>
					<div class="columns-2   gap-6">
						<InputText
							type="date"
							label="Dal"
							id="start_date"
							name="start_date"
							placeholder="Insert the starting date"
							required
							bind:value={formData.start_date}
						/>
						<InputText
							type="date"
							label="Al"
							id="end_date"
							name="end date"
							placeholder="Insert the ending date"
							bind:value={formData.end_date}
						/>
					</div>

					<div class="columns-2   gap-6">
						<InputText
							type="time"
							label="Ora inizio"
							id="start_time"
							name="start time"
							placeholder="Insert the starting time"
							required
							bind:value={formData.start_time}
						/>
						<InputText
							type="time"
							label="Ora fine"
							id="end_time"
							name="end time"
							required
							placeholder="Insert the ending time"
							bind:value={formData.end_time}
						/>
					</div>
					<div class="col-span-1" />
				</form>
			{:else if step === 3}
				<form
					class="grid grid-cols-1 grid-rows-3 gap-6 "
					id="3-part"
					name="file-form"
					on:submit|preventDefault={nextStep}
				>
					<InputFile
						id="image"
						name="image"
						label="Inserisci un'immagine"
						accept={'.jpeg'}
						bind:files={formData.image}
					/>
					<div class="col-span-1" />

					<label class=" cursor-pointer label w-full  ">
						<span class="label-text font-bold">Forwardable</span>
						<input
							type="checkbox"
							class="toggle toggle-primary"
							bind:checked={formData.can_be_forwarded}
							id="forwardable"
						/>
					</label>
				</form>
			{:else if step === 4}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<form
					class="grid grid-cols-1 grid-rows-3 gap-6  "
					id="4-part"
					on:click|stopPropagation={() => (places = [])}
					on:submit|preventDefault={() => {
						formData.locations = addedPlaces.map((place) => ({
							name: place.address.amenity,
							address: `${place.address.house_number || 'snc'}, ${place.address.city}, ${
								place.address.postcode
							}`
						}));
						action(formData);
					}}
				>
					<Select
						id="select-location-type"
						name="select-location-type"
						label="Location type"
						on:change={(event) => (formData.location_selection_type = event.detail.value)}
						options={[
							{ text: 'Single', value: 'single', selected: true },
							{ text: 'Multi', value: 'multi' }
						]}
					/>
					<div>
						<InputAction
							id="places"
							name="places"
							placeholder="Search places"
							action={onSearchPlaces}
						/>
						<div
							class="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md"
						>
							<ul class="flex flex-col absolute bg-white overflow-scroll max-h-60">
								{#if places}
									{#each places as place, i}
										<li
											tabIndex={i + 1}
											class="border border-solid rounded border-slate-400  w-full  p-2"
										>
											<button
												type="button"
												on:click|stopPropagation={() => {
													if (
														formData.location_selection_type === 'single' &&
														addedPlaces.length === 1
													) {
														places = [];
														return;
													}
													if (
														!addedPlaces.some(
															(addedPlace) => addedPlace.place_id === place.place_id
														)
													) {
														addedPlaces = [...addedPlaces, place];
													}
													places = [];
												}}
												><span class="font-bold">{place.address.amenity}</span> - {place.address
													.road}
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
										><span class="font-bold">{addedPlace.address.amenity}</span> - {addedPlace
											.address.road}
										{addedPlace.address.house_number || 'snc'}, {addedPlace.address.city}, {addedPlace
											.address.postcode}</span
									>
									<button
										on:click={() =>
											(addedPlaces = addedPlaces.filter(
												(place) => place.place_id !== addedPlace.place_id
											))}
									>
										<span class="font-bold">x</span>
									</button>
								</div>
							{/each}
						{/if}
					</div>
				</form>
			{/if}
			<div class="grid  bottom-10 gap-6  grid-cols-2">
				<button class="btn" disabled={step === 1} on:click={prevStep}>{'<'}</button>

				<button class="btn" type="submit" form={`${step}-part`}>{step === 4 ? 'crea' : '>'}</button>
			</div>
		</div>
	</div>
</div>
