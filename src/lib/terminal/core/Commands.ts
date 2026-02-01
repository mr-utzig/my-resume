import { navigate } from "svelte-navigator";
import { history, showMatrix, isHacking } from "../store"
import { Workspace } from "./Workspace";
import { download, getYearsOfExperience } from "../../../assets/js/utils";
import { resume, areasSkills, experiences, contacts, email } from "../../../assets/js/shared";

// Programming quotes for fortune command
const fortunes = [
    "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
    "First, solve the problem. Then, write the code. — John Johnson",
    "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
    "Code is like humor. When you have to explain it, it's bad. — Cory House",
    "Simplicity is the soul of efficiency. — Austin Freeman",
    "Fix the cause, not the symptom. — Steve Maguire",
    "Before software can be reusable it first has to be usable. — Ralph Johnson",
    "Make it work, make it right, make it fast. — Kent Beck",
    "Walking on water and developing software from a specification are easy if both are frozen. — Edward V Berard",
    "The best error message is the one that never shows up. — Thomas Fuchs",
    "Talk is cheap. Show me the code. — Linus Torvalds",
    "Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
    "Truth can only be found in one place: the code. — Robert C. Martin",
    "It's not a bug; it's an undocumented feature. — Anonymous",
];

// Cowsay ASCII art
function cowsay(message: string): string {
    const maxLineLength = 40;
    const lines: string[] = [];
    
    // Word wrap
    const words = message.split(' ');
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length <= maxLineLength) {
            currentLine = (currentLine + ' ' + word).trim();
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);
    
    const longestLine = Math.max(...lines.map(l => l.length));
    const border = '_'.repeat(longestLine + 2);
    const bottomBorder = '-'.repeat(longestLine + 2);
    
    let bubble = ` ${border}\n`;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].padEnd(longestLine);
        if (lines.length === 1) {
            bubble += `< ${line} >\n`;
        } else if (i === 0) {
            bubble += `/ ${line} \\\n`;
        } else if (i === lines.length - 1) {
            bubble += `\\ ${line} /\n`;
        } else {
            bubble += `| ${line} |\n`;
        }
    }
    bubble += ` ${bottomBorder}`;
    
    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    
    return `<pre class="cowsay">${bubble}${cow}</pre>`;
}

// Neofetch-style system info
function getNeofetch(): string {
    const ascii = `<span class="neofetch-logo">
   ██╗     ██╗   ██╗████████╗███████╗██╗ ██████╗ 
   ██║     ██║   ██║╚══██╔══╝╚══███╔╝██║██╔════╝ 
   ██║     ██║   ██║   ██║     ███╔╝ ██║██║  ███╗
   ██║     ██║   ██║   ██║    ███╔╝  ██║██║   ██║
   ███████╗╚██████╔╝   ██║   ███████╗██║╚██████╔╝
   ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝ ╚═════╝ 
</span>`;
    
    const skillsList = Object.keys(areasSkills["Front-end"]).slice(0, 5).join(", ");
    const backendList = Object.keys(areasSkills["Back-end"]).slice(0, 5).join(", ");
    
    const info = `
<span class="neofetch-label">user</span>@<span class="neofetch-label">mr-utzig</span>
─────────────────────────
<span class="neofetch-key">Name:</span> Luiz Otavio Utzig Monteiro
<span class="neofetch-key">Role:</span> Full-stack Developer @ SAP
<span class="neofetch-key">Experience:</span> ${getYearsOfExperience()}+ years
<span class="neofetch-key">Location:</span> Novo Hamburgo, RS, Brazil
<span class="neofetch-key">Languages:</span> TypeScript, PHP, Go, Java, Python
<span class="neofetch-key">Frontend:</span> ${skillsList}
<span class="neofetch-key">Backend:</span> ${backendList}
<span class="neofetch-key">Shell:</span> zsh with oh-my-zsh
<span class="neofetch-key">Editor:</span> VS Code / Neovim
<span class="neofetch-key">Theme:</span> Tokyo Night

<span class="neofetch-colors">████████████████████████</span>`;
    
    return `<div class="neofetch">${ascii}<div class="neofetch-info">${info}</div></div>`;
}

// Hacking animation
function startHacking(): void {
    isHacking.set(true);
    
    const hackingLines = [
        "Initializing hack sequence...",
        "Bypassing firewall... [OK]",
        "Injecting payload... [OK]",
        "Accessing mainframe...",
        "Decrypting password: ********",
        "Gaining root access... [OK]",
        "Downloading secret files...",
        "Covering tracks... [OK]",
        "H4CK C0MPL3T3!",
        "",
        "(Just kidding, this is fake 😄)",
        "Press ESC to exit"
    ];
    
    let currentLine = 0;
    const outputEl = document.querySelector('.terminal-content');
    
    const interval = setInterval(() => {
        if (currentLine < hackingLines.length && outputEl) {
            const line = document.createElement('div');
            line.className = 'hacking-line';
            line.textContent = hackingLines[currentLine];
            outputEl.appendChild(line);
            currentLine++;
            outputEl.scrollTop = outputEl.scrollHeight;
        } else {
            clearInterval(interval);
            setTimeout(() => isHacking.set(false), 3000);
        }
    }, 500);
}

export const commands: ICommands = {
    help: {
        description: "Display available commands",
        options: {},
        exec() {
            let output = `<div class="help-output">
                <table>
                    <thead><tr><th>Command</th><th>Description</th></tr></thead>
                    <tbody>`;
            for (const key in commands) {
                if (Object.prototype.hasOwnProperty.call(commands, key)) {
                    const command = commands[key];
                    output += `<tr><td><span class="cmd-name">${key}</span></td><td>${command.description}</td></tr>`;
                }
            }
            output += `</tbody></table>
                <p class="help-tip">💡 Tip: Use <span class="cmd-name">Tab</span> for autocomplete, <span class="cmd-name">↑/↓</span> for history</p>
            </div>`;

            return getOutput(output);
        }
    },
    neofetch: {
        description: "Display system information in style",
        options: {},
        exec() {
            return getOutput(getNeofetch());
        }
    },
    whoami: {
        description: "Display current user information",
        options: {},
        exec() {
            return getOutput(`<span class="whoami">luiz-utzig</span> <span class="whoami-role">(Full-stack Developer @ SAP)</span>`);
        }
    },
    date: {
        description: "Display current date and time",
        options: {},
        exec() {
            const now = new Date();
            const formatted = now.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });
            return getOutput(`<span class="date-output">${formatted}</span>`);
        }
    },
    echo: {
        description: "Display a line of text",
        options: {},
        exec(args) {
            const text = args.parameters.join(" ");
            return getOutput(`<span class="echo-output">${text || ""}</span>`);
        }
    },
    cat: {
        description: "Display file contents",
        options: {},
        exec(args) {
            if (args.parameters.length !== 1) {
                throw "Usage: cat <filename>";
            }
            
            const filename = args.parameters[0];
            const files: Record<string, string> = {
                "about.txt": `
╔══════════════════════════════════════════════════════════════╗
║                    ABOUT ME                                  ║
╠══════════════════════════════════════════════════════════════╣
║  Name: Luiz Otavio Utzig Monteiro                           ║
║  Role: Full-stack Developer                                  ║
║  Location: Novo Hamburgo, RS, Brazil                        ║
║                                                              ║
║  Experienced Full Stack Developer with ${getYearsOfExperience()}+ years of         ║
║  experience covering front-end, back-end, and mobile dev.   ║
║                                                              ║
║  Passionate about technology and committed to continuous    ║
║  learning and delivering high-quality work.                 ║
╚══════════════════════════════════════════════════════════════╝`,
                "skills.txt": Object.keys(areasSkills).map(area => {
                    const skills = Object.keys(areasSkills[area]).join(", ");
                    return `[${area}]\n${skills}`;
                }).join("\n\n"),
                "contact.txt": `
📧 Email: ${email}
💬 Telegram: @mr_utzig
💼 LinkedIn: /in/mr-utzig
🐙 GitHub: @mr-utzig
📱 WhatsApp: +55 51 99632-6706`,
            };
            
            if (!files[filename]) {
                throw `cat: ${filename}: No such file or directory`;
            }
            
            return getOutput(`<pre class="cat-output">${files[filename]}</pre>`);
        }
    },
    tree: {
        description: "Display directory structure",
        options: {},
        exec() {
            const tree = `<pre class="tree-output">
<span class="folder">~/mr-utzig</span>
├── <span class="folder">about/</span>
│   ├── about.txt
│   └── contact.txt
├── <span class="folder">skills/</span>
│   ├── frontend.txt
│   ├── backend.txt
│   └── devops.txt
├── <span class="folder">experience/</span>
│   ├── sap.txt
│   ├── delta-global.txt
│   ├── messem.txt
│   └── brudam.txt
├── <span class="folder">docs/</span>
│   ├── resume.pdf
│   └── cover-letter.pdf
└── README.md

4 directories, 11 files</pre>`;
            return getOutput(tree);
        }
    },
    projects: {
        description: "List GitHub projects",
        options: {},
        exec() {
            const output = `<div class="projects-output">
                <h3>📦 GitHub Projects</h3>
                <div class="project">
                    <a href="https://github.com/mr-utzig/my-resume" target="_blank" rel="noopener">
                        <span class="project-name">my-resume</span>
                    </a>
                    <span class="project-desc">Terminal-style portfolio with Svelte + TypeScript</span>
                </div>
                <p class="projects-link">
                    🔗 View all: <a href="https://github.com/mr-utzig" target="_blank" rel="noopener">github.com/mr-utzig</a>
                </p>
            </div>`;
            return getOutput(output);
        }
    },
    social: {
        description: "Display social media links",
        options: {},
        exec() {
            let output = `<div class="social-output"><h3>🔗 Connect with me</h3><ul>`;
            contacts.forEach(c => {
                output += `<li><a href="${c.value}" target="_blank" rel="noopener">${c.label}</a></li>`;
            });
            output += `</ul></div>`;
            return getOutput(output);
        }
    },
    // Easter eggs
    matrix: {
        description: "Enter the Matrix",
        options: {},
        exec() {
            showMatrix.set(true);
            return getOutput(`<span class="matrix-msg">🐰 Follow the white rabbit... (Press ESC to exit)</span>`);
        }
    },
    hack: {
        description: "Initiate hacking sequence (just for fun)",
        options: {},
        exec() {
            startHacking();
            return getOutput("");
        }
    },
    cowsay: {
        description: "Have a cow say your message",
        options: {},
        exec(args) {
            const message = args.parameters.join(" ") || "Moo! I'm a cow!";
            return getOutput(cowsay(message));
        }
    },
    fortune: {
        description: "Display a random programming quote",
        options: {},
        exec() {
            const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
            return getOutput(`<div class="fortune-output">🔮 ${quote}</div>`);
        }
    },
    // Original commands
    goto: {
        description: "Navigate to another view",
        options: {
            "--ui": {
                description: "Goes to the user interface",
                exec() {
                    setTimeout(() => navigate("/", { replace: true }), 1500);
                }
            },
        },
        exec(args) {
            const ui = this.options[args.options[0]];
            if (!ui) throw `Invalid argument: ${args.options[0]}. Use --ui`;
            ui.exec();

            return getOutput(`<span class="redirect-msg">🚀 Redirecting to UI...</span>`);
        }
    },
    clear: {
        description: "Clear terminal screen",
        options: {},
        exec() {
            history.set([]);
        }
    },
    ls: {
        description: "List directory contents",
        options: {},
        exec() {
            const files = Workspace.files;
            const folders = Workspace.folders;

            let output = "<div class='ls-output'>";
            for (const key in folders) {
                if (Object.prototype.hasOwnProperty.call(folders, key)) {
                    output += `<span class="folder">📁 ${key}/</span>`;
                }
            }
            for (const key in files) {
                if (Object.prototype.hasOwnProperty.call(files, key)) {
                    output += `<span class="file">📄 ${key}</span>`;
                }
            }
            output += "</div>";

            return getOutput(output);
        }
    },
    lget: {
        description: "Download a file",
        options: {},
        exec(args) {
            if (args.parameters.length !== 1) {
                throw "Usage: lget <filename>";
            }

            const uri = Workspace.files[args.parameters[0]];
            if (!uri) {
                throw `lget: ${args.parameters[0]}: No such file`;
            }

            download(uri);

            return getOutput(`<span class="download-msg">⬇️ Downloading ${args.parameters[0]}...</span>`);
        }
    },
    man: {
        description: "Display command manual",
        options: {},
        exec(args) {
            if (args.parameters.length !== 1) {
                throw "Usage: man <command>";
            }

            const command = commands[args.parameters[0]];
            if (!command) {
                throw `No manual entry for ${args.parameters[0]}`;
            }

            let output = `<div class="man-output">
                <div class="man-section">
                    <span class="man-header">NAME</span>
                    <span class="man-content">${args.parameters[0]} - ${command.description}</span>
                </div>`;

            if (Object.keys(command.options).length) {
                const opts = command.options;
                output += `<div class="man-section">
                    <span class="man-header">OPTIONS</span>`;
                for (const key in opts) {
                    if (Object.prototype.hasOwnProperty.call(opts, key)) {
                        output += `<span class="man-option">${key}</span><span class="man-content">${opts[key].description}</span>`;
                    }
                }
                output += `</div>`;
            }

            output += "</div>";

            return getOutput(output);
        }
    },
    resume: {
        description: "Display resume sections",
        options: {
            "--all": {
                description: "Show all sections",
                exec() {
                    return resume.sections.all();
                }
            },
            "--abt": {
                description: "Show 'About' section",
                exec() {
                    return resume.sections.about();
                }
            },
            "--sks": {
                description: "Show 'Skills' section",
                exec() {
                    return resume.sections.skills();
                }
            },
            "--exp": {
                description: "Show 'Experience' section",
                exec() {
                    return resume.sections.experiences();
                }
            },
            "--ctt": {
                description: "Show 'Contact' section",
                exec() {
                    return resume.sections.contact();
                }
            }
        },
        exec(args) {
            let output = "";
            if (args.options.length !== 1) {
                args.options.push("--all");
            }

            const section = args.options[0];
            if (!this.options[section]) {
                throw `Invalid option: ${section}. Use --all, --abt, --sks, --exp, or --ctt`;
            }
            output = this.options[section].exec();

            return getOutput(output);
        }
    }
}

export function getCommandNames(): string[] {
    return Object.keys(commands);
}

function getOutput(output: string = "", lookup: boolean = true) {
    return {
        output: output,
        lookup: lookup
    };
}