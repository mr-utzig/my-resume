<script lang="ts">
    import { contacts, email } from "../../../assets/js/shared";
    import { onMount } from "svelte";

    let visibleLinks: Set<number> = new Set();
    let linkElements: HTMLElement[] = [];
    let copied = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reveal all links with stagger
                        contacts.forEach((_, i) => {
                            setTimeout(() => {
                                visibleLinks = new Set([...visibleLinks, i]);
                            }, i * 100);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById("contact");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    });

    function copyEmail() {
        navigator.clipboard.writeText(email);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    function getLinkColor(label: string): string {
        const colors: Record<string, string> = {
            "WhatsApp": "#25D366",
            "Telegram": "#0088cc",
            "LinkedIn": "#0077B5",
            "GitHub": "#6e5494",
            "Send an email": "#EA4335"
        };
        return colors[label] || "#7aa2f7";
    }
</script>

<section id="contact" class="contact-section">
    <div class="section-header">
        <span class="section-tag">&lt;contact&gt;</span>
        <h2>Let's Connect</h2>
        <p class="section-subtitle">Ready to work together? Reach out through any channel.</p>
    </div>

    <div class="contact-content">
        <div class="email-highlight">
            <span class="prompt">$</span>
            <span class="command">echo</span>
            <span class="email">"{email}"</span>
            <button class="copy-btn" on:click={copyEmail} title="Copy email">
                {#if copied}
                    <span class="copied">✓</span>
                {:else}
                    <span class="copy-icon">📋</span>
                {/if}
            </button>
        </div>

        <div class="contact-links">
            {#each contacts as contact, index}
                <a
                    href={contact.value}
                    target={contact.value.includes("mailto") ? "_self" : "_blank"}
                    rel="noreferrer noopener"
                    class="contact-link"
                    class:visible={visibleLinks.has(index)}
                    style="--link-color: {getLinkColor(contact.label)}; --delay: {index * 0.1}s"
                    bind:this={linkElements[index]}
                >
                    <div class="link-icon">
                        <img
                            src={contact.icon}
                            alt={`${contact.label} icon`}
                            width="28"
                            height="28"
                        />
                    </div>
                    <div class="link-info">
                        <span class="link-label">{contact.label}</span>
                        <span class="link-hint">
                            {#if contact.label === "WhatsApp"}
                                +55 51 99632-6706
                            {:else if contact.label === "Telegram"}
                                @mr_utzig
                            {:else if contact.label === "LinkedIn"}
                                /in/mr-utzig
                            {:else if contact.label === "GitHub"}
                                @mr-utzig
                            {:else}
                                {email}
                            {/if}
                        </span>
                    </div>
                    <span class="link-arrow">→</span>
                </a>
            {/each}
        </div>

        <div class="availability">
            <span class="status-dot"></span>
            <span class="status-text">Available for new opportunities</span>
        </div>
    </div>

    <span class="section-tag closing">&lt;/contact&gt;</span>
</section>

<style>
    .contact-section {
        min-height: 100vh;
        padding: 8rem 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background: linear-gradient(180deg, var(--tn-bg-night) 0%, var(--tn-bg-storm) 100%);
    }

    .section-header {
        text-align: center;
        margin-bottom: 5rem;
    }

    .section-tag {
        font-size: 1.4rem;
        color: var(--tn-comment);
        display: block;
        margin-bottom: 1rem;
    }

    .section-tag.closing {
        margin-top: 4rem;
    }

    h2 {
        font-size: 4rem;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, var(--tn-white), var(--tn-teal));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-subtitle {
        font-size: 1.6rem;
        color: var(--tn-foreground);
        margin-top: 1rem;
    }

    .contact-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        max-width: 60rem;
        width: 100%;
    }

    .email-highlight {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem 2.5rem;
        background: var(--tn-bg-night);
        border: 1px solid var(--glass-border);
        border-radius: 1rem;
        font-size: 1.6rem;
    }

    .prompt {
        color: var(--matrix-green);
    }

    .command {
        color: var(--tn-blue);
    }

    .email {
        color: var(--tn-green);
    }

    .copy-btn {
        background: transparent;
        border: 1px solid var(--tn-comment);
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.4rem;
    }

    .copy-btn:hover {
        border-color: var(--matrix-green);
        background: rgba(0, 255, 65, 0.1);
    }

    .copied {
        color: var(--matrix-green);
    }

    .contact-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
        gap: 1.5rem;
        width: 100%;
    }

    .contact-link {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.8rem 2rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 1.2rem;
        text-decoration: none;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }

    .contact-link.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .contact-link:hover {
        border-color: var(--link-color);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px color-mix(in srgb, var(--link-color) 20%, transparent);
    }

    .link-icon {
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--tn-black);
        border-radius: 1rem;
        transition: all 0.3s ease;
    }

    .contact-link:hover .link-icon {
        background: color-mix(in srgb, var(--link-color) 15%, transparent);
    }

    .link-icon img {
        filter: brightness(0) invert(1);
        opacity: 0.9;
        transition: all 0.3s ease;
    }

    .contact-link:hover .link-icon img {
        opacity: 1;
        transform: scale(1.1);
    }

    .link-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .link-label {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--tn-white);
    }

    .link-hint {
        font-size: 1.2rem;
        color: var(--tn-comment);
    }

    .link-arrow {
        font-size: 1.8rem;
        color: var(--tn-comment);
        transition: all 0.3s ease;
    }

    .contact-link:hover .link-arrow {
        color: var(--link-color);
        transform: translateX(5px);
    }

    .availability {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 2rem;
        background: rgba(0, 255, 65, 0.05);
        border: 1px solid rgba(0, 255, 65, 0.2);
        border-radius: 3rem;
    }

    .status-dot {
        width: 1rem;
        height: 1rem;
        background: var(--matrix-green);
        border-radius: 50%;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 var(--matrix-green-glow);
        }
        50% {
            box-shadow: 0 0 0 10px transparent;
        }
    }

    .status-text {
        font-size: 1.4rem;
        color: var(--matrix-green);
    }

    /* Responsive */
    @media only screen and (max-width: 768px) {
        .contact-section {
            padding: 6rem 1.5rem;
        }

        h2 {
            font-size: 3rem;
        }

        .email-highlight {
            flex-wrap: wrap;
            justify-content: center;
            font-size: 1.4rem;
            padding: 1.5rem;
        }

        .contact-links {
            grid-template-columns: 1fr;
        }
    }

    @media only screen and (max-width: 480px) {
        h2 {
            font-size: 2.5rem;
        }

        .section-subtitle {
            font-size: 1.4rem;
        }
    }
</style>
