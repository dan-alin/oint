<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let value: string | number | undefined;
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
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		class="input input-bordered w-full max-w-xs"
		{type}
		{id}
		{name}
		{placeholder}
		{value}
		{required}
		{disabled}
	/>
</div>
