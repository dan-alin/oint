<script lang="ts">
	export let id: string;
	export let closeModal: () => void;
</script>

<div class="modal z-[51]  md:modal-middle " {id}>
	<div class="modal-box  bg-base-200 pb-10 ">
		<h3 class="text-center text-xl font-bold">Le tue informazioni sono state salvate</h3>
		<p class="mt-6 text-center text-base">
			certo, non vorrai mica cambiare il tuo nome... però ecco, siamo contenti che le tue
			informazioni siano aggiornate!
		</p>
		<button class="btn-primary btn mt-4 w-full" on:click={closeModal}>OK</button>
	</div>
</div>
