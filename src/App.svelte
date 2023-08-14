<script lang="ts">
	import TerminalInfo from "./lib/Terminal/Info.svelte";
	import TerminalHistory from "./lib/Terminal/History.svelte";

	let command: string = "";
	let wd: string = "";
	const history: ICommandHistory[] = [];

	let hiddenInput: HTMLInputElement;
	let inputCursor: HTMLSpanElement;
	let inputCursorPosition: number = 0;
	let inputCursorSize: number = 0.923;

	function processCommandInput(e: KeyboardEvent): void {
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
					console.log(e);

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
				console.log(
					"LEFT",
					command.length,
					inputCursorSize,
					command.length * inputCursorSize,
					inputCursorPosition
				);

				if (command.length * inputCursorSize > Math.abs(inputCursorPosition)) {
					inputCursorPosition -= inputCursorSize;
					inputCursor.style.left = `${inputCursorPosition}rem`;
				}

				break;
			case "ArrowRight":
				console.log(
					"RIGHT",
					command.length,
					inputCursorSize,
					command.length * inputCursorSize,
					inputCursorPosition
				);

				if ((command.length * inputCursorSize) > 0) {
					inputCursorPosition += inputCursorSize;
					inputCursor.style.left = `${inputCursorPosition}rem`;
				}

				break;
			case "ArrowUp":
				break;
			case "ArrowDown":
				break;
			default:
		}
	}

	function focusOnHiddenInput(): void {
		hiddenInput.focus();
	}
</script>

<svelte:window on:click={focusOnHiddenInput} />
<main class="terminal">
	<TerminalHistory {history} />
	<TerminalInfo {wd}>
		<span class="fake-ci__input">{command}</span>
		<span class="fake-ci__cursor" bind:this={inputCursor} />
	</TerminalInfo>
	<input
		type="text"
		id="hiddenInput"
		bind:value={command}
		bind:this={hiddenInput}
		on:keydown={processCommandInput}
	/>
</main>

<style>
	.terminal {
		font-size: 1.5rem;
	}
	.fake-ci__input {
		white-space: pre;
		background-color: aliceblue;
		color: black;
	}
	.fake-ci__cursor {
		position: relative;
		box-sizing: border-box;
		width: 0.923rem;
		/* background-color: #66d9ef; */
		background-color: transparent;
		border: 1px solid #66d9ef;
		/* margin-left: 0.1rem; */
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
