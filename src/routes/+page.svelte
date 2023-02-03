<script>
	import Button from '../components/Button.svelte';
</script>

<!-- TODO resolve flicker when drawer is open -->
<div class="w-full flex justify-center items-center gap-6">
	<a href="/login">
		<Button class="btn btn-primary" text="login" />
	</a>
	<a href="/sign-up">
		<Button class="btn btn-primary" text="sign-up" />
	</a>
	<a href="/add-friends">
		<Button class="btn btn-primary" text="Add Friends" />
	</a>
</div>
