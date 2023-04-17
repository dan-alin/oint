<script lang="ts">
	import InputFile from '../InputFile.svelte';

	export let image: any;
	export let can_be_forwarded: boolean;
</script>

<form class="grid grid-cols-1  gap-6 " id="2-part" name="file-form" on:submit|preventDefault>
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
