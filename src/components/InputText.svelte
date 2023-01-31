<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let value: string | number | Date | undefined = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
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

	let isDirty: boolean = false;

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="form-control w-full">
	<label class="label" for={id}>
		<span class="label-text font-bold"
			>{label}{#if required}*{/if}</span
		>
	</label>
	<input
		class="input input-bordered w-full "
		class:input-error={required && isDirty && !value}
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
	/>
	{#if required && isDirty && !value}
		<span class="label">
			<span class="label-text-alt text-red-600">The {name} is required</span>
		</span>
	{/if}
</div>
