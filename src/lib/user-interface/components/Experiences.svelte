<script lang="ts">
    import { onMount } from "svelte";

    interface ExperienceSummary {
        role: string;
        company: string;
        period: string;
        location: string;
        summary: string;
        highlights: string[];
    }

    const experiences: ExperienceSummary[] = [
        {
            role: "Developer",
            company: "SAP",
            period: "Oct 2025 - Present",
            location: "Remote",
            summary: "Building enterprise solutions with SAP technologies and microservices architecture.",
            highlights: [
                "Developing microservices with Java and Spring Boot",
                "Working with SAP HANA and S/4HANA ecosystems",
                "Building applications using CAP and SAPUI5",
            ]
        },
        {
            role: "Full-stack Developer Intermediate",
            company: "Delta Global",
            period: "Sep 2023 - Jun 2025",
            location: "Porto Alegre, RS, Brazil",
            summary: "Building scalable software solutions with full-stack expertise.",
            highlights: [
                "Optimized queries and DSA to reduce response times by 70%",
                "Refactored legacy code for better scalability",
                "Led architectural discussions and best practices",
            ]
        },
        {
            role: "Full-stack Developer Intermediate",
            company: "Messem Investimentos",
            period: "Jan 2023 - Aug 2023",
            location: "Porto Alegre, RS, Brazil",
            summary: "Delivered high-impact features for financial platforms.",
            highlights: [
                "Delivered features within tight deadlines",
                "Implemented performance enhancements",
            ]
        },
        {
            role: "Full-stack Developer",
            company: "Brudam - Software TMS",
            period: "Jun 2020 - Dec 2022",
            location: "Eldorado do Sul, RS, Brazil",
            summary: "Developed transport management solutions with optimized algorithms.",
            highlights: [
                "Optimized software performance and scalability",
                "Exceeded client expectations on deliveries",
            ]
        }
    ];

    let visibleCards: Set<number> = new Set();
    let cardElements: HTMLElement[] = [];

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute("data-index") || "0");
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            visibleCards = new Set([...visibleCards, index]);
                        }, index * 200);
                    }
                });
            },
            { threshold: 0.2 }
        );

        cardElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    });
</script>

<section id="experience" class="experience-section">
    <div class="section-header">
        <span class="section-tag">&lt;experience&gt;</span>
        <h2>Work Journey</h2>
        <p class="section-subtitle">Where I've contributed and grown as a developer</p>
    </div>

    <div class="timeline">
        <div class="timeline-line"></div>
        
        {#each experiences as exp, index}
            <div
                class="timeline-item"
                class:visible={visibleCards.has(index)}
                class:left={index % 2 === 0}
                class:right={index % 2 !== 0}
                data-index={index}
                bind:this={cardElements[index]}
            >
                <div class="timeline-dot">
                    <span class="dot-inner"></span>
                </div>
                
                <div class="experience-card">
                    <div class="card-header">
                        <span class="period">{exp.period}</span>
                        <span class="location">📍 {exp.location}</span>
                    </div>
                    
                    <h3 class="role">{exp.role}</h3>
                    <h4 class="company">@ {exp.company}</h4>
                    
                    <p class="summary">{exp.summary}</p>
                    
                    <ul class="highlights">
                        {#each exp.highlights as highlight}
                            <li>
                                <span class="highlight-icon">▹</span>
                                {highlight}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        {/each}
    </div>

    <span class="section-tag closing">&lt;/experience&gt;</span>
</section>

<style>
    .experience-section {
        min-height: 100vh;
        padding: 8rem 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
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
        background: linear-gradient(135deg, var(--tn-white), var(--tn-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-subtitle {
        font-size: 1.6rem;
        color: var(--tn-foreground);
        margin-top: 1rem;
    }

    .timeline {
        position: relative;
        max-width: 100rem;
        width: 100%;
    }

    .timeline-line {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(
            180deg,
            transparent,
            var(--tn-blue) 10%,
            var(--tn-purple) 50%,
            var(--tn-teal) 90%,
            transparent
        );
        transform: translateX(-50%);
    }

    .timeline-item {
        position: relative;
        width: 50%;
        padding: 2rem;
        opacity: 0;
        transition: all 0.6s ease;
    }

    .timeline-item.left {
        left: 0;
        padding-right: 5rem;
        transform: translateX(-30px);
    }

    .timeline-item.right {
        left: 50%;
        padding-left: 5rem;
        transform: translateX(30px);
    }

    .timeline-item.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .timeline-dot {
        position: absolute;
        top: 3rem;
        width: 2rem;
        height: 2rem;
        background: var(--tn-bg-night);
        border: 2px solid var(--tn-blue);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        transition: all 0.3s ease;
    }

    .timeline-item.left .timeline-dot {
        right: -1rem;
    }

    .timeline-item.right .timeline-dot {
        left: -1rem;
    }

    .timeline-item.visible .timeline-dot {
        border-color: var(--matrix-green);
        box-shadow: 0 0 20px var(--matrix-green-glow);
    }

    .dot-inner {
        width: 0.8rem;
        height: 0.8rem;
        background: var(--tn-blue);
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .timeline-item.visible .dot-inner {
        background: var(--matrix-green);
    }

    .experience-card {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 1.5rem;
        padding: 2.5rem;
        transition: all 0.3s ease;
    }

    .experience-card:hover {
        border-color: var(--tn-purple);
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .period {
        font-size: 1.3rem;
        color: var(--tn-teal);
        font-weight: 600;
        padding: 0.4rem 1rem;
        background: rgba(115, 218, 202, 0.1);
        border-radius: 2rem;
    }

    .location {
        font-size: 1.2rem;
        color: var(--tn-comment);
    }

    .role {
        font-size: 2rem;
        font-weight: 700;
        color: var(--tn-white);
        margin: 0 0 0.5rem;
    }

    .company {
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--tn-blue);
        margin: 0 0 1.5rem;
    }

    .summary {
        font-size: 1.4rem;
        color: var(--tn-foreground);
        line-height: 1.6;
        margin: 0 0 1.5rem;
    }

    .highlights {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .highlights li {
        font-size: 1.3rem;
        color: var(--tn-text);
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
    }

    .highlight-icon {
        color: var(--matrix-green);
        flex-shrink: 0;
    }

    /* Responsive */
    @media only screen and (max-width: 900px) {
        .timeline-line {
            left: 2rem;
        }

        .timeline-item {
            width: 100%;
            padding: 2rem 2rem 2rem 5rem;
        }

        .timeline-item.left,
        .timeline-item.right {
            left: 0;
            padding-left: 5rem;
            padding-right: 0;
            transform: translateX(30px);
        }

        .timeline-item.left .timeline-dot,
        .timeline-item.right .timeline-dot {
            left: 1rem;
            right: auto;
        }
    }

    @media only screen and (max-width: 600px) {
        .experience-section {
            padding: 6rem 1.5rem;
        }

        h2 {
            font-size: 3rem;
        }

        .card-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .role {
            font-size: 1.8rem;
        }

        .company {
            font-size: 1.4rem;
        }
    }
</style>
