<script lang="ts">
	export let src: string;
	export let size: number = 24;
	export let color = 'currentColor';
</script>

<svg
	class="icon"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={color}
	xmlns="http://www.w3.org/2000/svg"
>
	<use href={src} />
</svg>
