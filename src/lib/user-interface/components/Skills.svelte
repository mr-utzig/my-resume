<script>
    import { areasSkills } from "../../../assets/js/shared";
</script>

<section id="skills" class="resume__section skills">
    <h2>Skills</h2>
    <div class="section__content">
        {#each Object.keys(areasSkills) as area}
            <div class="card">
                <h3>{area}</h3>
                <ul>
                    {#each Object.keys(areasSkills[area]) as skill}
                        <li>
                            <span>{skill}</span><br />
                            <progress
                                max="10"
                                value={areasSkills[area][skill]}
                            />
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</section>

<style>
    .resume__section {
        flex-direction: column;
        max-width: 950px;
        margin-inline: auto;
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
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2.5rem;
    }
    .card {
        min-width: 28.5rem;
        border: 1px solid var(--light-gray-color);
        border-radius: 0.8rem;
        padding: 1rem 1.5rem;
        box-shadow: 0px 2px 3px var(--darker-color);
        flex: 1;
    }
    h3 {
        font-size: 1.6rem;
        margin: 0;
        margin-bottom: 0.5rem;
    }
    ul {
        max-width: 32rem;
        max-height: 20rem;
        overflow: auto;
        list-style-type: none;
        padding: 1rem;
        margin: 0;
    }
    span {
        font-size: 1.4rem;
    }
    progress {
        appearance: none;
        width: 100%;
        min-width: 20rem;
        height: 1rem;
    }
    ::-webkit-progress-bar {
        background-color: var(--surface-color);
        border-radius: 1rem;
    }
    ::-webkit-progress-value {
        background-color: var(--second-color);
        border-radius: 1rem;
    }
</style>
