<script lang="ts">
	import type { Appointment } from '../models';
	import Button from './Button.svelte';

	export let event: Appointment;
	export let handleClick: () => void = () => null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card w-full   bg-base-300 shadow-xl mx-auto h-64 image-full" on:click={handleClick}>
	{#if event.image}
		<figure><img src={event.image} alt="card" /></figure>
	{/if}

	<div class="card-body">
		<h2 class="card-title">{event.title}</h2>
		<p class="text-xs text-ellipsis">{event.description}</p>
		<p class="text-xs">{event.start_date}</p>
		<p class="text-xs">{event.end_date}</p>

		<Button class="btn-primary btn-xs" text="dettaglio" />
	</div>
</div>
