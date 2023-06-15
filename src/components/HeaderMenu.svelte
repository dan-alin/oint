<script lang="ts">
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';

	export let firstRow: string;
	export let secondRow: string;
	export let goto: string;
</script>

<div class=" flex items-center justify-between">
	<div>
		<h1 class="flex flex-col">
			<span class="text-xl text-gray-400">{firstRow}</span>

			<span class="text-2xl font-bold">{secondRow}</span>
		</h1>
	</div>
	<a
		class="flex h-[50px] w-[50px] cursor-pointer items-center justify-center font-bold"
		href={goto}
	>
		<Icon icon={Icons.CLOSE} />
	</a>
</div>
