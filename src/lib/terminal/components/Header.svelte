<script lang="ts">
    const banner = `
 ███╗   ███╗██████╗       ██╗   ██╗████████╗███████╗██╗ ██████╗ 
 ████╗ ████║██╔══██╗      ██║   ██║╚══██╔══╝╚══███╔╝██║██╔════╝ 
 ██╔████╔██║██████╔╝█████╗██║   ██║   ██║     ███╔╝ ██║██║  ███╗
 ██║╚██╔╝██║██╔══██╗╚════╝██║   ██║   ██║    ███╔╝  ██║██║   ██║
 ██║ ╚═╝ ██║██║  ██║      ╚██████╔╝   ██║   ███████╗██║╚██████╔╝
 ╚═╝     ╚═╝╚═╝  ╚═╝       ╚═════╝    ╚═╝   ╚══════╝╚═╝ ╚═════╝ `;
</script>

<div class="header">
    <pre class="header__banner">{banner}</pre>
    <div class="header__info">
        <p class="tagline">⚡ Full-stack Developer | Problem Solver | Code Architect</p>
        <p class="version">v2.0.0 — Tokyo Night Edition</p>
    </div>
    <div class="header__helper">
        <p>Welcome to my interactive terminal portfolio!</p>
        <p>
            <span class="cmd">help</span> — List all commands
            <span class="separator">|</span>
            <span class="cmd">neofetch</span> — System info
            <span class="separator">|</span>
            <span class="cmd">goto --ui</span> — GUI mode
        </p>
        <p class="hint">💡 Try: <span class="cmd">matrix</span>, <span class="cmd">cowsay hello</span>, <span class="cmd">fortune</span>, <span class="cmd">hack</span></p>
    </div>
</div>

<style>
    .header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px dashed var(--tn-comment);
    }
    
    .header__banner {
        font-size: 0.85rem;
        line-height: 1.1;
        margin: 0;
        background: linear-gradient(180deg, var(--matrix-green), var(--tn-teal));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: none;
    }
    
    .header__info {
        margin: 1rem 0;
    }
    
    .tagline {
        font-size: 1.4rem;
        color: var(--tn-foreground);
        margin: 0;
    }
    
    .version {
        font-size: 1.2rem;
        color: var(--tn-comment);
        margin: 0.5rem 0 0;
    }
    
    .header__helper {
        font-size: 1.3rem;
        color: var(--tn-text);
    }
    
    .header__helper p {
        margin: 0.5rem 0;
    }
    
    .cmd {
        color: var(--tn-green);
        background: var(--tn-black);
        padding: 0.2rem 0.5rem;
        border-radius: 0.3rem;
        font-weight: 600;
    }
    
    .separator {
        color: var(--tn-comment);
        margin: 0 0.5rem;
    }
    
    .hint {
        color: var(--tn-yellow);
        font-style: italic;
    }
    
    @media only screen and (max-width: 768px) {
        .header__banner {
            font-size: 0.5rem;
        }
        
        .tagline {
            font-size: 1.2rem;
        }
        
        .header__helper {
            font-size: 1.2rem;
        }
        
        .separator {
            display: none;
        }
        
        .header__helper p {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
    }
</style>
