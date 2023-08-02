<script lang="ts">
	import TerminalInfo from "./lib/Terminal/Info.svelte";
	import TerminalHistory from "./lib/Terminal/History.svelte";

	let command: string = "";
	const history: ICommandHistory[] = [
		{
			input: "cerveja",
			response: "mim de papai",
			path: "~/juca",
		},
	];

	function processCommandInput(e: KeyboardEvent) {
		if (e.key === "Enter") {
			const target = e.target as HTMLInputElement;
			const input = target.value.split(" ");

			console.log(input)
		}
	}

	function focusOnHiddenInput() {
		document.getElementById("hiddenInput").focus();
	}
</script>

<svelte:body on:click={focusOnHiddenInput} />
<main class="terminal">
	<TerminalHistory {history} />
	<TerminalInfo>
		<span class="fake-ci__input">{command}</span>
		<span class="fake-ci__cursor" />
	</TerminalInfo>
	<input
		type="text"
		id="hiddenInput"
		bind:value={command}	
		on:keypress={processCommandInput}
	/>
</main>

<style>
	.terminal {
		font-size: 1.5rem;
	}
	.fake-ci__cursor {
		width: 1rem;
		/* border: 1px solid #66d9ef;
		background-color: transparent; */
		background-color: #66d9ef;
		margin-left: 0.1rem;
	}
	/* .fake-ci__cursor-focus {
		background-color: #66d9ef;
	} */
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
