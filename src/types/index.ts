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

interface ICommandHistory {
    input: string;
    response: string;
    path: string
}

interface IAccessPermissions {
    owner: string,
    group: string,
    fileType: FileType,

}

interface IFileSystem {
    name: string,
    fullPath: string,
    accessPermissions: IAccessPermissions,
    size: number,
    lastModifiedDate: Date
}