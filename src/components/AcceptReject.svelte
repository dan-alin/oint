<script lang="ts">
	export let acceptAction: (id: number) => void = () => null;
	export let declineAction: (id: number) => void = () => null;
	export let id: number;
</script>

<div>
	<div class="flex w-full justify-between gap-2 ">
		<button
			on:click={() => declineAction(id)}
			class="btn-outline btn-primary  btn-sm btn w-1/2 rounded-sm"
		>
			Rifiuta
		</button>
		<button on:click={() => acceptAction(id)} class="btn-primary btn-sm btn w-1/2 rounded-sm">
			Accetta
		</button>
	</div>
</div>
