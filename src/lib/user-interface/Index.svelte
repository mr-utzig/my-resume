<script lang="ts">
    import LutzigLogo from "../../assets/imgs/logo/lutzig.svg";
</script>

<section>
    <div>
        <a href="/bin/bash" rel="alternate">
            <img src={LutzigLogo} class="logo" alt="Lutzig Logo" />
        </a>
    </div>
    <h1>
        🚧 Work in Progress: Crafting something amazing. Stay tuned for updates!
        🚧
    </h1>
</section>

<style>
    section {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    .logo {
        height: 15rem;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #219dd0);
    }
    h1 {
        font-size: 2.5rem;
        text-align: center;
    }
</style>
