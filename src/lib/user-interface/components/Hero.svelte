<script lang="ts">
    import { onMount } from "svelte";
    import { getYearsOfExperience } from "../../../assets/js/utils";

    let canvas: HTMLCanvasElement;
    let mounted = false;
    let typedText = "";
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    const phrases = [
        "Full-stack Developer",
        "Problem Solver",
        "Code Architect",
        "Tech Enthusiast"
    ];

    const codeSnippets = [
        "const build = () => success;",
        "async function innovate() {}",
        "export default excellence;",
        "<Component />",
        "git commit -m 'magic'",
        "npm run awesome",
        "while(true) { learn(); }",
        "interface Future { bright: true }",
    ];

    onMount(() => {
        mounted = true;
        initMatrixRain();
        typeWriter();
    });

    function initMatrixRain() {
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        function draw() {
            if (!ctx) return;
            ctx.fillStyle = "rgba(26, 27, 38, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff4120";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const interval = setInterval(draw, 50);

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        return () => clearInterval(interval);
    }

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        const speed = isDeleting ? 50 : 100;
        
        if (!isDeleting) {
            typedText = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        } else {
            typedText = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
        }
        
        setTimeout(typeWriter, speed);
    }
</script>

<section id="about" class="hero">
    <canvas bind:this={canvas} class="matrix-bg"></canvas>
    
    <div class="floating-code">
        {#each codeSnippets as snippet, i}
            <span 
                class="code-snippet" 
                style="
                    --delay: {i * 0.5}s;
                    --x: {10 + (i * 12) % 80}%;
                    --y: {10 + (i * 15) % 70}%;
                "
            >
                {snippet}
            </span>
        {/each}
    </div>

    <div class="hero-content">
        <div class="greeting">
            <span class="line-number">01</span>
            <span class="comment">// Hello, World! I'm</span>
        </div>
        
        <h1 class="name">
            <span class="first-name">Luiz Otavio</span>
            <span class="last-name">Utzig Monteiro</span>
        </h1>
        
        <div class="role-wrapper">
            <span class="const-keyword">const</span>
            <span class="variable">role</span>
            <span class="operator">=</span>
            <span class="string">"{typedText}"</span>
            <span class="cursor">|</span>
        </div>
        
        <p class="description">
            <span class="bracket">{"{"}</span>
            <br />
            <span class="indent">
                <span class="key">experience:</span>
                <span class="value">"{getYearsOfExperience()}+ years"</span>,
            </span>
            <br />
            <span class="indent">
                <span class="key">location:</span>
                <span class="value">"Novo Hamburgo, RS, Brazil"</span>,
            </span>
            <br />
            <span class="indent">
                <span class="key">passion:</span>
                <span class="value">"Building amazing digital experiences"</span>
            </span>
            <br />
            <span class="bracket">{"}"}</span>
        </p>
        
        <div class="cta-buttons">
            <a href="#contact" class="btn-primary">
                <span class="btn-text">Get in Touch</span>
                <span class="btn-icon">→</span>
            </a>
            <a href="#experience" class="btn-secondary">
                <span class="btn-text">View Experience</span>
            </a>
        </div>
        
        <div class="scroll-indicator">
            <span>scroll down</span>
            <div class="mouse">
                <div class="wheel"></div>
            </div>
        </div>
    </div>
    
    <div class="hero-visual">
        <div class="terminal-preview">
            <div class="terminal-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="terminal-title">~/mr-utzig</span>
            </div>
            <div class="terminal-body">
                <p><span class="prompt">$</span> whoami</p>
                <p class="output">full-stack-developer</p>
                <p><span class="prompt">$</span> cat skills.txt</p>
                <p class="output">Svelte, React, Vue, PHP, Go, Node.js...</p>
                <p><span class="prompt">$</span> ./start-collaboration.sh</p>
                <p class="output success">✓ Ready to build something amazing!</p>
                <p><span class="prompt">$</span> <span class="cursor-block">_</span></p>
            </div>
        </div>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10rem 5rem 5rem;
        overflow: hidden;
        gap: 4rem;
    }
    
    .matrix-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        opacity: 0.3;
    }
    
    .floating-code {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        overflow: hidden;
    }
    
    .code-snippet {
        position: absolute;
        left: var(--x);
        top: var(--y);
        font-size: 1.2rem;
        color: var(--tn-comment);
        opacity: 0;
        animation: floatCode 20s infinite ease-in-out;
        animation-delay: var(--delay);
    }
    
    @keyframes floatCode {
        0%, 100% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        10%, 90% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.5;
            transform: translateY(-30px) rotate(3deg);
        }
    }
    
    .hero-content {
        position: relative;
        z-index: 2;
        max-width: 60rem;
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .greeting {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .line-number {
        font-size: 1.4rem;
        color: var(--tn-comment);
    }
    
    .comment {
        font-size: 1.6rem;
        color: var(--tn-comment);
    }
    
    .name {
        font-size: 6rem;
        font-weight: 700;
        line-height: 1.1;
        margin: 0 0 2rem;
    }
    
    .first-name {
        display: block;
        color: var(--tn-white);
    }
    
    .last-name {
        display: block;
        background: linear-gradient(135deg, var(--tn-blue), var(--tn-purple), var(--tn-teal));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .role-wrapper {
        font-size: 2rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
    }
    
    .const-keyword {
        color: var(--tn-purple);
    }
    
    .variable {
        color: var(--tn-blue-light);
    }
    
    .operator {
        color: var(--tn-foreground);
    }
    
    .string {
        color: var(--tn-green);
    }
    
    .cursor {
        color: var(--matrix-green);
        animation: blink 1s infinite;
    }
    
    .description {
        font-size: 1.5rem;
        line-height: 2;
        margin-bottom: 3rem;
        padding: 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 1rem;
        backdrop-filter: blur(10px);
    }
    
    .bracket {
        color: var(--tn-yellow);
    }
    
    .indent {
        padding-left: 2rem;
        display: inline-block;
    }
    
    .key {
        color: var(--tn-blue-light);
    }
    
    .value {
        color: var(--tn-green);
    }
    
    .cta-buttons {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 4rem;
        flex-wrap: wrap;
    }
    
    .btn-primary, .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        padding: 1.4rem 2.8rem;
        font-size: 1.5rem;
        font-weight: 600;
        border-radius: 1rem;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--tn-blue), var(--tn-purple));
        color: var(--tn-white);
    }
    
    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(122, 162, 247, 0.4);
    }
    
    .btn-primary .btn-icon {
        transition: transform 0.3s ease;
    }
    
    .btn-primary:hover .btn-icon {
        transform: translateX(5px);
    }
    
    .btn-secondary {
        background: transparent;
        color: var(--tn-teal);
        border: 2px solid var(--tn-teal);
    }
    
    .btn-secondary:hover {
        background: rgba(115, 218, 202, 0.1);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(115, 218, 202, 0.2);
    }
    
    .scroll-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: var(--tn-comment);
        font-size: 1.2rem;
        animation: float 2s ease-in-out infinite;
    }
    
    .mouse {
        width: 2.4rem;
        height: 4rem;
        border: 2px solid var(--tn-comment);
        border-radius: 1.2rem;
        display: flex;
        justify-content: center;
        padding-top: 0.8rem;
    }
    
    .wheel {
        width: 0.4rem;
        height: 0.8rem;
        background: var(--matrix-green);
        border-radius: 0.2rem;
        animation: scrollWheel 1.5s infinite;
    }
    
    @keyframes scrollWheel {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(1rem);
        }
    }
    
    .hero-visual {
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        animation: fadeInUp 0.8s ease 0.3s forwards;
        opacity: 0;
    }
    
    .terminal-preview {
        width: 40rem;
        background: var(--tn-bg-storm);
        border-radius: 1.2rem;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        border: 1px solid var(--glass-border);
    }
    
    .terminal-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 1.2rem 1.5rem;
        background: var(--tn-black);
        border-bottom: 1px solid var(--glass-border);
    }
    
    .dot {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
    }
    
    .dot.red { background: var(--tn-red); }
    .dot.yellow { background: var(--tn-yellow); }
    .dot.green { background: var(--tn-green); }
    
    .terminal-title {
        margin-left: auto;
        font-size: 1.2rem;
        color: var(--tn-comment);
    }
    
    .terminal-body {
        padding: 1.5rem;
        font-size: 1.3rem;
    }
    
    .terminal-body p {
        margin: 0.5rem 0;
    }
    
    .prompt {
        color: var(--matrix-green);
        margin-right: 0.8rem;
    }
    
    .output {
        color: var(--tn-foreground);
        padding-left: 1.6rem;
    }
    
    .output.success {
        color: var(--matrix-green);
    }
    
    .cursor-block {
        display: inline-block;
        background: var(--matrix-green);
        color: var(--matrix-green);
        animation: blink 1s infinite;
    }

    /* Responsive Design */
    @media only screen and (max-width: 1200px) {
        .hero {
            flex-direction: column;
            text-align: center;
            padding: 12rem 3rem 5rem;
        }
        
        .hero-content {
            max-width: 100%;
        }
        
        .greeting, .role-wrapper {
            justify-content: center;
        }
        
        .cta-buttons {
            justify-content: center;
        }
        
        .hero-visual {
            width: 100%;
            max-width: 50rem;
        }
        
        .terminal-preview {
            width: 100%;
        }
    }
    
    @media only screen and (max-width: 768px) {
        .hero {
            padding: 10rem 2rem 4rem;
        }
        
        .name {
            font-size: 4rem;
        }
        
        .role-wrapper {
            font-size: 1.6rem;
        }
        
        .description {
            font-size: 1.3rem;
        }
        
        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 30rem;
            justify-content: center;
        }
    }
    
    @media only screen and (max-width: 480px) {
        .name {
            font-size: 3rem;
        }
        
        .floating-code {
            display: none;
        }
    }
</style>
