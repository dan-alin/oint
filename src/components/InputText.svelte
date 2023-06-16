<script lang="ts">
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';
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
	export let validate = noop;
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
	export let enableShowHide = false;
	/** icon to be shown on the right side of the input. N.B. : if `enableShowHide` is set to `true` the icon won't appear */
	export let icon: Icons | undefined = undefined;
	let show = false;
	let component: HTMLInputElement;

	const toggleShow = () => {
		show = !show;
		component.type = show ? 'text' : type;
	};

	let isDirty = false;

	const typeAction = (node: HTMLInputElement) => {
		node.type = show ? 'text' : type;
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
	<div class="relative">
		<input
			bind:this={component}
			class="input-bordered input input-sm h-10 w-full bg-transparent"
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
		{#if enableShowHide}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
				on:click={toggleShow}
			>
				{#if !show}
					<Icon icon={Icons.NOTIFICATION_OUTLINE} />
				{:else}
					<Icon icon={Icons.NOTIFICATION_FULL} />
				{/if}
			</div>
		{:else if icon}
			<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
				<Icon {icon} />
			</div>
		{/if}
	</div>
</div>
