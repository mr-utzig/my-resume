<script lang="ts">
    import { onMount } from "svelte";
    import { areasSkills } from "../../../assets/js/shared";

    let visibleCards: Set<number> = new Set();
    let skillElements: HTMLElement[] = [];

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute("data-index") || "0");
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            visibleCards = new Set([...visibleCards, index]);
                        }, index * 150);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        skillElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    });

    const skillIcons: Record<string, string> = {
        // Front-end
        "HTML5": "🌐", "HTMX": "⚡", "Templ": "📄", "CSS": "🎨",
        "Tailwind": "💨", "SCSS": "💅", "JavaScript": "📜", "TypeScript": "💙",
        "jQuery": "💲", "React.js": "⚛️", "Svelte.js": "🔥", "Vue.js": "💚", "Flutter": "📱",
        // Back-end
        "PHP": "🐘", "Laravel": "🔴", "CodeIgniter": "🔶", "Node.js": "💚",
        "GoLang": "🐹", "Python": "🐍", "Java": "☕", "Spring Boot": "🍃",
        "Microservices": "🔗", "Kafka": "📨", "RabbitMQ": "🐰",
        // DevOps
        "Linux": "🐧", "Shell Script": "🖥️", "Amazon Web Services (AWS)": "☁️",
        "Google Cloud Provider (GCP)": "🌩️", "Azure": "🔵", "Docker": "🐳",
        "Docker Swarm": "🐝", "Kubernetes": "⎈",
        // Database
        "SQL": "📊", "MySQL": "🐬", "PostgreSQL": "🐘", "SQLite": "📦",
        "Turso": "🚀", "NoSQL": "📁", "MongoDB": "🍃", "Cassandra": "👁️",
        "SAP HANA": "💎",
        // SAP
        "SAP S/4HANA": "🏢", "CAP": "🧱", "SAPUI5": "🎯",
        // Soft skills
        "Creativity": "🎨", "Problem Solving": "🧩", "Critical Thinking": "🧠",
        "Adaptability": "🔄", "Resilience": "💪", "Collaboration": "🤝",
        // Hard skills
        "Full-stack Development": "⚙️", "Version Control": "📚",
        "Algorithms": "🔢", "Data Structures": "🏗️", "Software Architecture": "🏛️",
    };

    function getIcon(skill: string): string {
        return skillIcons[skill] || "⚡";
    }
</script>

<section id="skills" class="skills-section">
    <div class="section-header">
        <span class="section-tag">&lt;skills&gt;</span>
        <h2>Technical Arsenal</h2>
        <p class="section-subtitle">Technologies and tools I use to bring ideas to life</p>
    </div>

    <div class="skills-grid">
        {#each Object.keys(areasSkills) as area, areaIndex}
            <div
                class="skill-card"
                class:visible={visibleCards.has(areaIndex)}
                data-index={areaIndex}
                bind:this={skillElements[areaIndex]}
            >
                <div class="card-glow"></div>
                <div class="card-content">
                    <h3 class="area-title">
                        <span class="area-bracket">[</span>
                        {area}
                        <span class="area-bracket">]</span>
                    </h3>
                    <div class="skills-list">
                        {#each Object.keys(areasSkills[area]) as skill}
                            {@const level = areasSkills[area][skill]}
                            <div class="skill-item">
                                <div class="skill-header">
                                    <span class="skill-icon">{getIcon(skill)}</span>
                                    <span class="skill-name">{skill}</span>
                                    <span class="skill-level">{level * 10}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div 
                                        class="skill-progress" 
                                        style="--progress: {level * 10}%; --delay: {areaIndex * 0.15}s"
                                        class:animate={visibleCards.has(areaIndex)}
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <span class="section-tag closing">&lt;/skills&gt;</span>
</section>

<style>
    .skills-section {
        min-height: 100vh;
        padding: 8rem 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background: linear-gradient(180deg, var(--tn-bg-night) 0%, var(--tn-bg-storm) 50%, var(--tn-bg-night) 100%);
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
        background: linear-gradient(135deg, var(--tn-white), var(--tn-blue));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-subtitle {
        font-size: 1.6rem;
        color: var(--tn-foreground);
        margin-top: 1rem;
    }

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
        gap: 2.5rem;
        max-width: 140rem;
        width: 100%;
    }

    .skill-card {
        position: relative;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 1.5rem;
        padding: 2.5rem;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.5s ease;
        overflow: hidden;
    }

    .skill-card.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .skill-card:hover {
        border-color: var(--tn-blue);
        transform: translateY(-5px);
    }

    .card-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--matrix-green), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .skill-card:hover .card-glow {
        opacity: 1;
        animation: glowPulse 2s infinite;
    }

    @keyframes glowPulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    .card-content {
        position: relative;
        z-index: 1;
    }

    .area-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--tn-white);
        margin: 0 0 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .area-bracket {
        color: var(--tn-purple);
    }

    .skills-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-height: 35rem;
        overflow-y: auto;
        padding-right: 0.5rem;
    }

    .skill-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .skill-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .skill-icon {
        font-size: 1.6rem;
        filter: grayscale(0.3);
        transition: filter 0.3s ease;
    }

    .skill-item:hover .skill-icon {
        filter: grayscale(0);
    }

    .skill-name {
        font-size: 1.3rem;
        color: var(--tn-foreground);
        flex: 1;
    }

    .skill-level {
        font-size: 1.2rem;
        color: var(--tn-teal);
        font-weight: 600;
    }

    .skill-bar {
        height: 0.6rem;
        background: var(--tn-black);
        border-radius: 0.3rem;
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        width: 0;
        background: linear-gradient(90deg, var(--tn-blue), var(--tn-purple), var(--tn-teal));
        border-radius: 0.3rem;
        transition: width 1s ease;
        transition-delay: var(--delay);
    }

    .skill-progress.animate {
        width: var(--progress);
    }

    /* Responsive */
    @media only screen and (max-width: 768px) {
        .skills-section {
            padding: 6rem 1.5rem;
        }

        h2 {
            font-size: 3rem;
        }

        .skills-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .skill-card {
            padding: 2rem;
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
