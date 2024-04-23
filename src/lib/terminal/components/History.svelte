<script lang="ts">
    import TerminalInfo from "./Info.svelte";

    export let history: ICommandHistory[];
</script>

{#each history as command}
    <TerminalInfo wd={command.path}>
        <span class="input">{command.input}</span>
    </TerminalInfo>
    <span class="response">{@html command.output}</span>
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
    :global(.response div.resume__section) {
        display: grid;
        grid-column-gap: 0;
        grid-row-gap: 0;
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
        grid-gap: 1rem;
        grid-template-columns: repeat(4, 1fr);
        margin-block: 1rem;
    }
    :global(.response div.resume__section.skills .knowledge-area__wrapper) {
        border: 0.1rem solid var(--light-color);
        border-radius: 0.5rem;
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
        margin: 0;
    }
    :global(.response div.resume__section.experiences) {
        grid-gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        margin-block: 1rem;
    }
    :global(.response div.resume__section.experiences .experience__wrapper) {
        border: 0.1rem solid var(--light-color);
        border-radius: 0.5rem;
        padding: 1rem;
    }
    :global(.response div.resume__section.experiences .experience__wrapper h4) {
        margin: 0;
    }
    :global(
            .response
                div.resume__section.experiences
                .experience__wrapper
                .experience__info
                :not(h4)
        ) {
        font-size: 1.4rem;
    }
    :global(
            .response div.resume__section.experiences .experience__description
        ) {
        font-size: 1.3rem;
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
        margin: 0;
    }
    :global(.response div.resume__section.contact) {
        grid-gap: 1rem;
        margin-block: 1rem;
    }
    :global(.response div.resume__section.contact .contact__wrapper) {
        width: fit-content;
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
        font-size: 1.75rem;
    }
    :global(.response a) {
        display: flex;
        gap: 1rem;
        align-items: center;
        color: var(--light-color);
        text-decoration: none;
    }
</style>
