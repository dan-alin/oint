<script lang="ts">
	import { goto } from '$app/navigation';

	const exit = () => goto('/login');
</script>

<section class="flex h-full flex-col justify-between px-8 py-6">
	<div class="flex h-full flex-col justify-center">
		<img src="/images/bye.svg" alt="bye" class="mx-auto w-1/2" />
		<h2 class="text-center text-xl font-bold">Hai cancellato il tuo account!</h2>
		<p class="text-center text-base">
			Il processo di cancellazione può richiedere fino a due giorni lavorativi. Una volta
			completato, tutti i tuoi dati personali saranno rimossi dal nostro sistema.
		</p>
	</div>
	<button class="btn-primary btn" on:click={exit}>Esci</button>
</section>
