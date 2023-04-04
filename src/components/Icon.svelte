<script lang="ts">
	import type { Icons } from '../enums';

	export let size: '24';
	export let icon: Icons;
	export let color = '';
</script>

<span class={icon} style="font-size:{size}px; color: {color}" />
