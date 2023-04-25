<script lang="ts">
	export let id: string;
	export let accept = '.jpeg, .jpg, .png';
	export let name: string;
	export let files: FileList | undefined;
	export let required = false;
	export let disabled = false;

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		files = target.files as FileList;
	};
</script>

<div class="form-control w-full">
	<input
		class=" file-input-bordered file-input relative flex h-10 w-full  bg-transparent"
		type="file"
		{accept}
		{name}
		{id}
		{required}
		{disabled}
		on:change={handleFileChange}
		bind:files
	/>
</div>

<style>
	input[type='file'] {
		color: var(--color-disabled);
	}
	.file-input::file-selector-button {
		color: transparent;
		width: 40px;
		aspect-ratio: 1;
		height: 100%;
		border: none;
		margin: 0;
		background: url('/icons/upload.svg') no-repeat center center;
		filter: opacity(0.5);
	}
</style>
