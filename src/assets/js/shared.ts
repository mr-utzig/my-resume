import { getYearsOfExperience } from "./utils";

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
                        <span>✸ Experienced Full-stack Developer</span>
                    </div>
                    <div>
                        <span>⦿ Novo Hamburgo, Rio Grande do Sul, Brazil</span>
                    </div>
                    <p>Experienced Full Stack Developer with over ${getYearsOfExperience()} years of experience and a diversified skill set covering front-end, back-end, and mobile development. My expertise includes building web and mobile applications using Svelte, React.js, Vue.js, PHP (Laravel, CodeIgniter), Golang, Flutter and automating processes with Python and ShellScript. A strong foundation in both SQL and NoSQL databases underscores my ability to optimize data performance. As a self-taught developer passionate about technology, I am committed to continuous learning and delivering high-quality work.</p>
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
        "Full-stack Development": 8,
        "Version Control": 7,
        "Algorithms": 6,
        "Data Structures": 6,
        "Software Architecture": 4,
    },
    "Soft skills": {
        "Creativity": 9,
        "Problem Solving": 8,
        "Critical Thinking": 8,
        "Adaptability": 7,
        "Resilience": 6,
        "Collaboration": 5,
    },
    "Front-end": {
        "HTML5": 8,
        "HTMX": 5,
        "Templ": 4,
        "CSS": 8,
        "Tailwind": 5,
        "SCSS": 4,
        "JavaScript": 8,
        "TypeScript": 5,
        "jQuery": 7,
        "Svelte.js": 6,
        "Vue.js": 5,
        "React.js": 4,
    },
    "Back-end": {
        "PHP": 8,
        "Laravel": 5,
        "CodeIgniter": 5,
        "Node.js": 7,
        "GoLang": 6,
        "Python": 6,
        "Kafka": 3,
        "RabbitMQ": 3,
    },
    "Mobile": {
        "Flutter": 4,
    },
    "DevOps": {
        "Linux": 7,
        "Shell Script": 4,
        "Azure": 3,
        "Amazon Web Services (AWS)": 3,
        "Google Cloud Provider (GCP)": 3,
        "Docker": 5,
        "Docker Swarm": 4,
        "Kubernetes": 4,
    },
    "SQL": {
        "MySQL": 8,
        "SQLite": 6,
        "PostgreSQL": 5,
        "Turso": 3,
    },
    "NoSQL": {
        "MongoDB": 5,
        "Cassandra": 3,
    }
};

export const experiences: IResumeExperience[] = [
    {
        role: "Full-stack Developer Intermediate",
        company: "Delta Global",
        duration: "Sep 2023 - Present",
        location: "Porto Alegre, Rio Grande do Sul, Brazil",
        description: `<b>Description:</b>
            <ul>
                <li>Engaged in software development, handling both front-end and back-end system design, coding, testing, and deployment.</li>
                <li>Implemented efficient algorithms and data structures to enhance software performance.</li>
                <li>Played a crucial role in architectural discussions, proposing innovative solutions to boost system efficiency.</li>
                <li>Ensured the development of reliable software by collaborating closely with cross-functional teams.</li>
                <li>Kept abreast of industry trends to incorporate best practices and new technologies, improving development processes.</li>
            </ul>`
    },
    {
        role: "Full-stack Developer Intermediate",
        company: "Messem Investimentos",
        duration: "Jan 2023 - Aug 2023 · 8 mos",
        location: "Porto Alegre, Rio Grande do Sul, Brazil",
        description: `<b>Description:</b>
            <ul>
                <li>Collaborated with a team of software developers to design, develop, and maintain innovative software solutions.</li>
                <li>Participated in all phases of the software development life cycle, including requirements gathering, system design, coding, testing, and deployment.</li>
                <li>Implemented efficient algorithms and data structures to optimize software performance and scalability.</li>
                <li>Conducted code reviews, provided constructive feedback, and collaborated with team members to ensure high-quality code.</li>
                <li>Actively contributed to architectural discussions and proposed solutions to improve overall system design and efficiency.</li>
                <li>Collaborated with cross-functional teams, to deliver reliable and user-friendly software solutions.</li>
                <li>Researched and implemented industry best practices and emerging technologies to enhance software development processes.</li>
                <li>Assisted in troubleshooting and resolving software defects, addressing customer issues promptly and effectively.</li>
                <li>Documented software features, functionalities, and technical specifications to facilitate knowledge transfer and future maintenance.</li>
            </ul>
            <b>Key Achievements:</b>
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
        description: `<b>Description:</b>
            <ul>
                <li>Developed and maintained Brudam's flagship product, a Transportation Management System (TMS), ensuring its efficiency, reliability, and scalability.</li>
                <li>Utilized Flutter framework to create innovative and user-friendly mobile applications for third-party clients, meeting their specific requirements and exceeding expectations.</li>
            </ul>
            <b>Key Achievements:</b>
            <ul>
                <li>Successfully delivered complex projects on time and within budget, earning positive feedback from clients.</li>
                <li>Developed a robust TMS system that resulted in increased operational efficiency and cost savings for the company.</li>
                <li>Received recognition for exceptional problem-solving abilities, effectively identifying and resolving technical challenges.</li>
                <li>Actively stayed up-to-date with the latest industry trends and technologies, continuously improving skills and knowledge.</li>
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
        label: "Send an email",
        value: `mailto:${email}`,
        icon: EmailIcon,
        render() {
            return `<a href="${this.value}">
                    <img src="${this.icon}" width="25" height="25">
                    <span>${this.label}</span>
                </a>`
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
    }
]