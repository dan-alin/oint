<script lang="ts">
	import { noop } from 'svelte/internal';
	import { Icons } from '../../enums';
	import Icon from '../Icon.svelte';

	export let id: string;
	export let title: string;
	export let subTitle: string;
	export let open: boolean;
	export let btnDisabled = false;
	export let btnLabel: string | undefined = undefined;

	const closeModal = () => {
		open = false;
	};
</script>

<input type="checkbox" checked={open} class="modal-toggle" {id} />

<button on:click={closeModal} class="modal modal-bottom cursor-pointer">
	<button on:click|stopPropagation={noop} class="modal-box h-[90%] px-6 pt-7 pb-10">
		<div class="flex h-full flex-col text-sm">
			<div class="ml-auto">
				<button on:click={closeModal}><Icon icon={Icons.CLOSE} /></button>
			</div>
			<h4 class="text-xl font-bold">{title}</h4>
			<h5>{subTitle}</h5>
			<slot />
			{#if btnLabel}
				<button on:click disabled={btnDisabled} class="btn-primary btn-sm btn mt-auto h-10 w-full">
					{btnLabel}
				</button>
			{/if}
		</div>
	</button>
</button>
