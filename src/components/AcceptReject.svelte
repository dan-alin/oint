<script lang="ts">
	import { noop } from 'svelte/internal';

	export let acceptAction: (id: number) => void = noop;
	export let declineAction: (id: number) => void = noop;
	export let id: number;
</script>

<div>
	<div class="flex w-full justify-between gap-2 ">
		<button
			on:click={() => declineAction(id)}
			class="btn-outline btn-primary  btn-sm btn grow rounded-sm"
		>
			Rifiuta
		</button>
		<button on:click={() => acceptAction(id)} class="btn-primary btn-sm btn grow rounded-sm">
			Accetta
		</button>
	</div>
</div>
