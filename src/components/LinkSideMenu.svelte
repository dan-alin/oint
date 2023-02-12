<script lang="ts">
	export let label: string;
	export let href: string;
	export let action: () => void;
</script>

<li>
	<a on:click={action} {href}>{label}</a>
</li>
