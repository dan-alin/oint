<script lang="ts">
	import Icon from '../Icon.svelte';
	import { page } from '$app/stores';
	import type { Icons } from '../../enums';

	export let path: string;
	export let icon: Icons;
	export let activeIcon: Icons;
	export let label: string;
</script>

<a
	class=" h-24 gap-1 flex flex-col items-center justify-center w-16"
	class:font-bold={$page.url.pathname.startsWith(path)}
	href={path}
>
	<Icon icon={$page.url.pathname.startsWith(path) ? activeIcon : icon} width="24" height="24" />
	{label}
</a>
