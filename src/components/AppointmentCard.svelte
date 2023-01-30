<script lang="ts">
	import type { Appointment } from '../models';
	import Button from './Button.svelte';

	export let event: Appointment;
	export let handleClick: () => void = () => null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card w-64   bg-base-300 shadow-xl mx-auto h-64 " on:click={handleClick}>
	<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
	<div class="card-body">
		<h2 class="card-title">{event.title}</h2>
		<p class="text-xs">{event.address}</p>
		<p class="text-xs">{event.start_date}</p>
		<p class="text-xs">{event.end_date}</p>
		{#if event.can_be_forwarded}
			<Button class="btn-primary btn-xs" text="dettaglio" />
		{/if}
		<!-- <div class="card-actions justify-end">
			<button class="btn btn-primary">View</button>
		</div> -->
	</div>
</div>
