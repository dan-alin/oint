<script lang="ts">
	import { apiCall } from '../../utils/api-call';

	enum ModeEnum {
		PHOTO = 'photo',
		LOCAL = 'local',
		REMOVE = 'remove'
	}
	let mode: ModeEnum = ModeEnum.PHOTO;
	let inputFile: HTMLInputElement;

	const onSubmit = () => {
		switch (mode) {
			case ModeEnum.LOCAL:
				inputFile.click();
				break;
		}
	};

	const handleFileInputChange = (event: any) => {
		const filereader = new FileReader();
		filereader.readAsDataURL(event.target.files[0]);
		filereader.onload = async (evt: any) => {
			var base64 = evt.target.result;
			await apiCall(
				'/api/profile-image',
				'post',
				'Request sent',
				JSON.stringify({ image: base64 }),
				sessionStorage.getItem('jwt_token') || ''
			);
		};
	};
</script>

<div class="modal modal-bottom z-[51]  md:modal-middle " id="change-profile-picture-modal">
	<div class="modal-box  bg-base-200 pb-10 ">
		<label for="change-profile-picture-modal" class="btn-sm btn-circle btn absolute right-2 top-2"
			>✕</label
		>
		<div>
			<form class="flex flex-col gap-6" on:submit|preventDefault={onSubmit}>
				<label class="flex cursor-pointer items-center">
					<input type="radio" bind:group={mode} class="radio-primary radio" value="photo" />
					<span class="label-text ml-4">Scatta foto</span>
				</label>
				<label class="flex cursor-pointer items-center">
					<input type="radio" bind:group={mode} class="radio-primary radio" value="local" />
					<span class="label-text ml-4">Carica foto dal tuo rullino</span>
				</label>
				<label class="flex cursor-pointer items-center">
					<input type="radio" bind:group={mode} class="radio-primary radio" value="remove" />
					<span class="label-text ml-4">Rimuovi attuale</span>
				</label>
				<button class="btn-primary btn mt-6">Conferma</button>
			</form>
		</div>
	</div>
</div>
<input
	type="file"
	id="file"
	class="hidden"
	bind:this={inputFile}
	on:change={handleFileInputChange}
/>
