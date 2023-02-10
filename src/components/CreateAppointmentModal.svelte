<script lang="ts">
	import type { Appointment } from '../models';
	import { events } from '../stores/appointments';
	import { apiCall } from '../utils/api-call';
	import fileToBase64 from '../utils/to-base64';
	import InputText from './InputText.svelte';

	let step = 1;

	type Form = {
		title: string;
		description: string;
		start_date: string;
		end_date: string;
		start_time: string;
		end_time: string;
		address: string;
		can_be_forwarded: false;
		files: File[];
	};

	let formData: Form = {
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		address: '',
		can_be_forwarded: false,
		files: []
	};

	const onSubmit = async (event: Event) => {
		//const image = formData.files && (await fileToBase64(formData.files[0]));

		if (step !== 3) {
			step++;
		} else {
			try {
				const newAppointment = {
					title: formData.title,
					description: formData.description,
					start_date: formData.start_date,
					end_date: formData.end_date,
					image: '',
					can_be_forwarded: formData.can_be_forwarded,
					address: formData.address
				};

				const response: Appointment = await apiCall(
					'/api/create-appointment',
					'post',
					JSON.stringify(newAppointment),
					sessionStorage.getItem('jwt_token') || ''
				);
				console.log(response);
				events.update((events) => [...events, response]);

				//TODO save data in a store so they can be updated by api
				closeModal();
			} catch (error: unknown) {
				console.log(error);
			}
		}
	};

	const nextStep = () => {
		step++;
	};

	const prevStep = () => {
		console.log(step);

		step--;
		console.log('after', step);
	};

	const closeModal = () => {
		step = 1;
		formData = {
			title: '',
			description: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			address: '',
			can_be_forwarded: false,
			files: []
		};
		const modal = document.getElementById('create-appointment-modal');
		modal?.click();
	};
</script>

<!-- TODO handle modal layout on desktop -->
<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200 h-5/6 ">
		<button on:click={closeModal} class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

		<div class="grid gap-6  grid-cols-1  ">
			<h2 class="text-center">CREA EVENTO</h2>
			<ul class="steps">
				<li class="step step-primary" />
				<li class="step step-primary" class:step-primary={step >= 2} />
				<li class="step step-primary" class:step-primary={step === 3} />
			</ul>
			{#if step === 1}
				<form id="1-part" on:submit|preventDefault={nextStep}>
					<InputText
						type="text"
						label="title"
						id="title"
						name="title"
						placeholder="Insert the title"
						required={true}
						bind:value={formData.title}
					/><InputText
						type="text"
						label="description"
						id="description"
						name="description"
						placeholder="Insert the descriptionn"
						required={true}
						bind:value={formData.description}
					/>
					<InputText
						type="text"
						name="address"
						bind:value={formData.address}
						id="address"
						placeholder="Insert the address"
						label="address"
					/>
				</form>
			{:else if step === 2}
				<form id="2-part" on:submit|preventDefault={nextStep}>
					<div class="columns-2   gap-6">
						<InputText
							type="date"
							label="start date"
							id="start_date"
							name="start_date"
							placeholder="Insert the starting date"
							required={true}
							bind:value={formData.start_date}
						/>
						<InputText
							type="date"
							label="end date"
							id="end_date"
							name="end_date"
							placeholder="Insert the ending date"
							required={true}
							bind:value={formData.end_date}
						/>
					</div>

					<div class="columns-2   gap-6">
						<InputText
							type="time"
							label="start time"
							id="start_time"
							name="start_time"
							placeholder="Insert the starting time"
							required={true}
							bind:value={formData.start_time}
						/>
						<InputText
							type="time"
							label="end time"
							id="end_time"
							name="end_time"
							placeholder="Insert the ending time"
							required={true}
							bind:value={formData.end_time}
						/>
					</div>
				</form>
			{:else if step === 3}
				<form id="3-part" name="file-form" on:submit|preventDefault={onSubmit}>
					<InputText
						type="file"
						name="image"
						id="image"
						placeholder="insert the event image"
						label="image"
					/>
					<label class=" cursor-pointer label w-full h-[84px] ">
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
