<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type PieceOfCode = {
		code: string;
		style: string;
	};

	// consts for the code generator function
	const keywords = ['let', 'const', 'var'];
	const types = ['string', 'number', 'boolean', 'void', 'any', 'unknown', 'never', 'object'];
	const funnyNames = [
		'banana',
		'pizza',
		'kangaroo',
		'flamingo',
		'sloth',
		'taco',
		'giraffe',
		'cactus'
	];
	const tokenColor = '#4FC1FF';
	const letColor = '#9CDCFE';
	const constColor = '#4fc1ff';
	const typesColor = '#4EC9B0';
	const stringColor = '#CE9178';
	const numberColor = '#B4CDA7';
	const textColor = '#d4d4d4d4';
	const bgColor = '#1e1e1e';

	// actual component stuff
	let mockupCode: HTMLDivElement;
	let line: HTMLPreElement;
	const prefixesArr: PieceOfCode[] = [];
	const typesArr: PieceOfCode[] = [];
	const varNamesArr: PieceOfCode[] = [];
	const valuesArr: PieceOfCode[] = [];

	let dots = '';
	let height = 84;
	let initialHeight: number;
	let nextItemIdx = 0;
	let codeInterval: NodeJS.Timer;
	let dotsInterval: NodeJS.Timer;

	onMount(() => {
		codeInterval = setInterval(generateRandomTypeScriptCode, 2000);
		dotsInterval = setInterval(typeDots, 200);
		height = mockupCode.offsetHeight;
		initialHeight = height;
	});

	onDestroy(() => {
		clearInterval(codeInterval);
		clearInterval(dotsInterval);
	});

	const typeDots = () => {
		if (dots.length < 3) {
			dots += '.';
		} else {
			dots = '';
		}
	};

	const generateRandomTypeScriptCode = (): void => {
		const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
		prefixesArr[nextItemIdx % 10] = { code: randomKeyword, style: `color: ${tokenColor}` };

		const randomType = types[Math.floor(Math.random() * types.length)];
		typesArr[nextItemIdx % 10] = { code: randomType, style: `color: ${typesColor}` };

		const randomFunnyName = funnyNames[Math.floor(Math.random() * funnyNames.length)];
		varNamesArr[nextItemIdx % 10] = {
			code: randomFunnyName,
			style: `color: ${randomKeyword === 'const' ? constColor : letColor}`
		};

		if (randomType === 'string') {
			valuesArr[nextItemIdx % 10] = {
				code: `"${randomFunnyName}"`,
				style: `color: ${stringColor}`
			};
		} else if (randomType === 'number') {
			valuesArr[nextItemIdx % 10] = {
				code: Math.floor(Math.random() * 100).toString(),
				style: `color: ${numberColor}`
			};
		} else if (randomType === 'boolean') {
			valuesArr[nextItemIdx % 10] = {
				code: Math.random() < 0.5 ? 'true' : 'false',
				style: `color: ${tokenColor}`
			};
		} else {
			valuesArr[nextItemIdx % 10] = {
				code: 'undefined',
				style: `color: ${tokenColor}`
			};
		}
		nextItemIdx++;
		height += line.offsetHeight;

		if (nextItemIdx === 11) {
			nextItemIdx = 0;
			height = initialHeight;
			prefixesArr.length = 0;
			typesArr.length = 0;
			varNamesArr.length = 0;
			valuesArr.length = 0;
		}
	};
</script>

<section class="container px-8">
	<h1 class="mt-16 text-center text-xl font-semibold">Work In Progress</h1>
	<h4 class="mt-4 text-center">
		ChatGPT is probably offline right now, so this is pretty much all we can do.
	</h4>
	<div
		class="tran mockup-code mx-auto mt-32 text-xs transition-[height] duration-300 ease-in-out"
		style:bgColor
		style:height={height + 'px'}
		bind:this={mockupCode}
	>
		{#each prefixesArr as prefix, i}
			<pre data-prefix="$"><code
					><span style={prefix.style}>{prefix.code} </span><span style={varNamesArr[i].style}
						>{varNamesArr[i].code}</span
					><span style:color={textColor}>: </span><span style={typesArr[i].style}
						>{typesArr[i].code}</span
					><span style:color={textColor}> = </span><span style={valuesArr[i].style}
						>{valuesArr[i].code}</span
					><span style:color={textColor}>;</span></code
				></pre>
		{/each}
		<pre data-prefix="$" bind:this={line}><code>{dots}</code></pre>
	</div>
</section>
