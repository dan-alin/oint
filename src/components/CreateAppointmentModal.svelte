<script lang="ts">
	import { apiCall } from '../utils/api-call';
	import fileToBase64 from '../utils/to-base64';
	import Button from './Button.svelte';
	import InputText from './InputText.svelte';

	let forwardCheck = false;

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const image = await fileToBase64(formData.get('image') as File);

		try {
			const newAppointment = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				start_date: formData.get('start_date') as string,
				end_date: formData.get('end_date') as string,
				image,
				can_be_forwarded: forwardCheck,
				address: formData.get('address') as string
			};

			const response: { access_token: string } = await apiCall(
				'/api/create-appointment',
				'post',
				JSON.stringify(newAppointment),
				sessionStorage.getItem('jwt_token') || ''
			);

			console.log(response);
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<!-- TODO handle modal layout on desktop -->
<div class="modal modal-bottom md:modal-middle  z-50 ">
	<div class="modal-box  bg-base-200">
		<label for="create-appointment-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
			>✕</label
		>
		<form on:submit|preventDefault={onSubmit}>
			<!-- TODO extract classes in an @apply -->
			<h2 class="text-center">CREA EVENTO</h2>
			<div class="grid gap-6  grid-cols-1  ">
				<InputText
					type="text"
					label="title"
					id="title"
					name="title"
					placeholder="Insert the title"
					required={true}
					value=""
				/><InputText
					type="text"
					label="description"
					id="description"
					name="description"
					placeholder="Insert the descriptionn"
					required={true}
					value=""
				/>
				<InputText
					type="text"
					name="address"
					value=""
					id="address"
					placeholder="Insert the address"
					label="address"
				/>
				<div class="columns-2   gap-6">
					<InputText
						type="date"
						label="start date"
						id="start_date"
						name="start_date"
						placeholder="Insert the starting date"
						required={true}
						value=""
					/>
					<InputText
						type="date"
						label="end date"
						id="end_date"
						name="end_date"
						placeholder="Insert the ending date"
						required={true}
						value=""
					/>
				</div>

				<InputText
					type="file"
					name="image"
					value=""
					id="image"
					placeholder="insert the event image"
					label="image"
				/>

				<label class=" cursor-pointer label w-full ">
					<span class="label-text font-bold">Forwardable</span>
					<input
						type="checkbox"
						class="toggle toggle-primary"
						bind:checked={forwardCheck}
						id="forwardable"
					/>
				</label>

				<div class="grid gap-6  grid-cols-1 md:grid-cols-3">
					<div class="span-1" />
					<Button type="submit" text="Crea" />
				</div>
			</div>
		</form>
	</div>
</div>
