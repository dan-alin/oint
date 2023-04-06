<script lang="ts">
	export let firstRow: string;
	export let secondRow: string;
</script>

<div class="mb-8 flex items-center justify-between">
	<div>
		<h1 class="flex flex-col">
			<span class="text-xl text-gray-400">{firstRow}</span>

			<span class="text-2xl font-bold">{secondRow}</span>
		</h1>
	</div>
	<a
		class="flex h-[50px] w-[50px] cursor-pointer items-center justify-center font-bold"
		href={`/notifications`}
	>
		X
	</a>
</div>
