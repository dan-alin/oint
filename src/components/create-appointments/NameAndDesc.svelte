<script lang="ts">
	import InputText from '../InputText.svelte';

	export let name: string;
	export let description: string;
	export let isValid = false;

	$: {
		isValid = !!name && !!description;
	}
</script>

<form class="grid grid-cols-1  gap-6 " id="0-part" on:submit|preventDefault>
	<InputText
		type="text"
		id="title"
		name="title"
		placeholder="Nome evento"
		required
		bind:value={name}
	/>

	<textarea
		placeholder="Descrizione evento"
		class="textarea-sm textarea-bordered textarea w-full bg-transparent "
		bind:value={description}
	/>
</form>
