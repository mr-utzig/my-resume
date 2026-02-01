<script lang="ts">
    export let wd: string = "~";
</script>

<div class="command-input">
    <span class="ci__user">
        <span class="ci__username">user</span>@<span class="ci__domain">mr-utzig</span>
    </span>
    <span class="ci__separator">:</span>
    <span class="ci__pwd">{wd}</span>
    <span class="ci__prompt">$</span>
    <slot />
</div>

<style>
    .command-input {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        gap: 0.3rem;
    }
    
    .ci__user {
        font-weight: bold;
    }
    
    .ci__username {
        color: var(--tn-green);
    }
    
    .ci__domain {
        color: var(--tn-green);
    }
    
    .ci__separator {
        color: var(--tn-white);
    }
    
    .ci__pwd {
        font-weight: bold;
        color: var(--tn-blue);
    }
    
    .ci__prompt {
        color: var(--matrix-green);
        margin-left: 0.3rem;
        margin-right: 0.5rem;
    }
</style>
