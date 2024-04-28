<script lang="ts">
    import Header from "./components/Header.svelte";
    import About from "./components/About.svelte";
    import Footer from "./components/Footer.svelte";
    import Contact from "./components/Contact.svelte";
    import Skills from "./components/Skills.svelte";
    import Experiences from "./components/Experiences.svelte";
</script>

<Header />
<main>
    <About />
    <Skills />
    <Experiences />
    <Contact />
    <Footer />
</main>

<style>
    main {
        height: calc(100dvh - 8.5rem);
        background-color: var(--third-color);
        overflow: auto;
    }
    :global(section) {
        min-height: calc(100dvh - 8.5rem);
        display: flex;
        padding: 1rem;
    }
    :global(button svg, a svg) {
        width: 2rem;
        height: 2rem;
    }
</style>
