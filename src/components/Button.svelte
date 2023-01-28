<script lang="ts">
	export let disabled: boolean = false;
	let customClass: string = '';

	export { customClass as class };
</script>

<button class="btn {customClass}" {disabled}>
	<slot />
</button>
