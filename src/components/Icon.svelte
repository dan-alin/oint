<script lang="ts">
	import type { Icons } from '../enums';

	export let width: string = '24';
	export let height: string = '24';
	export let icon: Icons;
</script>

<img src={icon} alt="" {width} {height} />
