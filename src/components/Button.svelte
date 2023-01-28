<script lang="ts">
	export let disabled: boolean = false;
	export let text: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	let customClass: string = '';

	export { customClass as class };
</script>

<button class="btn {customClass}" {disabled} {type}>
	<p>{text}</p>
</button>
