<script>
	import Button from './Button.svelte';
</script>

<div class="drawer drawer-end custom-height ">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content p-10">
		<slot />
		<div class="fixed bottom-10 right-10">
			<Button class="btn-square" text="+" />
		</div>
	</div>
	<div class="drawer-side ">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<li><a href="/">Sidebar Item 1</a></li>
			<li><a href="/">Sidebar Item 2</a></li>
		</ul>
	</div>
</div>

<style>
	/* custom height calculated based on header size */
	.custom-height {
		height: calc(100vh - 128px);
	}

	::-webkit-scrollbar {
		width: 0px;
		background: transparent; /* make scrollbar transparent */
	}
</style>
