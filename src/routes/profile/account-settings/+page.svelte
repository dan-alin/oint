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

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="Gestione" secondRow="Account" goto="/profile" />
	<Menu {sections} />
</section>
