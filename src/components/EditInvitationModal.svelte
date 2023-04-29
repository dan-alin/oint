<script lang="ts">
	import { invitationService } from '../services/invitation.service';

	export let id: string;
	export let accepted: boolean;
	export let appointmentId: number;

	let inputEl: HTMLInputElement;
	const options = [
		{ id: 'radio-accept', label: 'Partecipa', value: 0 },
		{ id: 'radio-refuse', label: 'Rifiuta', value: 1 },
		{ id: 'radio-postpone', label: 'Posticipa risposta', value: 2 }
	];
	$: selected = accepted ? 0 : 1;
	let initial = selected;

	const editInvitation = async () => {
		if (selected === initial) {
			inputEl.checked = false;
			return;
		}
		switch (selected) {
			case 0:
				await invitationService.acceptAppointment(
					appointmentId,
					sessionStorage.getItem('jwt_token') || '',
					true
				);
				break;
			case 1:
				await invitationService.declineAppointment(
					appointmentId,
					sessionStorage.getItem('jwt_token') || '',
					true
				);
				break;
			case 2:
				// TODO: wait for postpone-invitation api
				break;
		}

		inputEl.checked = false;
	};
</script>

<input bind:this={inputEl} type="checkbox" {id} class="modal-toggle" />
<label for={id} class="modal modal-bottom cursor-pointer">
	<label class="modal-box relative text-xs" for="">
		<p class="text-center text-xl font-bold">Modifica partecipazione</p>
		<ul class="mt-10">
			{#each options as option}
				<li class="mt-6 flex items-center gap-4">
					<input
						type="radio"
						bind:group={selected}
						value={option.value}
						id={option.id}
						class="radio-primary radio radio-xs"
					/>
					<label for={option.id} class:font-bold={selected === option.value}>{option.label}</label>
				</li>
			{/each}
		</ul>
		<button on:click={editInvitation} class="btn-primary btn-sm btn mt-10 h-10 w-full">
			Conferma
		</button>
	</label>
</label>
