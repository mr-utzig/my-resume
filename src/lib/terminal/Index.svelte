<script lang="ts">
    import { ARRAY_ARROW_KEYS, ARRAY_HORIZONTAL_ARROW_KEYS, FAKE_INPUT_CURSOR_SIZE } from "./constants";
    import TerminalHistory from "./components/History.svelte";
    import TerminalInfo from "./components/Info.svelte";

    let command: string = "";
    let wd: string = "~";
    const history: ICommandHistory[] = [];

    let hiddenInput: HTMLInputElement;
    let fakeInput: HTMLSpanElement;
    let fakeInputCursor: HTMLSpanElement;
    let fakeInputCursorPosition: number = 0;
    let lastFakeInputCursorPosition: number = 0;
    let lastCursorPositionIndex: number = 0;
    let textWasSelected: boolean = false;

    $: fakeInputSize = command.length * FAKE_INPUT_CURSOR_SIZE;

    function inputControlKeyDown(e: KeyboardEvent): void {
        fakeInput.style.backgroundColor = "transparent";
        fakeInput.style.color = "var(--light-color)";

        switch (e.key) {
            case "Enter":
                try {
                    const target = e.target as HTMLInputElement;

                    const input = target.value.split(" ");
                    const command = input.shift();
                    const flasgs = input.filter((i) =>
                        i.match(/\-{1,2}\w{1,}/gi),
                    );
                    const parameters = input.filter((i) =>
                        i.match(/(?!-)^\S+$/gi),
                    );

                    console.log(input, command, flasgs, parameters);
                } catch (e) {
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
                if (fakeInputSize > Math.abs(fakeInputCursorPosition)) {
                    fakeInputCursorPosition -= FAKE_INPUT_CURSOR_SIZE;
                    fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
                }

                break;
            case "ArrowRight":
                if (fakeInputCursorPosition < 0) {
                    fakeInputCursorPosition += FAKE_INPUT_CURSOR_SIZE;
                    fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
                }

                break;
            case "ArrowDown":
                fakeInputCursorPosition = -fakeInputSize;
                fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;

                break;
            case "ArrowUp":
                fakeInputCursorPosition = 0;
                fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;

                break;
            case "a" || "A":
                if (e.ctrlKey) {
                    fakeInput.style.backgroundColor = "var(--light-color)";
                    fakeInput.style.color = "var(--dark-color)";
                    fakeInputCursorPosition = 0;
                    fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
                }

                break;
            default:
                break;
        }
    }

    function inputControlKeyUp(e: KeyboardEvent): void {
        // TODO: Corrigir problema na posicao do cursor do input e do fake
        if (textWasSelected && !ARRAY_ARROW_KEYS.includes(e.key)) {
            fakeInputCursorPosition =
                -Math.floor(
                    (fakeInputSize * lastCursorPositionIndex) /
                        lastFakeInputCursorPosition,
                ) * FAKE_INPUT_CURSOR_SIZE;

            fakeInputCursor.style.left = `${fakeInputCursorPosition}rem`;
        }

        textWasSelected =
            (ARRAY_HORIZONTAL_ARROW_KEYS.includes(e.key) && e.shiftKey) ||
            (textWasSelected && e.key == "Shift");
        if (textWasSelected) {
            lastFakeInputCursorPosition = fakeInputSize;
            lastCursorPositionIndex = Math.abs(
                fakeInputCursorPosition / FAKE_INPUT_CURSOR_SIZE,
            );
        }

        if (fakeInputCursorPosition < 0) {
            fakeInputCursor.style.backgroundColor = "transparent";
            fakeInputCursor.style.border = "1px solid var(--light-color)";
        } else {
            fakeInputCursor.style.backgroundColor = "var(--light-color)";
            fakeInputCursor.style.border = "none";
        }
    }

    function focusOnHiddenInput(): void {
        hiddenInput.focus();
    }
</script>

<svelte:window on:click={focusOnHiddenInput} />
<section class="terminal">
    <TerminalHistory {history} />
    <TerminalInfo {wd}>
        <span class="fake-ci__input" bind:this={fakeInput}>{command}</span>
        <span class="fake-ci__cursor" bind:this={fakeInputCursor} />
    </TerminalInfo>
    <input
        type="text"
        id="hiddenInput"
        bind:value={command}
        bind:this={hiddenInput}
        on:keyup={inputControlKeyUp}
        on:keydown={inputControlKeyDown}
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
        position: absolute;
        left: -100%;
        border: none;
        outline: none;
        color: transparent;
        background-color: transparent;
        caret-color: transparent;
        padding: 0;
    }
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
