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

	function inputFocus(): void {
		document.getElementById("commandInput").focus();
	}
</script>

<svelte:window on:click={inputFocus} />
<main class="terminal">
	<TerminalHistory {history} />
	<TerminalInfo>
		<input
			type="text"
			id="commandInput"
			bind:value={command}
			autocomplete="off"
		/>
	</TerminalInfo>
</main>

<style>
	.terminal {
		width: 100%;
		font-size: 1.4rem;
	}
	input {
		flex: 1;
		border: none;
		outline: none;
		background-color: transparent;
		font-family: "FiraCode";
	}
</style>
