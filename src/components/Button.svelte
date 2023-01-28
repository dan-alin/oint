<script lang="ts">
	export let text: string;
	export let primary: boolean = false;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
</script>

<button class="btn {primary ? 'primary' : ''}" {type}>{text}</button>
