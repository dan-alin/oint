<script lang="ts">
	import { noop } from 'svelte/internal';
	import Icon from './Icon.svelte';
	import { Icons } from '../enums';

	/** Unique id for the modal */
	export let id: string;
	/** Title for the modal */
	export let title: string;
	/** Subtitle for the modal */
	export let subTitle: string;
	/** Label for the confirm button */
	export let confirmBtnLabel: string;
	/** Optional label for the cancel button, if not provided the cancel button won't show */
	export let cancelBtnLabel: string | undefined = undefined;
	/** Callback for the confirm button */
	export let onConfirm = noop;
	/** Optional allback for the cancel button, if not provided the cancel button will simply close the modal */
	export let onCancel: (() => void) | undefined = undefined;
	/** Boolean value to programatically open/close the modal. Must use bind:modalOpened from the parent component */
	export let modalOpened: boolean | undefined = undefined;

	let modalBody: HTMLLabelElement;

	const handleClickOutside = (e: MouseEvent | KeyboardEvent) => {
		if (modalOpened === undefined) return;
		if (e.type == 'click') {
			if (e.target && !modalBody.contains(e.target as Node)) modalOpened = false;
		} else {
			const keyboardE = e as KeyboardEvent;
			if (keyboardE.key === 'Escape') modalOpened = false;
		}
	};
</script>

{#if modalOpened === undefined}
	<input type="checkbox" {id} class="modal-toggle" />
{/if}
<label
	for={id}
	class="modal z-[51] cursor-pointer  md:modal-middle"
	on:click={handleClickOutside}
	on:keydown={handleClickOutside}
	class:modal-open={modalOpened}
>
	<label bind:this={modalBody} for="" class="modal-box mt-7 bg-base-200 pb-10">
		<div class="ml-auto flex justify-end">
			{#if modalOpened === undefined}
				<label for={id}>
					<Icon icon={Icons.CLOSE} />
				</label>
			{:else}
				<button on:click={() => (modalOpened = false)}>
					<Icon icon={Icons.CLOSE} />
				</button>
			{/if}
		</div>
		<h3 class="mt-7 text-center text-xl font-bold">{title}</h3>
		<p class="mt-6 text-center text-sm">
			{subTitle}
		</p>
		<div class="mt-6 flex gap-4">
			{#if cancelBtnLabel}
				{#if onCancel}
					<button class="btn-outline btn-primary btn flex-1" on:click={onCancel}
						>{cancelBtnLabel}</button
					>
				{:else}
					<label for={id} class="btn-outline btn-primary btn-sm btn h-10 flex-1"
						>{cancelBtnLabel}</label
					>
				{/if}
			{/if}
			<button class="btn-primary btn-sm btn h-10 flex-1" on:click={onConfirm}
				>{confirmBtnLabel}</button
			>
		</div>
	</label>
</label>
