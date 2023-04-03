<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	// replaced dynamically
	let buildDate = __DATE__;
	let reloadSW = __RELOAD_SW__;
	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
		onRegistered(r) {
			if (reloadSW) {
				r &&
					setInterval(() => {
						r.update();
					}, 20000 /* 20s for testing purposes */);
			} else {
			}
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		}
	});

	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};

	$: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
	<div
		class="alert alert-info fixed z-[99] flex h-24 flex-row   items-center justify-between p-4 shadow-lg"
		role="alert"
	>
		<div class="flex items-center">
			{#if $offlineReady}
				App ready to work offline
			{:else}
				New content available, click on reload button to update.
			{/if}
		</div>
		<div class="flex items-center">
			{#if $needRefresh}
				<button class="btn" on:click={() => updateServiceWorker(true)}> Reload </button>
			{/if}
			<button class="btn " on:click={close}> Close </button>
		</div>
	</div>
{/if}

<div class="pwa-date">
	{buildDate}
</div>

<style>
	.pwa-date {
		display: none;
	}
</style>
