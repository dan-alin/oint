<script lang="ts">
	export let label: string;

	export let disabled: boolean = false;
	export let shape: 'square' | 'circle' | null = null;
	export let kind: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | null = null;
	export let wide: boolean = false;
	export let outline: boolean = false;

	let shape_class = shape ? `btn-${shape}` : '';
	let kind_class = kind ? `btn-${kind}` : '';
	let wide_class = wide ? 'btn-wide' : '';
	let outline_class = outline ? 'btn-outline' : '';

	console.log(kind_class);
</script>

<button class="btn {shape_class} {kind_class} {wide_class} {outline_class}" {disabled}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12"
		/></svg
	>
</button>
