<script lang="ts">
	import { goto } from '$app/navigation';
	import HeaderMenu from '../../../components/HeaderMenu.svelte';
	import ModalSuccess from '../../../components/ModalSuccess.svelte';
	import { userStore } from '../../../stores/user';
	import { apiCall } from '../../../utils/api-call';

	let modalOpened = false;

	const closeModal = () => {
		deleteAccount();
		modalOpened = false;
	};
	const openModal = () => (modalOpened = true);
	const deleteAccount = async () => {
		await apiCall(
			`/api/delete-user/${$userStore.id}`,
			'get',
			'',
			undefined,
			sessionStorage.getItem('jwt_token') || ''
		);
		sessionStorage.setItem('jwt_token', '');
		goto('/bye');
	};
</script>

<section class="h-full px-6 pt-8">
	<HeaderMenu firstRow="Cancella" secondRow="Account" goto="/profile" />
	<div class="flex h-5/6 flex-col justify-between">
		<div>
			<p class="mb-6 text-base">
				Se deisderi puoi anche lasciarci... ma sappi che i membri del nostro team, i tuoi amici e
				qualche conoscente sicuramente paingeranno questa perdita.
			</p>
			<p class="text-base">Fai la scelta giusta</p>
		</div>
		<button class="btn-primary btn" on:click={openModal}>Voglio cancellare il mio account</button>
	</div>
</section>
<ModalSuccess
	{modalOpened}
	id="successModal"
	onConfirm={closeModal}
	onCancel={closeModal}
	title="mmm... vuoi davvero lasciarci così?"
	subTitle="Ci dispiace non ti sia trovato bene con il nostro servizio. Abbiamo nuove idee in serbo per te. Sempre che tu sia disposto ad aspettarci"
	confirmBtnLabel="Conferma"
	cancelBtnLabel="Annulla"
/>
