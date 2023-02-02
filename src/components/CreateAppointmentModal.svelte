<script lang="ts">
	import { apiCall } from '../utils/api-call';
	import Button from './Button.svelte';
	import InputText from './InputText.svelte';

	let forwardCheck = false;

	const onSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		console.log(formData);
		try {
			const newAppointment = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				start_date: formData.get('start_date') as string,
				end_date: formData.get('end_date') as string,
				creator_id: 1,
				image: '',
				can_be_forwarded: forwardCheck
			};
			const response: { access_token: string } = await apiCall(
				'/api/create-appointment',
				'post',
				JSON.stringify(newAppointment),
				sessionStorage.getItem('jwt_token') || ''
			);
		} catch (error: unknown) {
			console.log(error);
		}
	};
</script>

<!-- TODO handle modal layout on desktop -->
<div class="modal modal-bottom md:modal-middle ">
	<div class="modal-box h-4/6 bg-base-200">
		<label for="create-appointment-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
			>✕</label
		>
		<form on:submit|preventDefault={onSubmit}>
			<!-- TODO extract classes in an @apply -->
			<div class="grid gap-6  grid-cols-1 ">
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
				<div class="columns-2">
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
				<label class="cursor-pointer label">
					<span class="label-text">Forwardable</span>
					<input
						type="checkbox"
						class="toggle toggle-primary"
						bind:checked={forwardCheck}
						id="forwardable"
					/>
				</label>
			</div>

			<!-- <div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
				<div class="col-span-1" />
				<InputText
					type="file"
					label="image"
					id="image"
					name="image"
					placeholder="Insert an image"
					required={true}
					value=""
				/>
			</div> -->

			<div class="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
				<div class="col-span-1" />
				<Button type="submit" text="Crea" />
			</div>
		</form>
	</div>
</div>
