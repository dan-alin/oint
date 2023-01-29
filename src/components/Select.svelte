<script lang="ts">
	import type { Option } from '../models';

	export let id: string;
	export let name: string;
	export let label: string;
	export let selected: string = '';
	export let options: Option[];
	export let disabled = false;
	export let required = false;

	let isDirty = false;
</script>

<div class="form-control w-full">
	<label class="label" for={id}>
		<span class="label-text"
			>{label}{#if required}*{/if}</span
		>
	</label>
	<select
		class="select w-full max-w-xs"
		class:input-error={required && isDirty && !selected}
		{id}
		{name}
		{required}
		{disabled}
		bind:value={selected}
		on:keydown={() => {
			isDirty = true;
		}}
	>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
	{#if required && isDirty && !selected}
		<span class="label">
			<span class="label-text-alt text-red-600">The {name} is required</span>
		</span>
	{/if}
</div>
