<script lang="ts">
	import type { AppointmentForm } from '../../models/appointment';
	import type { Place } from '../../models/place';
	import DateAndHoursForm from './DateAndHoursForm.svelte';
	import ImageForm from './ImageForm.svelte';
	import NameDescriptionForm from './NameDescriptionForm.svelte';
	import SelectLocationsForm from './SelectLocationsForm.svelte';
	export let action: (form: AppointmentForm) => void;
	export let closeAction: () => void;
	let step = 1;

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

	const nextStep = () => step++;

	const prevStep = () => step--;
</script>

<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200 pb-10 ">
		<button on:click={closeAction} class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

		<div class="grid gap-6  grid-cols-1">
			<h2 class="text-center">CREA EVENTO</h2>
			<ul class="steps">
				<li class="step step-primary" />
				<li class="step" class:step-primary={step >= 2} />
				<li class="step" class:step-primary={step >= 3} />
				<li class="step" class:step-primary={step === 4} />
			</ul>
			{#if step === 1}
				<NameDescriptionForm
					onSubmit={(title, description) => {
						formData.title = title;
						formData.description = description;
						nextStep();
					}}
					name={formData.title}
					description={formData.description}
				/>
			{:else if step === 2}
				<DateAndHoursForm
					start_date={formData.start_date}
					end_date={formData.end_date}
					start_time={formData.start_time}
					end_time={formData.end_time}
					onSubmit={(start_date, end_date, start_time, end_time) => {
						formData.start_date = start_date;
						formData.end_date = end_date;
						formData.start_time = start_time;
						formData.end_time = end_time;
						nextStep();
					}}
				/>
			{:else if step === 3}
				<ImageForm
					image={formData.image}
					can_be_forwarded={formData.can_be_forwarded}
					onSubmit={(image, can_be_forwarded) => {
						formData.image = image;
						formData.can_be_forwarded = can_be_forwarded;
						nextStep();
					}}
				/>
			{:else if step === 4}
				<SelectLocationsForm
					location_selection_type={formData.location_selection_type}
					locations={formData.locations}
					onSubmit={(locations, location_selection_type) => {
						formData.location_selection_type = location_selection_type;
						formData.locations = locations;
						action(formData);
					}}
				/>
			{/if}
			<div class="grid  bottom-10 gap-6  grid-cols-2">
				<button class="btn" disabled={step === 1} on:click={prevStep}>{'<'}</button>

				<button class="btn" type="submit" form={`${step}-part`}>{step === 4 ? 'crea' : '>'}</button>
			</div>
		</div>
	</div>
</div>
