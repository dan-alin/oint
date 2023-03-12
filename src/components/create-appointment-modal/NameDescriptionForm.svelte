<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: (name: string, description: string) => void;

	export let name: string;
	export let description: string;

	const handleFormSubmit = (e: Event) => {
		onSubmit(name, description);
	};
</script>

<form
	class="grid grid-cols-1 grid-rows-3 gap-6  "
	id="1-part"
	on:submit|preventDefault={handleFormSubmit}
>
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
