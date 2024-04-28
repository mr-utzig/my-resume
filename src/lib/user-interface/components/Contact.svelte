<script>
    import { contacts, email } from "../../../assets/js/shared";
    import Send from "../../icons/Send.svelte";
</script>

<section id="contact" class="resume__section contact">
    <div class="section__title">
        <h2>Contact</h2>
        <span>Want to work together? Send me a message.</span>
    </div>
    <div class="section__content">
        <div class="content__contact-links">
            {#each contacts as ctt}
                {#if !ctt.value.includes("mailto")}
                    <a
                        href={ctt.value}
                        target="_blank"
                        rel="noreferrer noopener"
                        class="link"
                    >
                        <img
                            src={ctt.icon}
                            alt={ctt.label}
                            width="25"
                            height="25"
                        />
                        <span>{ctt.label}</span>
                    </a>
                {/if}
            {/each}
        </div>
        <div class="content__contact-form">
            <form
                action="mailto:{email}"
                method="post"
                enctype="text/plain"
                class="form"
            >
                <div>
                    <label for="name">Name</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div>
                    <label for="message">Message</label>
                    <textarea id="message" autocomplete="false" required
                    ></textarea>
                </div>
                <button type="submit">
                    Send
                    <svelte:component this={Send} />
                </button>
            </form>
        </div>
    </div>
</section>

<style>
    .resume__section {
        flex-direction: column;
        gap: 2rem;
    }
    .section__title h2 {
        font-size: 3rem;
        font-weight: bold;
        text-shadow: 0px 1px 3px var(--darker-color);
        color: var(--light-gray-color);
        margin: 0;
    }
    .section__title span {
        font-size: 1.75rem;
        color: var(--gray-color);
    }
    .section__content {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 2rem;
    }
    .content__contact-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .link {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        text-decoration: none;
        color: var(--light-color);
        border: 1px solid var(--light-color);
        border-radius: 0.4rem;
        padding: 0.4rem;
        transition: all 250ms ease-in-out;
    }
    .link:hover {
        background-color: var(--surface-color);
    }
    .content__contact-form {
        flex: 1;
        max-width: 60rem;
    }
    .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 1rem 2rem;
    }
    .form > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .form label {
        font-size: 1.6rem;
    }
    .form input,
    .form textarea {
        flex: 1;
        height: 1rem;
        border: none;
        border-radius: 0.4rem;
        padding: 0.8rem 1.2rem;
    }
    .form textarea {
        min-height: 7.5rem;
        resize: none;
    }
    .form button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--light-color);
        background-color: var(--second-color);
        border: none;
        border-radius: 0.4rem;
        padding: 0.8rem 1.2rem;
    }
    .form button:hover {
        opacity: 0.8;
        cursor: pointer;
    }
</style>
