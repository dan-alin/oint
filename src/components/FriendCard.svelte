<script lang="ts">
	export let name: string;
	export let id: number;
	export let isAcceptingMode: boolean = false;
	export let action: (friendId: number) => void;
</script>

<div class="grid gap-6 grid-cols-3" class:grid-cols-4={isAcceptingMode}>
	<div class="avatar placeholder m-auto">
		<div class="bg-neutral-focus text-neutral-content rounded-full w-14">
			<span class="text-3xl">K</span>
		</div>
	</div>
	<span class="font-bold m-auto">{name}</span>
	{#if !isAcceptingMode}
		<button
			class="appearance-none m-auto font-bold text-5xl text-green-700  cursor-pointer"
			on:click={() => action(id)}
			><svg
				class=" stroke-green-700 hover:stroke-green-500"
				width="64px"
				height="64px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<path d="M6 12H18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M12 18V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</g></svg
			></button
		>
	{:else}
		<button
			class="appearance-none m-auto font-bold text-5xl text-green-700  cursor-pointer"
			on:click={() => action(id)}
			><svg
				class=" fill-green-700 hover:fill-green-500"
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="48px"
				height="48px"
				viewBox="0 0 260 244"
				enable-background="new 0 0 260 244"
				xml:space="preserve"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<path
						d="M258,118v96c0,14.333-13.667,28-28,28h-84c-17.439,0-31.571-2.152-48-8c-5.073-1.806-20-8-20-8V114l66.036-77.567L150,2h12 c13.294,0,22.657,10.607,22.657,23.902v7.477c0,17.065-1.028,34.115-3.078,51.057L180.906,90H230C244.333,90,258,103.667,258,118z M2,238h60V102H2V238z"
					/>
				</g></svg
			></button
		>
		<button
			class="appearance-none m-auto font-bold text-5xl text-green-700  cursor-pointer"
			on:click={() => action(id)}
			><svg
				class=" fill-red-700 hover:fill-red-500"
				xmlns="http://www.w3.org/2000/svg"
				fill="#000000"
				width="48px"
				height="48px"
				viewBox="0 0 24 24"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier"
					><path
						d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
					/></g
				></svg
			></button
		>
	{/if}
</div>
