<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Option } from '../models';

	export let id: string;
	export let name: string;
	export let label = '';
	export let options: Option[];
	export let disabled = false;
	export let required = false;

	let isDirty = false;
	const dispatch = createEventDispatcher();
</script>

<div class="form-control w-full">
	{#if label}
		<label class="label" for={id}>
			<span class="label-text font-bold"
				>{label}{#if required}*{/if}</span
			>
		</label>
	{/if}
	<select
		class="select-bordered select  w-full"
		class:input-error={required && isDirty}
		{id}
		{name}
		{required}
		{disabled}
		on:change={(e) => {
			isDirty = true;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			dispatch('change', { value: e.target && e.target.value });
		}}
	>
		{#each options as option}
			<option value={option.value} selected={option.selected}>{option.text}</option>
		{/each}
	</select>
	{#if required && isDirty}
		<span class="label">
			<span class="label-text-alt text-red-600">The {name} is required</span>
		</span>
	{/if}
</div>
