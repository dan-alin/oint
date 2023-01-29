<script>
	import Button from '../components/Button.svelte';
	import Card from '../components/Card.svelte';

	let events = [
		{
			title: 'event 1',
			location: 'via di bla bla 65',
			date: '12/01/23'
		},
		{
			title: 'event 2',
			location: 'via di bla bla 65',
			date: '12/01/23'
		},
		{
			title: 'event 3',
			location: 'via di bla bla 65',
			date: '12/01/23'
		},
		{
			title: 'event 4',
			location: 'via di bla bla 65',
			date: '12/01/23'
		},
		{
			title: 'event 5',
			location: 'via di bla bla 65',
			date: '12/01/23'
		},
		{
			title: 'event 6',
			location: 'via di bla bla 65',
			date: '12/01/23'
		}
	];
</script>

<main class="grid grid-cols-2  xl:grid-cols-3 3xl:grid-cols-4  gap-6 ">
	{#each events as event}
		<Card {event} />
	{/each}
</main>

<!-- TODO resolve flicker when drawer is open -->
<div class="absolute bottom-10 right-10">
	<Button class="btn-square" text="+" />
</div>
