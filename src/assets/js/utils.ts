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

export function calculateDates(d1: Date, d2: Date): string {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    let days = Math.round(Math.abs((d1.getTime() - d2.getTime()) / ONE_DAY));

    let str_years = "";
    if (days >= 365) {
        const ONE_YEAR = 365;
        const years = Math.floor(days / ONE_YEAR);
        str_years = `${years} ${years === 1 ? 'yr' : 'yrs'}`;

        days = days - (ONE_YEAR * years);
    }

    let str_months = "";
    if (days >= 30) {
        const ONE_MONTH = 30;
        const months = Math.ceil(days / ONE_MONTH);
        str_months = `${months} ${months === 1 ? 'mo' : 'mos'}`;
    }

    return `${str_years} ${str_months}`;
}