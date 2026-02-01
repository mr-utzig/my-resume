<script lang="ts">
    import { useLocation, useNavigate } from "svelte-navigator";
    import { Workspace } from "../../terminal/core/Workspace";
    import { download } from "../../../assets/js/utils";
    import Download from "../../icons/Download.svelte";
    import Terminal from "../../icons/Terminal.svelte";

    const location = useLocation();
    const navigate = useNavigate();

    const sections = ["About", "Skills", "Experience", "Contact"];
    let currentSection = $location.hash.length ? $location.hash.slice(1) : "";
    let isScrolled = false;
    let mobileMenuOpen = false;

    function handleScroll() {
        isScrolled = window.scrollY > 20;
    }

    function sectionFocus() {
        if (currentSection) {
            document.getElementById(currentSection)?.scrollIntoView();
        }
    }

    function downloadCV() {
        download(Workspace.files["resume.pdf"]);
    }

    function openShell() {
        navigate("/bin/bash");
    }

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<svelte:window on:load={sectionFocus} on:scroll={handleScroll} />
<header class:scrolled={isScrolled}>
    <h1>
        <span class="bracket">&lt;</span>mr<span class="dot">.</span>utzig<span class="bracket">&gt;</span>
    </h1>
    
    <button class="mobile-toggle" on:click={toggleMobileMenu} aria-label="Toggle menu">
        <span class="hamburger" class:open={mobileMenuOpen}></span>
    </button>

    <div class="header-content" class:mobile-open={mobileMenuOpen}>
        <nav>
            <ul>
                {#each sections as section, i}
                    {@const hash = section.toLowerCase()}
                    <li style="--delay: {i * 0.1}s">
                        <a
                            href={`#${hash}`}
                            class:active={currentSection === hash}
                            on:click={() => { currentSection = hash; mobileMenuOpen = false; }}
                        >
                            <span class="nav-indicator">//</span>
                            {section}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        <div class="actions">
            <button class="btn btn-primary download-cv" on:click={downloadCV}>
                <svelte:component this={Download} />
                <span>Download CV</span>
            </button>
            <button class="btn btn-glow open-shell" on:click={openShell}>
                <svelte:component this={Terminal} />
                <span>Open Shell</span>
            </button>
        </div>
    </div>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        min-height: 7rem;
        background: rgba(26, 27, 38, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid transparent;
        padding: 0.5rem 2rem;
        transition: all 0.3s ease;
    }
    
    header.scrolled {
        background: rgba(26, 27, 38, 0.95);
        border-bottom: 1px solid var(--glass-border);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    }

    h1 {
        font-size: 3.2rem;
        color: var(--tn-white);
        margin: 0;
        letter-spacing: -1px;
        transition: all 0.3s ease;
    }
    
    h1:hover {
        transform: scale(1.02);
    }
    
    h1 .bracket {
        color: var(--tn-teal);
        transition: color 0.3s ease;
    }
    
    h1 .dot {
        color: var(--tn-purple);
    }
    
    h1:hover .bracket {
        color: var(--matrix-green);
        text-shadow: 0 0 10px var(--matrix-green-glow);
    }

    .header-content {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .mobile-toggle {
        display: none;
        background: transparent;
        border: none;
        width: 4rem;
        height: 4rem;
        cursor: pointer;
        padding: 0;
    }
    
    .hamburger {
        display: block;
        position: relative;
        width: 2.4rem;
        height: 2px;
        background: var(--tn-white);
        transition: all 0.3s ease;
    }
    
    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: var(--tn-white);
        transition: all 0.3s ease;
    }
    
    .hamburger::before {
        top: -8px;
    }
    
    .hamburger::after {
        bottom: -8px;
    }
    
    .hamburger.open {
        background: transparent;
    }
    
    .hamburger.open::before {
        top: 0;
        transform: rotate(45deg);
        background: var(--matrix-green);
    }
    
    .hamburger.open::after {
        bottom: 0;
        transform: rotate(-45deg);
        background: var(--matrix-green);
    }

    nav ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;
        gap: 0.5rem;
    }
    
    nav li {
        padding: 0.5rem 1rem;
        animation: fadeInUp 0.5s ease forwards;
        animation-delay: var(--delay);
    }
    
    nav a {
        position: relative;
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--tn-foreground);
        text-decoration: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .nav-indicator {
        color: var(--tn-comment);
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    nav a:hover {
        color: var(--tn-white);
    }
    
    nav a:hover .nav-indicator {
        color: var(--matrix-green);
        text-shadow: 0 0 10px var(--matrix-green-glow);
    }
    
    nav a.active {
        color: var(--matrix-green);
    }
    
    nav a.active .nav-indicator {
        color: var(--matrix-green);
        text-shadow: 0 0 10px var(--matrix-green-glow);
    }
    
    nav a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--matrix-green), var(--tn-teal));
        transition: width 0.3s ease;
    }
    
    nav a:hover::after,
    nav a.active::after {
        width: 100%;
    }

    .actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        font-size: 1.3rem;
        font-weight: 600;
        border-radius: 0.8rem;
        padding: 0.8rem 1.6rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--tn-blue), var(--tn-purple));
        color: var(--tn-white);
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(122, 162, 247, 0.3);
    }
    
    .btn-glow {
        position: relative;
        background: transparent;
        color: var(--matrix-green);
        border: 1px solid var(--matrix-green);
        overflow: hidden;
    }
    
    .btn-glow::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .btn-glow:hover::before {
        left: 100%;
    }
    
    .btn-glow:hover {
        background: rgba(0, 255, 65, 0.1);
        box-shadow: 0 0 20px var(--matrix-green-glow), inset 0 0 20px rgba(0, 255, 65, 0.1);
        transform: translateY(-2px);
    }

    /* Mobile Styles */
    @media only screen and (max-width: 900px) {
        header {
            padding: 0.5rem 1.5rem;
        }
        
        .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .header-content {
            position: fixed;
            top: 7rem;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(26, 27, 38, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 2rem;
            transform: translateY(-150%);
            opacity: 0;
            transition: all 0.4s ease;
            border-bottom: 1px solid var(--glass-border);
        }
        
        .header-content.mobile-open {
            transform: translateY(0);
            opacity: 1;
        }
        
        nav ul {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .actions {
            flex-direction: column;
            width: 100%;
        }
        
        .btn {
            width: 100%;
            justify-content: center;
        }
    }

    @media only screen and (max-width: 600px) {
        h1 {
            font-size: 2.6rem;
        }
    }
</style>
