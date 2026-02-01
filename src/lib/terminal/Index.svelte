<script lang="ts">
    import { onMount } from "svelte";
    import { FAKE_INPUT_CURSOR_SIZE } from "./constants";
    import TerminalHistory from "./components/History.svelte";
    import TerminalInfo from "./components/Info.svelte";
    import TerminalHeader from "./components/Header.svelte";
    import MatrixRain from "./components/MatrixRain.svelte";
    import { commands, getCommandNames } from "./core/Commands";
    import { input, history, wd, showMatrix, isHacking } from "./store";

    // Elements
    let hiddenInput: HTMLInputElement;
    let fakeInput: HTMLSpanElement;
    let fakeInputCursor: HTMLSpanElement;
    let terminalBody: HTMLElement;
    // Fake Cursor Position Control
    let fakeInputCursorPosition: number = 0;
    let historyLookup: boolean = false;
    let suggestions: string[] = [];
    let showSuggestions: boolean = false;
    let selectedSuggestion: number = -1;
    $: historyLookupIndex = $history.length;

    $: fakeInputSize = $input.length * FAKE_INPUT_CURSOR_SIZE;
    
    // Auto-scroll to bottom when history changes
    $: if ($history && terminalBody) {
        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);
    }
    
    // Update suggestions based on input
    $: {
        const trimmedInput = $input.trim();
        if (trimmedInput.length > 0) {
            const commandNames = getCommandNames();
            suggestions = commandNames.filter(cmd => 
                cmd.startsWith(trimmedInput.split(" ")[0])
            );
            showSuggestions = suggestions.length > 0 && !trimmedInput.includes(" ");
        } else {
            suggestions = [];
            showSuggestions = false;
        }
        selectedSuggestion = -1;
    }
    
    // Fake cursor control:
    $: if (fakeInputCursor) {
        // Fake cursor position:
        fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
        // Fake cursor style:
        if (fakeInputCursorPosition < 0) {
            fakeInputCursor.style.backgroundColor = "transparent";
            fakeInputCursor.style.border = "1px solid var(--tn-white)";
        } else {
            fakeInputCursor.style.backgroundColor = "var(--matrix-green)";
            fakeInputCursor.style.border = "none";
        }
    }

    function setInput(value: string = "") {
        $input = value;
    }

    function setFakeInputCursorPosition(value: number) {
        fakeInputCursorPosition = value;
    }

    function setHistory(h: ICommandHistory) {
        $history.push(h);
        history.set($history);
    }

    function resetHistoryLookup(resetInput: boolean = false) {
        historyLookup = false;
        historyLookupIndex = $history.length;

        if (resetInput) {
            setInput();
        }
    }
    
    function applySuggestion(suggestion: string) {
        setInput(suggestion + " ");
        showSuggestions = false;
        selectedSuggestion = -1;
        hiddenInput.focus();
    }

    function handleKeyDown(e: KeyboardEvent): void {
        fakeInput.style.backgroundColor = "transparent";
        fakeInput.style.color = "var(--tn-white)";

        // Handle Tab for autocomplete
        if (e.key === "Tab") {
            e.preventDefault();
            if (suggestions.length > 0) {
                if (selectedSuggestion === -1) {
                    applySuggestion(suggestions[0]);
                } else {
                    applySuggestion(suggestions[selectedSuggestion]);
                }
            }
            return;
        }

        switch (e.key) {
            case "Enter":
                showSuggestions = false;
                try {
                    const arrInput = $input.split(" ");
                    const command = arrInput.shift();

                    if (command) {
                        const internals = commands[command];

                        if (typeof internals === "undefined") {
                            throw `Command not found: ${command}. Type 'help' for available commands.`;
                        }

                        const options = arrInput.filter((i) =>
                            i.match(/\-{1,2}\w{1,}/gi),
                        );

                        const parameters = arrInput.filter((i) =>
                            i.match(/(?!-)^\S+$/gi),
                        );

                        const output = internals.exec({ options, parameters });
                        if (typeof output !== "undefined") {
                            setHistory({
                                ...output,
                                path: $wd,
                                input: $input,
                            });
                        }
                    } else {
                        setHistory({
                            output: "",
                            lookup: false,
                            path: $wd,
                            input: $input,
                        });
                    }
                } catch (err: any) {
                    setHistory({
                        output: err,
                        lookup: true,
                        path: $wd,
                        input: $input,
                    });
                } finally {
                    setFakeInputCursorPosition(0);
                    setInput();
                }

                break;
            case "ArrowLeft":
                if (e.shiftKey) {
                    e.preventDefault();
                } else {
                    if (fakeInputSize > Math.abs(fakeInputCursorPosition)) {
                        setFakeInputCursorPosition(
                            (fakeInputCursorPosition -= FAKE_INPUT_CURSOR_SIZE),
                        );
                    }
                }

                break;
            case "ArrowRight":
                if (e.shiftKey) {
                    e.preventDefault();
                } else {
                    if (fakeInputCursorPosition < 0) {
                        setFakeInputCursorPosition(
                            (fakeInputCursorPosition += FAKE_INPUT_CURSOR_SIZE),
                        );
                    }
                }

                break;
            case "ArrowDown":
                if (showSuggestions && suggestions.length > 0) {
                    e.preventDefault();
                    selectedSuggestion = Math.min(selectedSuggestion + 1, suggestions.length - 1);
                    break;
                }
                if (historyLookup) {
                    const condition = historyLookupIndex + 1 < $history.length;
                    if (condition) {
                        historyLookupIndex++;
                        let hist = $history[historyLookupIndex];
                        while (hist.lookup === false) {
                            if (condition) {
                                break;
                            }

                            historyLookupIndex++;
                            hist = $history[historyLookupIndex];
                        }

                        if (hist && hist.lookup) {
                            setInput(hist.input);
                            break;
                        }
                    }

                    resetHistoryLookup(true);
                }

                setFakeInputCursorPosition(0);

                break;
            case "ArrowUp":
                if (showSuggestions && suggestions.length > 0) {
                    e.preventDefault();
                    selectedSuggestion = Math.max(selectedSuggestion - 1, 0);
                    break;
                }
                if ($input === "" || historyLookup) {
                    historyLookup = true;
                    const condition = historyLookupIndex - 1 >= 0;
                    if (condition) {
                        historyLookupIndex--;
                        let hist = $history[historyLookupIndex];
                        while (hist.lookup === false) {
                            if (condition) {
                                break;
                            }

                            historyLookupIndex--;
                            hist = $history[historyLookupIndex];
                        }

                        if (hist && hist.lookup) {
                            setInput(hist.input);
                        }
                    }
                } else {
                    setFakeInputCursorPosition(-fakeInputSize);
                }

                break;
            case "Escape":
                showSuggestions = false;
                $showMatrix = false;
                $isHacking = false;
                break;
            default:
                // Handle Ctrl+A
                if (e.ctrlKey && (e.key === "a" || e.key === "A")) {
                    fakeInput.style.backgroundColor = "var(--tn-white)";
                    fakeInput.style.color = "var(--tn-bg-night)";
                    setFakeInputCursorPosition(0);
                }
                // Handle Ctrl+C
                if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
                    setHistory({
                        output: "",
                        lookup: false,
                        path: $wd,
                        input: `${$input}^C`,
                    });
                    setInput();
                    setFakeInputCursorPosition(0);
                }
                break;
        }

        if (historyLookup && e.key !== "ArrowUp" && e.key !== "ArrowDown") {
            resetHistoryLookup();
        }
    }

    function focusOnHiddenInput(): void {
        hiddenInput.focus();
    }
    
    onMount(() => {
        focusOnHiddenInput();
    });
</script>

<svelte:window on:click={focusOnHiddenInput} />

{#if $showMatrix}
    <MatrixRain fullscreen={true} />
{/if}

<main class="terminal" class:hacking={$isHacking}>
    <div class="terminal-window">
        <div class="terminal-titlebar">
            <div class="titlebar-buttons">
                <span class="btn-close"></span>
                <span class="btn-minimize"></span>
                <span class="btn-maximize"></span>
            </div>
            <span class="titlebar-title">mr-utzig@terminal: ~</span>
        </div>
        <div class="terminal-body" bind:this={terminalBody}>
            <MatrixRain fullscreen={false} />
            <div class="terminal-content">
                <TerminalHeader />
                <TerminalHistory history={$history} />
                <TerminalInfo wd={$wd}>
                    <span class="fake-ci__input" bind:this={fakeInput}>{$input}</span>
                    <span class="fake-ci__cursor" bind:this={fakeInputCursor} />
                </TerminalInfo>
                
                {#if showSuggestions && suggestions.length > 0}
                    <div class="suggestions">
                        {#each suggestions as suggestion, i}
                            <button 
                                class="suggestion" 
                                class:selected={i === selectedSuggestion}
                                on:click={() => applySuggestion(suggestion)}
                            >
                                {suggestion}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <input
        type="text"
        bind:this={hiddenInput}
        bind:value={$input}
        on:keydown={handleKeyDown}
    />
    
    <!-- Mobile keyboard trigger -->
    <button class="mobile-keyboard-btn" on:click={focusOnHiddenInput}>
        ⌨️ Tap to type
    </button>
</main>

<style>
    .terminal {
        min-height: 100vh;
        padding: 2rem;
        background: var(--tn-bg-night);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .terminal.hacking {
        animation: hackerGlow 0.1s infinite;
    }
    
    @keyframes hackerGlow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(10deg); }
    }
    
    .terminal-window {
        width: 100%;
        max-width: 120rem;
        min-height: 80vh;
        background: rgba(26, 27, 38, 0.95);
        border-radius: 1.2rem;
        overflow: hidden;
        box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(192, 202, 245, 0.1),
            0 0 60px rgba(0, 255, 65, 0.1);
        backdrop-filter: blur(20px);
        display: flex;
        flex-direction: column;
    }
    
    .terminal-titlebar {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem 1.5rem;
        background: var(--tn-black);
        border-bottom: 1px solid var(--glass-border);
    }
    
    .titlebar-buttons {
        display: flex;
        gap: 0.8rem;
    }
    
    .titlebar-buttons span {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
    }
    
    .btn-close { background: var(--tn-red); }
    .btn-minimize { background: var(--tn-yellow); }
    .btn-maximize { background: var(--tn-green); }
    
    .titlebar-title {
        flex: 1;
        text-align: center;
        font-size: 1.3rem;
        color: var(--tn-comment);
    }
    
    .terminal-body {
        flex: 1;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    .terminal-content {
        position: relative;
        z-index: 2;
        padding: 1.5rem;
        font-size: 1.5rem;
    }
    
    .fake-ci__input {
        white-space: pre;
        color: var(--tn-white);
    }
    
    .fake-ci__cursor {
        position: relative;
        box-sizing: border-box;
        width: var(--terminal-fake-cursor-width);
        background-color: var(--matrix-green);
        animation: blink 1s step-end infinite;
    }
    
    .suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.8rem;
        background: var(--tn-bg-storm);
        border: 1px solid var(--glass-border);
        border-radius: 0.5rem;
    }
    
    .suggestion {
        padding: 0.4rem 0.8rem;
        font-size: 1.3rem;
        font-family: inherit;
        color: var(--tn-foreground);
        background: var(--tn-black);
        border: 1px solid transparent;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .suggestion:hover,
    .suggestion.selected {
        color: var(--matrix-green);
        border-color: var(--matrix-green);
        background: rgba(0, 255, 65, 0.1);
    }
    
    input {
        position: absolute;
        left: -9999px;
        opacity: 0;
    }
    
    .mobile-keyboard-btn {
        display: none;
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1.2rem 2.4rem;
        font-size: 1.6rem;
        font-family: inherit;
        color: var(--matrix-green);
        background: var(--tn-bg-storm);
        border: 2px solid var(--matrix-green);
        border-radius: 3rem;
        cursor: pointer;
        z-index: 100;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 var(--matrix-green-glow); }
        50% { box-shadow: 0 0 20px 5px var(--matrix-green-glow); }
    }
    
    @keyframes blink {
        50% { opacity: 0; }
    }
    
    @media only screen and (max-width: 768px) {
        .terminal {
            padding: 1rem;
        }
        
        .terminal-window {
            min-height: 70vh;
            border-radius: 0.8rem;
        }
        
        .terminal-content {
            font-size: 1.3rem;
        }
        
        .mobile-keyboard-btn {
            display: block;
        }
    }
</style>
