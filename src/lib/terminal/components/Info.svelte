<script lang="ts">
    export let wd: string = "~";
</script>

<div class="command-input">
    <span class="ci__username">resume</span>@
    <span class="ci__domain">mr-utzig</span>:
    <span class="ci__pwd">{wd}</span>$&nbsp;
    <slot />
</div>

<style>
    .command-input {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }
    .ci__username {
        font-weight: bold;
        color: var(--terminal-green-color);
    }
    .ci__domain {
        font-weight: bold;
        color: var(--terminal-green-color);
    }
    .ci__pwd {
        font-weight: bold;
        color: var(--terminal-blue-color);
        margin: 0 0.5rem;
    }
</style>
