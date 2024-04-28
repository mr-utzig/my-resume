<script>
    import { experiences } from "../../../assets/js/shared";
</script>

<section id="experience" class="resume__section experience">
    <h2>Experiences</h2>
    <div class="section__content">
        {#each experiences as experience}
            <div class="card">
                <h3>{experience.role}</h3>
                <h4>{experience.company}</h4>
                <span>{experience.duration}</span><br/>
                <span>{experience.location}</span>
                <div class="description">
                    {@html experience.description}
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .resume__section {
        flex-direction: column;
    }
    h2 {
        font-size: 3rem;
        font-weight: bold;
        text-shadow: 0px 1px 3px var(--darker-color);
        color: var(--light-gray-color);
        margin: 0;
    }
    .section__content {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .card {
        max-width: 42rem;
        border: 1px solid var(--light-gray-color);
        border-radius: 0.8rem;
        padding: 1rem 1.5rem;
        box-shadow: 0px 2px 3px var(--darker-color);
    }
    h3 {
        font-size: 1.6rem;
        margin: 0;
        margin-bottom: 0.5rem;
    }
    h4 {
        font-size: 1.5rem;
        margin: 0;
        margin-bottom: 0.5rem;
    }
    span {
        font-size: 1.4rem;
    }
    :global(#experience .description) {
        font-size: 1.4rem;
        max-height: 30rem;
        overflow: auto;
        margin-top: 1rem;
    }
    :global(#experience ul) {
        margin: 0;
        padding: 1rem 1rem 1rem 2rem;
    }
</style>
