<script lang="ts">
	import type { Icons } from '../../enums';
	import Icon from '../Icon.svelte';

	export let icon: Icons;
	export let size: string;
	export let heading: string;
	export let subHeading: string;
</script>

<div class="mt-28 flex flex-col items-center text-center text-disabled">
	<Icon {icon} {size} color="var(--color-disabled)" />
	<h4 class="mt-5 text-sm font-bold">{heading}</h4>
	<p class="mt-2 text-xs">{subHeading}</p>
</div>
