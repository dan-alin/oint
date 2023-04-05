<script lang="ts">
	import { Icons } from "../../enums";
	import Icon from "../Icon.svelte";

    export let label: string;
</script>

<div class="flex bg-green-100 p-2 justify-center items-center w-full">
    <Icon icon={Icons.ACCEPTED} />
    <span class="ml-2 font-bold text-green-600">{label}</span>
</div>