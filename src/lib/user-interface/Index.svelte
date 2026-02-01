<script lang="ts">
    import Header from "./components/Header.svelte";
    import Hero from "./components/Hero.svelte";
    import Footer from "./components/Footer.svelte";
    import Contact from "./components/Contact.svelte";
    import Skills from "./components/Skills.svelte";
    import Experiences from "./components/Experiences.svelte";
</script>

<Header />
<main>
    <Hero />
    <Skills />
    <Experiences />
    <Contact />
</main>
<Footer />

<style>
    main {
        background-color: var(--tn-bg-night);
        overflow-x: hidden;
    }
</style>
