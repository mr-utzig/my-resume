<script lang="ts">
  import LutzigLogo from "./assets/imgs/logo/lutzig.svg";
</script>

<main>
  <div>
    <a href="https://lutzig.com" target="_blank" rel="noreferrer">
      <img src={LutzigLogo} class="logo" alt="Lutzig Logo" />
    </a>
  </div>
  <h1>🚧 Work in Progress: Crafting something amazing. Stay tuned for updates! 🚧</h1>
</main>

<style>
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
  }
</style>
