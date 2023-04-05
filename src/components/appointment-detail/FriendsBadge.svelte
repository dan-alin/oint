<script lang="ts">
	import { Icons } from "../../enums";
	import type { FriendData } from "../../models";
	import Icon from "../Icon.svelte";


    export let friends: FriendData[];
</script>

<div class="flex items-center bg-white rounded-full justify-center w-56 p-4 m-auto">
    <div class="avatar-group -space-x-3">
        {#each friends.slice(0, 3) as friend}
            <div class="avatar ">
                <div class="w-[35px] bg-white">
                    <Icon icon={Icons.PROFILE_FULL}/>
                </div>
            </div>
        {/each}
    </div>
    <p class="text-base ml-1">{friends.length} invitati</p>
</div>