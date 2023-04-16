<script lang="ts">
	import { text } from 'svelte/internal';
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';

	export let accepted: boolean;
</script>

<div
	class="flex w-full flex-col gap-4 font-bold"
	class:text-error={!accepted}
	class:text-success={accepted}
>
	<div
		class="text-re w-full rounded-b-xl p-5 text-center"
		class:bg-red-50={!accepted}
		class:bg-green-50={accepted}
	>
		{#if accepted}
			<Icon icon={Icons.ACCEPTED} size="13" />
			Evento accettato
		{:else}
			<Icon icon={Icons.DENIED} size="13" />
			Evento rifiutato
		{/if}
	</div>
	<button class="link-secondary link text-sm font-bold"> Modifica partecipazione </button>
</div>
