<script lang="ts">
	import { noop } from 'svelte/internal';

	export let id: string;
	export let name: string;
	export let label = '';
	export let placeholder: string;
	export let value: string | number | Date | File[] | undefined = '';
	export let required = false;
	export let disabled = false;
	export let onChange = noop;
	export let onInput = noop;
	export let customValidation = true;
	export let validate: () => void = () => null;
	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search';

	let isDirty = false;

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="form-control w-full">
	{#if label}
		<label class="label" for={id}>
			<span class="label-text font-bold"
				>{label}{#if required}*{/if}</span
			>
			{#if required && isDirty && !value}
				<span class="label-text-alt text-red-600">The {name} is required</span>
			{/if}
		</label>
	{/if}
	<input
		class="input-bordered input h-10 w-full"
		class:input-error={(required && isDirty && !value) || !customValidation}
		use:typeAction
		{placeholder}
		{name}
		{id}
		{required}
		{disabled}
		bind:value
		on:keydown={() => {
			isDirty = true;
		}}
		on:change={onChange}
		on:input={onInput}
		on:blur={validate}
	/>
</div>
