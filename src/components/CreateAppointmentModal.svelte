<script lang="ts">
	import { onMount } from 'svelte';
	import type { Appointment } from '../models';
	import { events } from '../stores/appointments';
	import { apiCall } from '../utils/api-call';
	import fileToBase64 from '../utils/to-base64';
	import Button from './Button.svelte';
	import InputText from './InputText.svelte';

	let step = 1;

	type Form = {
		title: string;
		description: string;
		start_date: string;
		end_date: string;
		address: string;
		image?: File;
		can_be_forwarded: false;
	};

	let formData: Form = {
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		address: '',
		image: undefined,
		can_be_forwarded: false
	};

	const onSubmit = async (event: Event) => {
		// const formData = new FormData(event.target as HTMLFormElement);
		if (step === 1) {
			step = 2;
		} else {
			const image = formData.image && (await fileToBase64(formData.image));

			try {
				const newAppointment = {
					title: formData.title,
					description: formData.description,
					start_date: formData.start_date,
					end_date: formData.end_date,
					image,
					can_be_forwarded: formData.can_be_forwarded,
					address: formData.address
				};

				const response: Appointment = await apiCall(
					'/api/create-appointment',
					'post',
					JSON.stringify(newAppointment),
					sessionStorage.getItem('jwt_token') || ''
				);

				events.update((events) => [...events, response]);
				//TODO save data in a store so they can be updated by api
				closeModal();
			} catch (error: unknown) {
				console.log(error);
			}
		}
	};

	const closeModal = () => {
		const modal = document.getElementById('create-appointment-modal');
		modal?.click();
	};
</script>

<!-- TODO handle modal layout on desktop -->
<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200 h-5/6 ">
		<label for="create-appointment-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
			>✕</label
		>

		<span class=" absolute left-2 top-2 text-2xl" on:click={() => (step = 1)}>←</span>
		<form on:submit|preventDefault={onSubmit}>
			<!-- TODO extract classes in an @apply -->

			<div class="grid gap-6  grid-cols-1  ">
				<h2 class="text-center">CREA EVENTO</h2>
				<ul class="steps">
					<li class="step step-primary" />
					<li class="step step-primary" class:step-primary={step === 2} />
				</ul>
				{#if step === 1}
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
					<InputText
						type="file"
						name="image"
						bind:value={formData.image}
						id="image"
						placeholder="insert the event image"
						label="image"
					/>
				{:else if step === 2}
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

					<label class=" cursor-pointer label w-full h-[84px] ">
						<span class="label-text font-bold">Forwardable</span>
						<input
							type="checkbox"
							class="toggle toggle-primary"
							bind:checked={formData.can_be_forwarded}
							id="forwardable"
						/>
					</label>
				{/if}

				<div class="grid  bottom-10 gap-6  grid-cols-1 md:grid-cols-3">
					<div class="col-span-1" />
					<Button type="submit" text={'crea'} />
				</div>
			</div>
		</form>
	</div>
</div>
