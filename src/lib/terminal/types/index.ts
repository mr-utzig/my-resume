interface ICommandOutput {
    output: string;
    lookup: boolean;
}

interface ICommandExecArgs {
    options: string[];
    parameters: string[];
}

interface ICommandOption {
    description: string;
    exec: (args?: string) => any;
}

interface ICommandOptions {
    [option: string]: ICommandOption;
}

interface ICommandInternals {
    description: string;
    options: ICommandOptions;
    exec: (args: ICommandExecArgs) => ICommandOutput | void;
}

interface ICommands {
    [name: string]: ICommandInternals;
}

interface ICommandHistory {
    path: string;
    input: string;
    output: string;
    lookup: boolean;
}

enum FileType {
    file = '-',
    dir = 'd',
    symlink = 'l',
    fifo = 'p',
    socket = 's',
    block = 'b',
    character = 'c',
    door = 'D'
}

interface IAccessPermissions {
    owner: string;
    group: string;
    fileType: FileType;
}

interface IFileSystem {
    name: string;
    fullPath: string;
    accessPermissions: IAccessPermissions;
    size: number;
    lastModifiedDate: Date;
}

interface IWorkspace {
    files: {
        [name: string]: string
    };
    folders: {
        [name: string]: string
    };
}

interface IResumeAreasSkills {
    [area: string]: {
        [skill: string]: number
    };
}

interface IResumeExperience {
    role: string;
    company: string;
    duration: string;
    location: string;
    description: string;
}

interface IResumeContact {
    label: string;
    icon: string;
    value: string;
    render: () => string;
}