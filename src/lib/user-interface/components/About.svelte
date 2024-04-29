<script lang="ts">
    let showMore = false;

    function toggleShowMore(e: Event) {
        e.preventDefault();

        showMore = !showMore;
    }
</script>

<section id="about" class="resume__section about">
    <h2>Luiz Otavio Utzig Monteiro</h2>
    <div class="section__content">
        <span class="content_role">Experienced Full-stack Developer</span>
        <span class="content_location"
            >Novo Hamburgo, Rio Grande do Sul, Brazil</span
        >
        <p class="content_lore">
            Experienced Full Stack Developer with over 4 years of experience and
            a diversified skill set covering front-end, back-end, and mobile
            development.
            {#if showMore}
                My expertise includes building web and mobile applications using
                Svelte, React.js, Vue.js, PHP (Laravel, CodeIgniter), Golang,
                Flutter and automating processes with Python and ShellScript. A
                strong foundation in both SQL and NoSQL databases underscores my
                ability to optimize data performance. As a self-taught developer
                passionate about technology, I am committed to continuous
                learning and delivering high-quality work.
                <button on:click={toggleShowMore}>Read Less</button>
            {:else}
                <button on:click={toggleShowMore}>Read More</button>
            {/if}
        </p>
    </div>
</section>

<style>
    .resume__section {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h2 {
        font-size: 4rem;
        font-weight: bold;
        text-align: center;
        text-shadow: 0px 2px 2px var(--darker-color);
        color: var(--second-color);
    }
    .section__content {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    .content_role {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        border-radius: 0.5rem;
        color: var(--gray-color);
        background-color: var(--surface-color);
        box-shadow: 0px 1px 2px var(--darker-color);
        padding: 0.4rem 0.8rem;
    }
    .content_location {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }
    .content_lore {
        font-size: 1.5rem;
        text-align: justify;
    }
    button {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--second-color);
        background-color: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    button:hover {
        text-decoration: underline;
    }
</style>
