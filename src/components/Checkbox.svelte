<script lang="ts">
	export let label: string;
	export let onChange: (checked: boolean) => void;
	export let checked: boolean;
	export let disabled = false;
</script>

<div class="form-control">
	<label class="cursor-pointer label">
		<input type="checkbox"  disabled={disabled} class="checkbox mr-4" bind:checked on:change={() => onChange(checked)} />
		<span class="label-text">{label}</span>
	</label>
</div>
