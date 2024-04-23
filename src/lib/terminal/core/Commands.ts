import { navigate } from "svelte-navigator";
import { history } from "../store"
import { Workspace } from "./Workspace";
import { download } from "../../../assets/js/utils";
import { resume } from "../../../assets/js/shared";

export const commands: ICommands = {
    help: {
        description: "Display available commands",
        options: {},
        exec() {
            let output = "<table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody>";
            for (const key in commands) {
                if (Object.prototype.hasOwnProperty.call(commands, key)) {
                    const command = commands[key];
                    output += `<tr><td>${key}</td><td>${command.description}</td></tr>`;
                }
            }
            output += "</tbody></table>";

            return getOutput(output);
        }
    },
    goto: {
        description: "Transfers the control to another instance",
        options: {
            "--ui": {
                description: "Goes to the user interface instance",
                exec() {
                    setTimeout(() => navigate("/", { replace: true }), 1500);
                }
            },
        },
        exec(args) {
            const ui = this.options[args.options[0]];
            if (!ui) throw `Invalid argument: ${args.options[0]}`;
            ui.exec();

            return getOutput("You will be redirected soon!");
        }
    },
    clear: {
        description: "Clears your terminal's screen",
        options: {},
        exec() {
            history.set([]);
        }
    },
    ls: {
        description: "List current directory contents",
        options: {},
        exec() {
            const files = Workspace.files;
            const folders = Workspace.folders;

            let output = "";
            for (const key in files) {
                if (Object.prototype.hasOwnProperty.call(files, key)) {
                    output += `<label class="file">${key}</label>`;
                }
            }

            for (const key in folders) {
                if (Object.prototype.hasOwnProperty.call(folders, key)) {
                    output += `<label class="folder">${key}</label>`;
                }
            }

            return getOutput(output);
        }
    },
    lget: {
        description: "The non-interactive local file downloader",
        options: {},
        exec(args) {
            if (args.parameters.length !== 1) {
                throw "Invalid number of arguments";
            }

            const uri = Workspace.files[args.parameters[0]];
            if (!uri) {
                throw `File ${args.parameters[0]} not found in current directory`;
            }

            download(uri);

            return getOutput(`${args.parameters[0]}: Download started`);
        }
    },
    man: {
        description: "An interface to the system reference manuals",
        options: {},
        exec(args) {
            if (args.parameters.length !== 1) {
                throw "Invalid number of arguments";
            }

            const command = commands[args.parameters[0]];
            if (!command) {
                throw `No manual entry for ${args.parameters[0]}`;
            }

            let output = `<div class="man__wrapper">
                <div class="man__section name">
                    <strong>NAME</strong>
                    <span>${args.parameters[0]} - ${command.description}</span>
                </div>`;

            if (Object.keys(command.options).length) {
                const opts = command.options;
                output += `<div class="man__section synopsis">
                    <strong>SYNOPSIS</strong>`;
                for (const key in opts) {
                    if (Object.prototype.hasOwnProperty.call(opts, key)) {
                        output += `<span>${key} - ${opts[key].description}</span>`;
                    }
                }
                output += `</div>`;
            }

            output += "</div>";

            return getOutput(output);
        }
    },
    resume: {
        description: "Shows sections of my resume based on given option",
        options: {
            "--all": {
                description: "Shows all sections",
                exec() {
                    return resume.sections.all();
                }
            },
            "--abt": {
                description: "Shows the 'About' section",
                exec() {
                    return resume.sections.about();
                }
            },
            "--sks": {
                description: "Shows the 'Skills' section",
                exec() {
                    return resume.sections.skills();
                }
            },
            "--exp": {
                description: "Shows the 'Experience' section",
                exec() {
                    return resume.sections.experiences();
                }
            },
            "--ctt": {
                description: "Shows the 'Contact' section",
                exec() {
                    return resume.sections.contact();
                }
            }
        },
        exec(args) {
            let output = "";
            if (args.options.length !== 1) {
                throw "Invalid number of arguments";
            }

            const section = args.options[0];
            if (!this.options[section]) {
                throw `Invalid options: ${section}`;
            }
            output = this.options[section].exec();

            return getOutput(output);
        }
    }
}

function getOutput(output: string = "", lookup: boolean = true) {
    return {
        output: output,
        lookup: lookup
    };
}