<script lang="ts">
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';

	export let sections: { title: string; link: string }[];
</script>

{#each sections as section}
	<div class="min-h-12 flex w-full cursor-pointer items-center gap-4 ">
		<a href={section.link} class="flex w-full ">
			<p class=" align-middl w-full self-center font-bold hover:text-warning">
				{section.title}
			</p>
			<Icon icon={Icons.ARROW_RIGHT} size="18" /></a
		>
	</div>
	<div class="divider my-0" />
{/each}
