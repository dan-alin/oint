<script>
	import Button from '../components/Button.svelte';
	import InputText from '../components/InputText.svelte';
</script>

<div class="flex  items-center justify-center">
	<InputText id="name" name="name" label="Name:" placeholder="Insert Name" value="" type="date" />
</div>

<div class="absolute bottom-10 right-10">
	<Button class="btn-secondary">+</Button>
</div>
