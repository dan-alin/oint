<script lang="ts">
	export let name: string;
	export let id: number;
	export let action: (friendId: number) => void;
</script>

<div class="grid gap-6 grid-cols-3">
	<div class="avatar placeholder m-auto">
		<div class="bg-neutral-focus text-neutral-content rounded-full w-14">
			<span class="text-3xl">K</span>
		</div>
	</div>
	<span class="font-bold m-auto">{name}</span>
	<button
		class="appearance-none font-bold text-5xl m-auto text-green-700 cursor-pointer"
		on:click={() => action(id)}>+</button
	>
</div>
