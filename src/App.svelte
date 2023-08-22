<script lang="ts">
	import TerminalInfo from "./lib/Terminal/Info.svelte";
	import TerminalHistory from "./lib/Terminal/History.svelte";

	let command: string = "";
	let wd: string = "~";
	const history: ICommandHistory[] = [];

	let hiddenInput: HTMLInputElement;
	let fakeInput: HTMLSpanElement;
	let fakeInputCursor: HTMLSpanElement;
	let fakeInputCursorSize: number = 0.923;
	let fakeInputCursorPosition: number = 0;

	let fakeInputCursorBackspace: number = 0;

	// 15.691 -> 100
	// 11.076 -> x

	// 10.153 -> 100
	// z      -> x

	$: fakeInputSize = command.length * fakeInputCursorSize;

	function inputControlKeyDown(e: KeyboardEvent): void {
		fakeInput.style.backgroundColor = "transparent";
		fakeInput.style.color = "#f1faff";

		switch (e.key) {
			case "Enter":
				try {
					const target = e.target as HTMLInputElement;

					const input = target.value.split(" ");
					const command = input.shift();
					const flasgs = input.filter((i) =>
						i.match(/\-{1,2}\w{1,}/gi)
					);
					const parameters = input.filter((i) =>
						i.match(/(?!-)^\S+$/gi)
					);

					console.log(input, command, flasgs, parameters);
				} catch (e) {
					history.push({
						input: e.input,
						response: e.response,
						path: e.path,
					});
				} finally {
					hiddenInput.value = "";
				}

				break;
			case "ArrowLeft":
				if (fakeInputSize > Math.abs(fakeInputCursorPosition)) {
					fakeInputCursorPosition -= fakeInputCursorSize;
					fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
				}

				break;
			case "ArrowRight":
				if (fakeInputCursorPosition < 0) {
					fakeInputCursorPosition += fakeInputCursorSize;
					fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
				}

				break;
			case "ArrowUp":
				fakeInputCursorPosition = fakeInputSize;
				fakeInputCursor.style.left = `-${fakeInputCursorPosition}rem`;

				break;
			case "ArrowDown":
				fakeInputCursorPosition = 0;
				fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;

				break;
			case "a" || "A":
				if (e.ctrlKey) {
					fakeInput.style.backgroundColor = "#f1faff";
					fakeInput.style.color = "#444";
					fakeInputCursorPosition = 0;
					fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
				}

				break;
			default:
				break;
		}

		if (fakeInputCursorPosition < 0) {
			fakeInputCursor.style.backgroundColor = "transparent";
			fakeInputCursor.style.border = "1px solid #66d9ef";
		} else {
			fakeInputCursor.style.backgroundColor = "#66d9ef";
			fakeInputCursor.style.border = "none";
		}
	}

	function inputControlKeyUp(e: KeyboardEvent): void {
		switch (e.key) {
			case "Backspace":
				break;
			default:
				break;
		}

		console.log(
			e.key,
			"Cursor pos:",
			Math.abs(fakeInputCursorPosition),
			"Input size:",
			fakeInputSize
		);
	}

	function focusOnHiddenInput(): void {
		hiddenInput.focus();
	}
</script>

<svelte:window on:click={focusOnHiddenInput} />
<main class="terminal">
	<TerminalHistory {history} />
	<TerminalInfo {wd}>
		<span class="fake-ci__input" bind:this={fakeInput}>{command}</span>
		<span class="fake-ci__cursor" bind:this={fakeInputCursor} />
	</TerminalInfo>
	<input
		type="text"
		id="hiddenInput"
		bind:value={command}
		bind:this={hiddenInput}
		on:keyup={inputControlKeyUp}
		on:keydown={inputControlKeyDown}
	/>
</main>

<style>
	.terminal {
		font-size: 1.5rem;
	}
	.fake-ci__input {
		white-space: pre;
		/* background-color: aliceblue; */
		/* color: black; */
	}
	.fake-ci__cursor {
		position: relative;
		box-sizing: border-box;
		width: 0.923rem;
		background-color: #66d9ef;
	}
	input {
		position: absolute;
		left: -100%;
		border: none;
		outline: none;
		color: transparent;
		background-color: transparent;
		caret-color: transparent;
		padding: 0;
	}
</style>
