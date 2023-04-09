<script lang="ts">
	import type { AppointmentForm, Place } from '../../models';
	import PageHead from '../PageHead.svelte';
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
		locations: [],
		location_selection_deadline_date: '',
		location_selection_deadline_time: ''
	};

	const nextStep = () => step++;

	const prevStep = () => step--;

	let isValidLocationForm = true;
</script>

<div class="modal  modal-bottom z-50   md:modal-middle">
	<div class="modal-box  h-full max-h-full rounded-none bg-base-100  pb-10 ">
		<div class="grid grid-cols-1  gap-6 ">
			<PageHead firstRow="Organizza un" secondRow="nuovo evento!" notificationsUreadCount={0} />
			<!-- <button on:click={closeAction} class="btn-sm btn-circle btn absolute right-2 top-2">✕</button> -->
			<p class="text-sm">
				Dai tornei di calcetto alle mostre d'arte, dalla degustazione di vini ai corsi di cucina...
				Vediamo cosa è in programma questa settimana
			</p>

			<!-- <h2 class="text-center">CREA EVENTO</h2>
			<ul class="steps">
				<li class="step-primary step" />
				<li class="step" class:step-primary={step >= 2} />
				<li class="step" class:step-primary={step >= 3} />
				<li class="step" class:step-primary={step === 4} />
			</ul> -->
			{#if step === 1}
				<NameDescriptionForm
					onSubmit={nextStep}
					bind:name={formData.title}
					bind:description={formData.description}
				/>
			{:else if step === 2}
				<DateAndHoursForm
					bind:start_date={formData.start_date}
					bind:end_date={formData.end_date}
					bind:start_time={formData.start_time}
					bind:end_time={formData.end_time}
					onSubmit={nextStep}
				/>
			{:else if step === 3}
				<ImageForm
					bind:image={formData.image}
					bind:can_be_forwarded={formData.can_be_forwarded}
					onSubmit={nextStep}
				/>
			{:else if step === 4}
				<SelectLocationsForm
					bind:location_selection_type={formData.location_selection_type}
					bind:locations={formData.locations}
					bind:location_selection_deadline_date={formData.location_selection_deadline_date}
					bind:location_selection_deadline_time={formData.location_selection_deadline_time}
					bind:startDate={formData.start_date}
					bind:startTime={formData.start_time}
					bind:isValid={isValidLocationForm}
					onSubmit={() => {
						action(formData);
					}}
				/>
			{/if}
			<div class="bottom-10  grid grid-cols-2  gap-6">
				<button class="btn" disabled={step === 1} on:click={prevStep}>{'<'}</button>

				<button
					disabled={step === 4 && !isValidLocationForm}
					class="btn"
					type="submit"
					form={`${step}-part`}>{step === 4 ? 'crea' : '>'}</button
				>
			</div>
		</div>
	</div>
</div>
