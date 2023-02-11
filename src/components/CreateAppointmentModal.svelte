<script lang="ts">
	import type { AppointmentForm } from '../models/appointment';
	import InputFile from './InputFile.svelte';

	import InputText from './InputText.svelte';
	export let action: (form: AppointmentForm) => void;
	export let closeAction: () => void;
	let step = 1;

	let formData: AppointmentForm = {
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		address: '',
		can_be_forwarded: false,
		image: undefined
	};

	const nextStep = () => {
		step++;
	};

	const prevStep = () => {
		step--;
	};
</script>

<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200 pb-10">
		<button on:click={closeAction} class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

		<div class="grid gap-6  grid-cols-1  ">
			<h2 class="text-center">CREA EVENTO</h2>
			<ul class="steps">
				<li class="step step-primary" />
				<li class="step step-primary" class:step-primary={step >= 2} />
				<li class="step step-primary" class:step-primary={step === 3} />
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
					<InputText
						type="text"
						name="address"
						bind:value={formData.address}
						id="address"
						placeholder="Insert the address"
						label="Indirizzo"
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
							required
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
					class="grid grid-cols-1 grid-rows-3 gap-6  "
					id="3-part"
					name="file-form"
					on:submit|preventDefault={() => action(formData)}
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
			{/if}

			<div class="grid  bottom-10 gap-6  grid-cols-2 ">
				<button class="btn" disabled={step === 1} on:click={prevStep}>{'<'}</button>

				<button class="btn" type="submit" form={`${step}-part`}>{step === 3 ? 'crea' : '>'}</button>
			</div>
		</div>
	</div>
</div>
