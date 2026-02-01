<script lang="ts">
    const year = new Date().getFullYear();
</script>

<footer>
    <div class="footer-content">
        <div class="brand">
            <span class="code-comment">// Built with passion</span>
            <span class="copyright">
                &#169; {year} 
                <a
                    href="https://lutzig.com"
                    target="_blank"
                    rel="author noreferrer noopener"
                >
                    <span class="bracket">&lt;</span>Lutzig<span class="bracket">/&gt;</span>
                </a>
            </span>
        </div>
        <div class="tech-stack">
            <span class="made-with">Crafted with</span>
            <span class="tech">Svelte</span>
            <span class="separator">+</span>
            <span class="tech">TypeScript</span>
            <span class="separator">+</span>
            <span class="heart">❤️</span>
        </div>
    </div>
</footer>

<style>
    footer {
        background: var(--tn-bg-night);
        border-top: 1px solid var(--glass-border);
        padding: 2rem 3rem;
    }

    .footer-content {
        max-width: 120rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .brand {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .code-comment {
        font-size: 1.2rem;
        color: var(--tn-comment);
    }

    .copyright {
        font-size: 1.4rem;
        color: var(--tn-foreground);
    }

    .copyright a {
        color: var(--tn-teal);
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .copyright a:hover {
        color: var(--matrix-green);
        text-shadow: 0 0 10px var(--matrix-green-glow);
    }

    .bracket {
        color: var(--tn-purple);
    }

    .tech-stack {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.3rem;
    }

    .made-with {
        color: var(--tn-comment);
    }

    .tech {
        color: var(--tn-blue);
        padding: 0.3rem 0.8rem;
        background: var(--tn-black);
        border-radius: 0.4rem;
    }

    .separator {
        color: var(--tn-comment);
    }

    .heart {
        font-size: 1.5rem;
        animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    @media only screen and (max-width: 600px) {
        .footer-content {
            flex-direction: column;
            text-align: center;
        }

        .brand {
            align-items: center;
        }
    }
</style>
