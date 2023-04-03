<script lang="ts">
	import Icon from '../Icon.svelte';
	import { page } from '$app/stores';
	import type { Icons } from '../../enums';

	export let path: string;
	export let icon: Icons;
	export let activeIcon: Icons;
	export let label: string;

	console.log($page.url.pathname);
</script>

<a
	class=" flex h-24 w-16 flex-col items-center justify-center gap-1"
	class:font-bold={$page.url.pathname.startsWith(path)}
	href={path}
>
	<Icon icon={$page.url.pathname.startsWith(path) ? activeIcon : icon} width="24" height="24" />
	{label}
</a>
