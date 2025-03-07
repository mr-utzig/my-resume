export function download(uri: string): void {
    const link = document.createElement("a");

    link.href = uri;
    link.setAttribute('download', '');

    document.body.appendChild(link);
    link.click();
    link.remove();
}

export function getYearsOfExperience(): number {
    return new Date().getFullYear() - 2020;
}