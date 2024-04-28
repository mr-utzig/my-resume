<script lang="ts">
    const date = new Date();
</script>

<footer>
    <span>Made with ❤️ by Mr. Utzig.</span>
    &nbsp;
    <span>
        &#169;{date.getFullYear()}
        <a
            href="https://lutzig.com"
            target="_blank"
            rel="author noreferrer noopener">Lutzig</a
        >.
    </span>
    &nbsp;All rights reserved.
</footer>

<style>
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 1.6rem;
        color: var(--gray-color);
        background-color: var(--surface-color);
        padding: 1rem;
    }
    a {
        color: var(--gray-color);
    }
</style>
