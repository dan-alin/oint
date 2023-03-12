<script lang="ts">
	export let label: string;
	export let id: string;
	export let accept: string;
	export let name: string;
	export let files: FileList | undefined;
	export let required: boolean = false;
	export let disabled: boolean = false;

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		files = target.files as FileList;
	};
</script>

<div class="form-control w-full">
	<label class="label" for={id}>
		<span class="label-text font-bold"
			>{label}{#if required}*{/if}</span
		>
	</label>
	<input
		class="file-input-bordered file-input w-full"
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
