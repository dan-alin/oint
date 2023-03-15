<script lang="ts">
	export let id: string;
	export let name: string;
	export let placeholder: string;
	export let value: string | number | Date | undefined = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let action: (searchText: string) => void;
</script>

<div class="form-control w-full ">
	<div class="input-group ">
		<input
			type="text"
			{id}
			{name}
			{required}
			{placeholder}
			{disabled}
			bind:value
			class="input-bordered input  w-full "
		/>
		<button type="button" class="btn-square btn " on:click={() => action(`${value}`)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
	</div>
</div>
