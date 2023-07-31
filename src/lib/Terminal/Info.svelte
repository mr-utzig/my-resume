<script lang="ts">
    export let pwd: string = "~";
</script>

<div class="command-input">
    <span class="ci__username">resume</span>@
    <span class="ci__domain">lutzig</span>:
    <span class="ci__pwd">{pwd}</span>$&nbsp;
    <slot />
</div>

<style>
    .command-input {
        display: flex;
        align-items: center;
    }
    .ci__username {
        color: #8a61da;
    }
    .ci__domain {
        color: #c2544f;
    }
    .ci__pwd {
        color: #a6e22e;
        margin: 0 0.5rem;
    }
</style>
