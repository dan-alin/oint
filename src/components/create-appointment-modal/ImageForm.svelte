<script lang="ts">
	import InputFile from '../InputFile.svelte';

	export let onSubmit: (image: any, can_be_forwarded: boolean) => void;

	export let image: any;
	export let can_be_forwarded: boolean;

	const handleFormSubmit = (e: Event) => {
		e.preventDefault();
		onSubmit(image, can_be_forwarded);
	};
</script>

<form
	class="grid grid-cols-1 grid-rows-3 gap-6 "
	id="3-part"
	name="file-form"
	on:submit|preventDefault={handleFormSubmit}
>
	<InputFile
		id="image"
		name="image"
		label="Inserisci un'immagine"
		accept={'.jpeg'}
		bind:files={image}
	/>
	<div class="col-span-1" />

	<label class=" cursor-pointer label w-full  ">
		<span class="label-text font-bold">Forwardable</span>
		<input
			type="checkbox"
			class="toggle toggle-primary"
			bind:checked={can_be_forwarded}
			id="forwardable"
		/>
	</label>
</form>
