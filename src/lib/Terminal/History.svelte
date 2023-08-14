<script lang="ts">
    import TerminalInfo from "./Info.svelte";

    export let history: ICommandHistory[];
</script>

{#each history as command}
    <TerminalInfo wd={command.path}>
        <span class="input">{command.input}</span>
    </TerminalInfo>
    <span class="response">{command.response}</span>
{/each}
