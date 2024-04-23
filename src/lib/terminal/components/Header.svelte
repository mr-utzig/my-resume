<script>
    import { MR_UTZIG_BANNER } from "../constants";
</script>

<div class="header">
    <!-- <span class="header__description">Welcome to</span> -->
    <pre class="header__welcome">{MR_UTZIG_BANNER}</pre>
    <!-- <span class="header__description">A Unix Shell like portfolio!</span> -->
    <div class="header__helper">
        <span>=> Type 'help' to get known to the avaible commands.</span><br />
        <span>=> Else if you're not a real programmer just type 'goto --ui'.</span
        >
    </div>
</div>

<style>
    .header {
        margin-bottom: 1rem;
    }
    .header__welcome {
        font-size: 0.2rem;
        margin: unset;
    }
    /* .header__description {
        font-weight: bold;
    } */
    .header__helper {
        font-size: 1.15rem;
        margin-top: 1.5rem;
    }
</style>
