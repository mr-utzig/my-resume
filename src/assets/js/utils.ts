export function download(uri: string) {
    const link = document.createElement("a");

    link.href = uri;
    link.setAttribute('download', '');

    document.body.appendChild(link);
    link.click();
    link.remove();
}