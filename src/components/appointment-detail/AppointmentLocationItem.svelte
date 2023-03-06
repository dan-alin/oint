<script lang="ts">
	import Checkbox from '../Checkbox.svelte';
	import type { Location } from '../../models/locations';
	import { apiCall } from '../../utils/api-call';

	export let location: Location;
	export let appointmentId: number;
	export let IsSingleEvent: boolean;

	let votesCount = location.votes_count;

	const onVote = async (isVote: boolean) => {
		const response: any = await apiCall(
			isVote ? '/api/vote' : '/api/unvote',
			'post',
			isVote ? 'Vote sent' : 'Vote removed',
			JSON.stringify({
				appointmentId: appointmentId,
				locationId: location.id
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
		if (isVote) {
			votesCount++;
		} else {
			votesCount--;
		}
	};
</script>

<li class="text-xs flex items-center">
	{#if !IsSingleEvent}
		<Checkbox
			checked={location.i_voted_this_location}
			label={`${location.name} - ${location.address}`}
			onChange={(checked) => onVote(checked)}
		/>
		<span class="badge badge-xs ml-4">{votesCount}</span>
	{:else}
		{location.name} - {location.address}
	{/if}
</li>
