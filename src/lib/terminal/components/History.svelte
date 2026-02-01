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
    .input {
        color: var(--tn-white);
    }

    .response {
        margin-bottom: 1rem;
        line-height: 1.4;
    }

    /* Tables */
    :global(.response table) {
        border-collapse: collapse;
    }
    :global(.response th) {
        text-align: start;
        border-bottom: 0.1rem dashed var(--tn-comment);
        color: var(--tn-purple);
    }
    :global(.response th, .response td) {
        padding-inline: 1rem;
        padding-block: 0.3rem;
    }
    :global(.response th:first-child, .response td:first-child) {
        border-right: 0.1rem dashed var(--tn-comment);
    }

    /* File system colors */
    :global(.response label.file) {
        margin-inline: 0.75rem;
        color: var(--tn-white);
    }
    :global(.response label.folder) {
        font-weight: bold;
        color: var(--tn-blue);
        margin-inline: 0.75rem;
    }

    /* Help output */
    :global(.response .help-output) {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    :global(.response .help-output .help-header) {
        color: var(--matrix-green);
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    :global(.response .help-output .help-section) {
        margin-bottom: 1rem;
    }
    :global(.response .help-output .help-section-title) {
        color: var(--tn-purple);
        font-weight: bold;
        margin-bottom: 0.3rem;
    }
    :global(.response .help-output .help-cmd) {
        display: flex;
        gap: 2rem;
        margin-left: 1rem;
    }
    :global(.response .help-output .help-cmd-name) {
        color: var(--tn-cyan);
        min-width: 12rem;
    }
    :global(.response .help-output .help-cmd-desc) {
        color: var(--tn-comment);
    }

    /* LS output */
    :global(.response .ls-output) {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 2rem;
    }
    :global(.response .ls-output .ls-folder) {
        color: var(--tn-blue);
        font-weight: bold;
    }
    :global(.response .ls-output .ls-file) {
        color: var(--tn-white);
    }
    :global(.response .ls-output .ls-exec) {
        color: var(--matrix-green);
    }
    :global(.response .ls-output .ls-link) {
        color: var(--tn-cyan);
    }

    /* Neofetch */
    :global(.response .neofetch) {
        display: flex;
        gap: 2rem;
        margin: 1rem 0;
        align-items: flex-start;
    }
    :global(.response .neofetch-logo) {
        color: var(--tn-blue);
        font-family: monospace;
        line-height: 1.2;
        margin: 0;
        font-size: 0.85em;
    }
    :global(.response .neofetch-info) {
        font-family: monospace;
        line-height: 1.5;
        margin: 0;
    }
    :global(.response .neofetch-label) {
        color: var(--tn-cyan);
        font-weight: bold;
    }
    :global(.response .neofetch-key) {
        color: var(--tn-purple);
        font-weight: bold;
    }
    :global(.response .neofetch-colors) {
        background: linear-gradient(to right, 
            var(--tn-red), var(--tn-orange), var(--tn-yellow), 
            var(--tn-green), var(--tn-cyan), var(--tn-blue), var(--tn-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Tree output */
    :global(.response .tree-output) {
        font-family: monospace;
        line-height: 1.5;
    }
    :global(.response .tree-output .tree-root) {
        color: var(--tn-purple);
        font-weight: bold;
    }
    :global(.response .tree-output .tree-folder) {
        color: var(--tn-blue);
        font-weight: bold;
    }
    :global(.response .tree-output .tree-file) {
        color: var(--tn-white);
    }
    :global(.response .tree-output .tree-branch) {
        color: var(--tn-comment);
    }

    /* Projects output */
    :global(.response .projects-output) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;
    }
    :global(.response .project-card) {
        background: rgba(26, 27, 38, 0.8);
        border: 1px solid var(--tn-comment);
        border-radius: 0.5rem;
        padding: 1rem;
        transition: all 0.3s ease;
    }
    :global(.response .project-card:hover) {
        border-color: var(--tn-purple);
        transform: translateX(0.5rem);
    }
    :global(.response .project-name) {
        color: var(--tn-cyan);
        font-weight: bold;
        font-size: 1.1em;
    }
    :global(.response .project-desc) {
        color: var(--tn-comment);
        margin: 0.5rem 0;
    }
    :global(.response .project-tech) {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    :global(.response .tech-tag) {
        background: var(--tn-purple);
        color: var(--tn-bg);
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        font-size: 0.85em;
    }

    /* Social output */
    :global(.response .social-output) {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin: 1rem 0;
    }
    :global(.response .social-link) {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--tn-white);
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 0.3rem;
        transition: all 0.3s ease;
    }
    :global(.response .social-link:hover) {
        background: rgba(187, 154, 247, 0.1);
        color: var(--tn-purple);
    }
    :global(.response .social-icon) {
        font-size: 1.5em;
        width: 2rem;
        text-align: center;
    }
    :global(.response .social-name) {
        color: var(--tn-cyan);
        min-width: 8rem;
    }
    :global(.response .social-url) {
        color: var(--tn-comment);
    }

    /* Cowsay */
    :global(.response .cowsay) {
        font-family: monospace;
        white-space: pre;
        line-height: 1.2;
        margin: 1rem 0;
    }
    :global(.response .cowsay .bubble) {
        color: var(--tn-white);
    }
    :global(.response .cowsay .cow) {
        color: var(--tn-yellow);
    }

    /* Fortune */
    :global(.response .fortune-output) {
        margin: 1rem 0;
        padding: 1rem;
        border-left: 3px solid var(--tn-purple);
        background: rgba(187, 154, 247, 0.05);
    }
    :global(.response .fortune-quote) {
        color: var(--tn-white);
        font-style: italic;
        margin-bottom: 0.5rem;
    }
    :global(.response .fortune-author) {
        color: var(--tn-cyan);
        text-align: right;
    }

    /* Hack output */
    :global(.response .hack-output) {
        color: var(--matrix-green);
        font-family: monospace;
        margin: 0.5rem 0;
    }
    :global(.response .hack-line) {
        opacity: 0;
        animation: hackTyping 0.3s ease-out forwards;
        line-height: 1.6;
    }
    @keyframes hackTyping {
        0% {
            opacity: 0;
            transform: translateX(-10px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    :global(.response .hack-ok) {
        color: var(--tn-green);
        font-weight: bold;
    }
    :global(.response .hack-password) {
        color: var(--tn-yellow);
    }
    :global(.response .hack-complete) {
        color: var(--tn-red);
        font-weight: bold;
        font-size: 1.2em;
    }
    :global(.response .hack-joke) {
        color: var(--tn-comment);
        font-style: italic;
    }

    /* Cat output */
    :global(.response .cat-output) {
        background: rgba(26, 27, 38, 0.8);
        border: 1px solid var(--tn-comment);
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 0.5rem 0;
    }
    :global(.response .cat-filename) {
        color: var(--tn-purple);
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed var(--tn-comment);
    }
    :global(.response .cat-content) {
        color: var(--tn-white);
        white-space: pre-wrap;
    }

    /* Error output */
    :global(.response .error) {
        color: var(--tn-red);
    }
    :global(.response .warning) {
        color: var(--tn-yellow);
    }
    :global(.response .success) {
        color: var(--matrix-green);
    }

    /* Resume sections */
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
        color: var(--tn-white);
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
        border: 0.1rem solid var(--tn-comment);
        border-radius: 0.5rem;
        flex: 1;
        background: rgba(26, 27, 38, 0.5);
    }
    :global(.response div.resume__section.skills .knowledge-area__wrapper h4) {
        border-bottom: 0.1rem solid var(--tn-comment);
        padding: 1rem;
        margin: 0;
        color: var(--tn-purple);
    }
    :global(.response div.resume__section.skills .knowledge-area__skills-list) {
        max-height: 30rem;
        overflow: auto;
    }
    :global(.response div.resume__section.skills .knowledge-area__skills-list ul) {
        padding-block: 1rem;
        padding-right: 1rem;
        margin: 0;
    }
    :global(.response div.resume__section.skills .knowledge-area__skills-list li) {
        color: var(--tn-white);
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
        border: 0.1rem solid var(--tn-comment);
        border-radius: 0.5rem;
        padding: 1rem;
        background: rgba(26, 27, 38, 0.5);
    }
    :global(.response div.resume__section.experiences .experience__wrapper h4) {
        margin: 0;
        color: var(--tn-cyan);
    }
    :global(.response div.resume__section.experiences .experience__company) {
        color: var(--tn-purple);
    }
    :global(.response div.resume__section.experiences .experience__period) {
        color: var(--tn-comment);
    }
    :global(.response div.resume__section.experiences .experience__description) {
        max-height: 30rem;
        overflow: auto;
        margin-top: 1rem;
    }
    :global(.response div.resume__section.experiences .experience__description ul) {
        padding-block: 1rem;
        padding-right: 1rem;
        margin: 0;
    }
    :global(.response div.resume__section.experiences .experience__description li) {
        color: var(--tn-white);
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
        color: var(--tn-purple);
    }
    :global(.response div.man__wrapper) {
        margin-block: 1rem;
    }
    :global(.response div.man__section) {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    :global(.response div.man__section h3) {
        color: var(--tn-purple);
    }
    :global(.response div.man__section span) {
        margin-left: 10rem;
        color: var(--tn-comment);
    }
    :global(.response h2) {
        font-size: 2rem;
        color: var(--tn-cyan);
    }
    :global(.response a) {
        display: flex;
        gap: 1rem;
        align-items: center;
        color: var(--tn-cyan);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    :global(.response a:hover) {
        color: var(--tn-purple);
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        :global(.response .neofetch) {
            flex-direction: column;
            gap: 1rem;
        }
        :global(.response .neofetch-ascii) {
            font-size: 0.6em;
        }
        :global(.response .help-output .help-cmd) {
            flex-direction: column;
            gap: 0.2rem;
        }
        :global(.response .help-output .help-cmd-name) {
            min-width: unset;
        }
    }
</style>
