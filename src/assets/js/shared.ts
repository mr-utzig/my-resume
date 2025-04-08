import { calculateDates, getYearsOfExperience } from "./utils";

import WhatsAppIcon from "../imgs/icons/whatsapp.svg";
import TelegramIcon from "../imgs/icons/telegram.svg";
import EmailIcon from "../imgs/icons/email.svg";
import LinkedInIcon from "../imgs/icons/linkedin.svg";
import GitHubIcon from "../imgs/icons/github.svg";

export const email = "lutzig.web.solutions@gmail.com";

export const resume = {
    sections: {
        all: function () {
            return this.about() + this.skills() + this.experiences() + this.contact();
        },
        about() {
            return `<h2>Luiz Otavio Utzig Monteiro</h2><div class="resume__section about">
                    <div>
                        <span>✸ Experienced Full Stack Developer</span>
                    </div>
                    <div>
                        <span>⦿ Novo Hamburgo, Rio Grande do Sul, Brazil</span>
                    </div>
                    <p>
                        Experienced Full Stack Developer with over ${getYearsOfExperience()} years of experience and a diversified skill set covering front-end, back-end, and mobile development.
                        Skilled in leveraging advanced algorithms and data structures to optimise performance and scalability.
                        A proactive contributor to architectural discussions, implementing best practices and emerging technologies to enhance the development process.
                        Committed to delivering high quality applications that meet client expectations and drive operational efficiency.
                        As a self-taught developer passionate about technology, I am committed to continuous learning and delivering high quality work.
                    </p>
                </div>`;
        },
        skills() {
            let section = "<h2>Skills</h2><div class='resume__section skills'>";
            for (const area in areasSkills) {
                const skills = areasSkills[area];

                section += `<div class="knowledge-area__wrapper">
                        <h4>${area}</h4>
                        <div class="knowledge-area__skills-list">
                            <ul>`;
                for (const skill in skills) {
                    const knowledge = skills[skill];

                    section += `<li><b>${skill}</b><br/>${generateASCIIProgressBar(knowledge)}</li>`;
                }
                section += `</ul></div></div>`;
            }
            section += "</div>";

            return section;
        },
        experiences() {
            let section = "<h2>Experiences</h2><div class='resume__section experiences'>";
            experiences.forEach(e => {
                section += `<div class="experience__wrapper">
                        <div class="experience__info">
                            <h4>${e.role}</h4>
                            <span class="info__company">${e.company}</span><br/>
                            <span class="info__duration">${e.duration}</span><br/>
                            <span class="info__location">${e.location}</span>
                        </div>
                        <div class="experience__description">${e.description}</div>
                    </div>`;
            });
            section += "</div>";

            return section;
        },
        contact() {
            let section = "<h2>Contact</h2><div class='resume__section contact'>";
            contacts.forEach(c => {
                section += `<div class="contact__wrapper">${c.render()}</div>`;
            });
            section += "</div>";

            return section;
        }
    }
}

function generateASCIIProgressBar(percentage: number): string {
    const barLength = 20;
    const completedLength = Math.floor(barLength * ((percentage * 10) / 100));
    const remainingLength = barLength - completedLength;

    return `[${'#'.repeat(completedLength)}${'-'.repeat(remainingLength)}] ${percentage}0%`;
}

export const areasSkills: IResumeAreasSkills = {
    "Hard skills": {
        "Full-stack Development": 9,
        "Version Control": 8,
        "Algorithms": 7,
        "Data Structures": 7,
        "Software Architecture": 6,
    },
    "Soft skills": {
        "Creativity": 9,
        "Problem Solving": 8,
        "Critical Thinking": 8,
        "Adaptability": 7,
        "Resilience": 6,
        "Collaboration": 6,
    },
    "Front-end": {
        "HTML5": 8,
        "HTMX": 6,
        "Templ": 6,
        "CSS": 8,
        "Tailwind": 7,
        "SCSS": 6,
        "JavaScript": 9,
        "TypeScript": 7,
        "jQuery": 9,
        "React.js": 8,
        "Svelte.js": 7,
        "Vue.js": 7,
        "Flutter": 6,
    },
    "Back-end": {
        "PHP": 9,
        "Laravel": 9,
        "CodeIgniter": 8,
        "Node.js": 8,
        "GoLang": 8,
        "Python": 7,
        "Kafka": 5,
        "RabbitMQ": 5,
    },
    "DevOps": {
        "Linux": 9,
        "Shell Script": 7,
        "Amazon Web Services (AWS)": 7,
        "Google Cloud Provider (GCP)": 6,
        "Azure": 5,
        "Docker": 8,
        "Docker Swarm": 6,
        "Kubernetes": 5,
    },
    "Database": {
        "SQL": 9,
        "MySQL": 8,
        "PostgreSQL": 7,
        "SQLite": 6,
        "Turso": 6,
        "NoSQL": 7,
        "MongoDB": 7,
        "Cassandra": 6,
    }
};

export const experiences: IResumeExperience[] = [
    {
        role: "Full-stack Developer Intermediate",
        company: "Delta Global",
        duration: `Sep 2023 - Present · ${calculateDates(new Date(2023, 8, 1), new Date())}`,
        location: "Porto Alegre, Rio Grande do Sul, Brazil",
        description: `<b>Key Achievements:</b>
            <ul>
                <li>Developed software solutions, handling front-end and back-end design, coding, testing, and deployment.</li>
                <li>Proposed innovative solutions in architectural discussions to enhance system efficiency.</li>
                <li>Collaborated with cross-functional teams to ensure reliable software development.</li>
                <li>Refactored legacy code to improve reliability, scalability and maintainability.</li>
                <li>Optimized queries and applied DSA knowledge to improve application performance and reduce response times by 70%</li>
            </ul>`
    },
    {
        role: "Full-stack Developer Intermediate",
        company: "Messem Investimentos",
        duration: "Jan 2023 - Aug 2023 · 8 mos",
        location: "Porto Alegre, Rio Grande do Sul, Brazil",
        description: `<b>Key Achievements:</b>
            <ul>
                <li>Successfully delivered features within agreed-upon timelines, meeting or exceeding client expectations.</li>
                <li>Implemented performance enhancements that resulted in improved system response time and increased overall customer satisfaction.</li>
            </ul>`
    },
    {
        role: "Full-stack Developer",
        company: "Brudam - Software TMS para sua transportadora",
        duration: "Jun 2020 - Dec 2022 · 2 yrs 7 mos",
        location: "Eldorado do Sul, Rio Grande do Sul, Brazil",
        description: `<b>Key Achievements:</b>
            <ul>
                <li>Implemented efficient algorithms and data structures to optimize software performance and scalability.</li>
                <li>Successfully delivered features within agreed-upon timelines, meeting or exceeding client expectations.</li>
                <li>Implemented performance enhancements that resulted in improved system response time and increased overall customer satisfaction.</li>
            </ul>`
    }
];

export const contacts: IResumeContact[] = [
    {
        label: "WhatsApp",
        icon: WhatsAppIcon,
        value: "https://wa.me/5551996326706",
        render() {
            return `<a href="${this.value}" target="_blank">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`;
        }
    },
    {
        label: "Telegram",
        icon: TelegramIcon,
        value: "https://t.me/mr_utzig",
        render() {
            return `<a href="${this.value}" target="_blank">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`;
        }
    },
    {
        label: "LinkedIn",
        value: "https://linkedin.com/in/mr-utzig",
        icon: LinkedInIcon,
        render() {
            return `<a href="${this.value}" target="_blank">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`;
        }
    },
    {
        label: "GitHub",
        value: "https://github.com/mr-utzig",
        icon: GitHubIcon,
        render() {
            return `<a href="${this.value}" target="_blank">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`;
        }
    },
    {
        label: "Send an email",
        value: `mailto:${email}`,
        icon: EmailIcon,
        render() {
            return `<a href="${this.value}">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`
        }
    }
]