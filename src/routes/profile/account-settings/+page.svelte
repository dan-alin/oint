<script lang="ts">
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import Menu from '../../../components/Menu.svelte';

	const sections = [
		{
			title: 'Modifica password',
			link: '/profile/change-password'
		},
		{
			title: 'Cancella account',
			link: '/profile/delete-account'
		}
	];
</script>

<section class="h-full pt-8">
	<div class="px-6">
		<HeaderMenu firstRow="Gestione" secondRow="Account" goto="/profile" />
	</div>
	<Menu {sections} />
</section>
