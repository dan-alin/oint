<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import InputText from '../InputText.svelte';
	import { it } from '../../utils/datepicker-it';
	import { noop } from 'svelte/internal';
	import type { usePosition } from 'svelty-picker/utils/utils';

	export let onSubmit: () => void;
	export let name: string;
	export let surname: string;
	export let nickname: string;
	export let birthdate: string;

	const positionFn: typeof usePosition = (el) => {
		const divEl = el as HTMLDivElement;
		divEl.style.position = 'absolute';
		divEl.style.bottom = '1rem';
		divEl.style.left = '50%';
		divEl.style.transform = 'translateX(-50%)';
		return { destroy: noop };
	};
</script>

<form
	class="grid grid-cols-1 grid-rows-3 gap-6  "
	id="1-register"
	on:submit|preventDefault={onSubmit}
>
	<InputText type="text" id="name" name="name" placeholder="Nome" required bind:value={name} />
	<InputText
		type="text"
		id="surname"
		name="surname"
		placeholder="Cognome"
		required
		bind:value={surname}
	/>
	<InputText
		type="text"
		id="nickname"
		name="nickname"
		placeholder="Nickname"
		required
		bind:value={nickname}
	/>
	<SveltyPicker
		inputClasses="svelty-pckr"
		format="dd/mm/yyyy"
		name="birthdate"
		inputId="birthdate"
		placeholder="Data di nascita"
		required
		bind:value={birthdate}
		i18n={it}
		todayBtn={false}
		clearBtn={false}
		{positionFn}
	/>
</form>
