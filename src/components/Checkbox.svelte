<script lang="ts">
	export let label: string;
	export let onChange: (checked: boolean) => void;
	export let checked: boolean;
	export let disabled = false;
</script>

<div class="form-control ">
	<label class="label flex cursor-pointer gap-2 text-xs">
		<input
			type="checkbox"
			class="checkbox-secondary checkbox h-4 w-4  rounded-md"
			bind:checked
			on:change={() => onChange(checked)}
			{disabled}
		/>
		<span class="label-text">{label}</span>
	</label>
</div>
