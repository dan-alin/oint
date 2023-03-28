<script lang="ts">
	import type { RadioItem } from '../models';

	export let options: RadioItem[];
	export let active: RadioItem;
	export let action: (active: RadioItem) => void;
	export let id: string;
	export let title: string;
	const handleChange = (e: Event) => {
		const value = (e.target as HTMLInputElement)?.value;
		active = options.find((option) => option.value === value) as RadioItem;
	};
</script>

<input type="checkbox" {id} class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex flex-col gap-10">
		<h3 class="text-center text-lg font-bold">{title}</h3>
		{#each options as option}
			<div class="form-control">
				<label class="flex cursor-pointer items-center gap-4">
					<input
						type="radio"
						name="option"
						value={option.value}
						class="radio checked:bg-primary "
						checked={active.value === option.value}
						on:change={handleChange}
					/>

					<span class="label-text">
						{option.label}
					</span>
				</label>
			</div>
		{/each}

		<div class="modal-action">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for={id} class="btn-primary btn h-10 w-full capitalize" on:click={() => action(active)}
				>Conferma</label
			>
		</div>
	</div>
</div>
