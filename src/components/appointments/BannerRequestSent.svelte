<script lang="ts">
	import { Icons } from '../../enums';
	import Icon from '../Icon.svelte';

	export let label: string;
</script>

<div class="flex w-full items-center justify-center bg-green-100 p-2">
	<Icon icon={Icons.ACCEPTED} />
	<span class="ml-2 font-bold text-green-600">{label}</span>
</div>
