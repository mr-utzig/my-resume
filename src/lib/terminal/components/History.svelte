<script lang="ts">
    import TerminalInfo from "./Info.svelte";

    export let history: ICommandHistory[];
</script>

{#each history as command}
    <TerminalInfo wd={command.path}>
        <span class="input">{command.input}</span>
    </TerminalInfo>
    <div class="response">{@html command.output}</div>
{/each}

<style>
    :global(.response table) {
        border-collapse: collapse;
    }
    :global(.response th) {
        text-align: start;
        border-bottom: 0.1rem dashed var(--light-color);
    }
    :global(.response th, .response td) {
        padding-inline: 1rem;
    }
    :global(.response th:first-child, .response td:first-child) {
        border-right: 0.1rem dashed var(--light-color);
    }
    :global(.response label.file) {
        margin-inline: 0.75rem;
    }
    :global(.response label.folder) {
        font-weight: bold;
        color: #67daef;
        margin-inline: 0.75rem;
    }
    :global(.response div.resume__section.about :where(span, p)) {
        font-size: 1.6rem;
    }
    :global(.response div.resume__section.about div) {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: bold;
    }
    :global(.response div.resume__section.about p) {
        text-align: justify;
        text-indent: 5rem;
    }
    :global(.response div.resume__section.skills) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-block: 1rem;
    }
    :global(.response div.resume__section.skills .knowledge-area__wrapper) {
        width: 30rem;
        border: 0.1rem solid var(--light-color);
        border-radius: 0.5rem;
        flex: 1;
    }
    :global(.response div.resume__section.skills .knowledge-area__wrapper h4) {
        border-bottom: 0.1rem solid var(--light-color);
        padding: 1rem;
        margin: 0;
    }
    :global(.response div.resume__section.skills .knowledge-area__skills-list) {
        max-height: 30rem;
        overflow: auto;
    }
    :global(
            .response div.resume__section.skills .knowledge-area__skills-list ul
        ) {
        padding-block: 1rem;
        padding-right: 1rem;
        margin: 0;
    }
    :global(.response div.resume__section.experiences) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-block: 1rem;
    }
    :global(.response div.resume__section.experiences .experience__wrapper) {
        flex: 1 1 30rem;
        border: 0.1rem solid var(--light-color);
        border-radius: 0.5rem;
        padding: 1rem;
    }
    :global(.response div.resume__section.experiences .experience__wrapper h4) {
        margin: 0;
    }
    :global(
            .response div.resume__section.experiences .experience__description
        ) {
        max-height: 30rem;
        overflow: auto;
        margin-top: 1rem;
    }
    :global(
            .response
                div.resume__section.experiences
                .experience__description
                ul
        ) {
        padding-block: 1rem;
        padding-right: 1rem;
        margin: 0;
    }
    :global(.response div.resume__section.contact) {
        display: flex;
        flex-wrap: wrap;
        gap: 2.5rem;
        margin-block: 1rem;
    }
    :global(.response div.resume__section.contact .contact__wrapper) {
        width: fit-content;
        font-size: 1.8rem;
    }
    :global(.response div.resume__section.contact h2) {
        margin: 0;
    }
    :global(.response div.man__wrapper) {
        margin-block: 1rem;
    }
    :global(.response div.man__section) {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    :global(.response div.man__section span) {
        margin-left: 10rem;
    }
    :global(.response h2) {
        font-size: 2rem;
    }
    :global(.response a) {
        display: flex;
        gap: 1rem;
        align-items: center;
        color: var(--light-color);
        text-decoration: none;
    }
</style>
