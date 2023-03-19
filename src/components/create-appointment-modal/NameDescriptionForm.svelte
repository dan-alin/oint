<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: () => void;

	export let name: string;
	export let description: string;
</script>

<form class="grid grid-cols-1 grid-rows-3 gap-6  " id="1-part" on:submit|preventDefault={onSubmit}>
	<InputText
		type="text"
		label="Nome evento"
		id="title"
		name="title"
		placeholder="Insert the title"
		required
		bind:value={name}
	/><InputText
		type="text"
		label="Descrizione"
		id="description"
		name="description"
		required
		placeholder="Insert the description"
		bind:value={description}
	/>
</form>
