<script lang="ts">
    import { useLocation, useNavigate } from "svelte-navigator";
    import { Workspace } from "../../terminal/core/Workspace";
    import { download } from "../../../assets/js/utils";
    import Download from "../../icons/Download.svelte";
    import Terminal from "../../icons/Terminal.svelte";

    const location = useLocation();
    const navigate = useNavigate();

    const sections = ["About", "Skills", "Experience", "Contact"];
    let currentSection = $location.hash.length ? $location.hash.slice(1) : "";

    function sectionFocus() {
        if (currentSection) {
            document.getElementById(currentSection)?.scrollIntoView();
        }
    }

    function downloadCV() {
        download(Workspace.files["resume.pdf"]);
    }

    function openShell() {
        navigate("/bin/bash");
    }
</script>

<svelte:window on:load={sectionFocus} />
<header>
    <h1>
        <span>&lt;</span>mr<span>.</span>utzig<span>&gt;</span>
    </h1>
    <div>
        <nav>
            <ul>
                {#each sections as section}
                    {@const hash = section.toLowerCase()}
                    <li>
                        <a
                            href={`#${hash}`}
                            class:active={currentSection === hash}
                            on:click={() => (currentSection = hash)}
                        >
                            <span>$_</span>
                            {section}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        <div class="actions">
            <button class="download-cv" on:click={downloadCV}>
                <svelte:component this={Download} />
                <span>Download CV</span>
            </button>
            <button class="open-shell" on:click={openShell}>
                <svelte:component this={Terminal} />
                <span>Open Shell</span>
            </button>
        </div>
    </div>
</header>

<style>
    header {
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        min-height: 8rem;
        background-color: var(--surface-color);
        box-shadow: 0 1px 3px var(--dark-color);
        padding: 0.5rem 1rem;
    }
    h1 {
        font-size: 5rem;
        color: var(--light-gray-color);
        margin: 0;
    }
    h1 > span {
        color: var(--second-color);
    }
    header > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    nav ul {
        list-style-type: none;
        padding: 0;
    }
    nav li {
        display: inline-block;
        padding: 0.5rem 1rem;
    }
    nav a {
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--light-gray-color);
        text-decoration: none;
    }
    nav a > span {
        transition: color 250ms ease-in-out;
    }
    nav a:hover > span {
        color: var(--second-color);
    }
    nav a.active > span {
        color: var(--second-color);
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 15rem;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 0.6rem;
        color: var(--light-color);
        background-color: var(--second-color);
        border: 0;
        padding: 0.8rem 1.2rem;
        cursor: pointer;
    }
    button:hover {
        opacity: 0.8;
    }
    .download-cv {
        transition: all 250ms ease-in-out;
    }
    .open-shell {
        position: relative;
    }
    .open-shell:after {
        background-color: var(--second-color);
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0.4rem;
        animation-name: blink;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }
    @keyframes blink {
        0% {
            transform: scale3d(1, 1, 1);
            opacity: 0.8;
        }
        100% {
            transform: scale3d(1.1, 1.3, 1.1);
            opacity: 0;
        }
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        h1 {
            font-size: 4.9rem;
        }
    }
</style>
