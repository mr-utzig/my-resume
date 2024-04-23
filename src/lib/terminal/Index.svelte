<script lang="ts">
    import { FAKE_INPUT_CURSOR_SIZE } from "./constants";
    import TerminalHistory from "./components/History.svelte";
    import TerminalInfo from "./components/Info.svelte";
    import TerminalHeader from "./components/Header.svelte";
    import { commands } from "./core/Commands";
    import { input, history, wd } from "./store";

    // Elements
    let hiddenInput: HTMLInputElement;
    let fakeInput: HTMLSpanElement;
    let fakeInputCursor: HTMLSpanElement;
    // Fake Cursor Position Control
    let fakeInputCursorPosition: number = 0;
    let historyLookup: boolean = false;
    $: historyLookupIndex = $history.length;

    $: fakeInputSize = $input.length * FAKE_INPUT_CURSOR_SIZE;
    // Fake cursor control:
    $: if (fakeInputCursor) {
        // Fake cursor position:
        fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
        // Fake cursor style:
        if (fakeInputCursorPosition < 0) {
            fakeInputCursor.style.backgroundColor = "transparent";
            fakeInputCursor.style.border = "1px solid var(--light-color)";
        } else {
            fakeInputCursor.style.backgroundColor = "var(--light-color)";
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

    function handleKeyDown(e: KeyboardEvent): void {
        fakeInput.style.backgroundColor = "transparent";
        fakeInput.style.color = "var(--light-color)";

        switch (e.key) {
            case "Enter":
                try {
                    const arrInput = $input.split(" ");
                    const command = arrInput.shift();

                    if (command) {
                        const internals = commands[command];

                        if (typeof internals === "undefined") {
                            throw `Command not found: ${command}`;
                        }

                        const options = arrInput.filter((i) =>
                            i.match(/\-{1,2}\w{1,}/gi),
                        );

                        const parameters = arrInput.filter((i) =>
                            i.match(/(?!-)^\S+$/gi),
                        );

                        if (
                            Object.keys(internals.options).length &&
                            !options.length
                        ) {
                            throw `${command}: invalid option`;
                        }

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
            case e.ctrlKey && ("a" || "A"):
                fakeInput.style.backgroundColor = "var(--light-color)";
                fakeInput.style.color = "var(--dark-color)";
                setFakeInputCursorPosition(0);

                break;
            case e.ctrlKey && ("c" || "C"):
                setHistory({
                    output: "",
                    lookup: false,
                    path: $wd,
                    input: `${$input}^C`,
                });
                setInput();
                setFakeInputCursorPosition(0);

                break;
            default:
                break;
        }

        if (historyLookup && e.key !== "ArrowUp" && e.key !== "ArrowDown") {
            resetHistoryLookup();
        }
    }

    function focusOnHiddenInput(): void {
        hiddenInput.focus();
    }
</script>

<svelte:window on:load={focusOnHiddenInput} on:click={focusOnHiddenInput} />
<section class="terminal">
    <TerminalHeader />
    <TerminalHistory history={$history} />
    <TerminalInfo wd={$wd}>
        <span class="fake-ci__input" bind:this={fakeInput}>{$input}</span>
        <span class="fake-ci__cursor" bind:this={fakeInputCursor} />
    </TerminalInfo>
    <input
        type="text"
        bind:this={hiddenInput}
        bind:value={$input}
        on:keydown={handleKeyDown}
    />
</section>

<style>
    .terminal {
        font-size: 1.5rem;
    }
    .fake-ci__input {
        white-space: pre;
    }
    .fake-ci__cursor {
        position: relative;
        box-sizing: border-box;
        width: var(--terminal-fake-cursor-width);
        background-color: var(--light-color);
        animation: blink 1.25s linear infinite;
    }
    input {
        /* position: absolute;
        left: -100%;
        border: none;
        outline: none;
        color: transparent;
        background-color: transparent;
        caret-color: transparent;
        padding: 0; */
    }
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
