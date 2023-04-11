<script lang="ts">
	import fileToBase64 from '../../utils/to-base64';
	import InputFile from '../InputFile.svelte';
	import InputText from '../InputText.svelte';

	export let onSubmit: () => void;

	export let image: any;
	export let can_be_forwarded: boolean;
</script>

<form
	class="grid grid-cols-1  gap-6 "
	id="2-part"
	name="file-form"
	on:submit|preventDefault={onSubmit}
>
	{#if image}
		<img
			class="h-32 w-full  object-cover"
			src={URL.createObjectURL(image?.[0])}
			alt="uploaded file"
		/>
	{/if}
	<InputFile id="image" name="image" bind:files={image} />

	<label class=" label  w-full cursor-pointer  justify-start gap-4   ">
		<input
			type="checkbox"
			class="toggle-secondary toggle toggle-sm"
			bind:checked={can_be_forwarded}
			id="forwardable"
		/><span class="font-xs label-text">Consenti a chiunque di invitare altri amici</span>
	</label>
</form>
