import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function stubOptionalEnv(name: string, value: string | undefined) {
    vi.stubEnv(name, value ?? "");
    if (value === undefined) delete process.env[name];
}

beforeEach(() => {
    vi.resetModules();
    stubOptionalEnv("VITE_CONTACT_EMAIL", undefined);
    stubOptionalEnv("VITE_CONTACT_PHONE", undefined);
    stubOptionalEnv("VITE_AVAILABLE_FOR_OPPORTUNITIES", undefined);
});

afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
});

describe("Contact configuration", () => {
    it.each([undefined, "", "   "])("uses generic contact fallbacks for %j", async (value) => {
        stubOptionalEnv("VITE_CONTACT_EMAIL", value);
        stubOptionalEnv("VITE_CONTACT_PHONE", value);

        const { email, phone, contacts, availableForOpportunities } = await import("../src/assets/js/shared");

        expect(email).toBe("hello@example.com");
        expect(phone).toBe("+1 202 555 0123");
        expect(contacts.find(contact => contact.label === "WhatsApp")?.value)
            .toBe("https://wa.me/12025550123");
        expect(availableForOpportunities).toBe(true);
    });

    it("uses configured contacts in the terminal and strips phone formatting for WhatsApp", async () => {
        vi.stubEnv("VITE_CONTACT_EMAIL", "  developer@example.com  ");
        vi.stubEnv("VITE_CONTACT_PHONE", "  +44 (20) 7946-0958  ");

        const { email, phone, contacts, resume } = await import("../src/assets/js/shared");
        const { commands } = await import("../src/lib/terminal/core/Commands");
        const output = commands.cat.exec({ options: [], parameters: ["contact.txt"] });

        expect(email).toBe("developer@example.com");
        expect(phone).toBe("+44 (20) 7946-0958");
        expect(contacts.find(contact => contact.label === "WhatsApp")?.value)
            .toBe("https://wa.me/442079460958");
        expect(resume.sections.contact()).toContain('href="https://wa.me/442079460958"');
        expect(output).toEqual(expect.objectContaining({
            output: expect.stringContaining("Email: developer@example.com")
        }));
        expect(output).toEqual(expect.objectContaining({
            output: expect.stringContaining("WhatsApp: +44 (20) 7946-0958")
        }));
    });

    it.each(["", "yes", "TRUE", "0"])("rejects invalid availability %j", async (value) => {
        vi.stubEnv("VITE_AVAILABLE_FOR_OPPORTUNITIES", value);

        await expect(import("../src/assets/js/shared"))
            .rejects.toThrow("VITE_AVAILABLE_FOR_OPPORTUNITIES must be 'true' or 'false'.");
    });
});

describe("Contact UI", () => {
    it.each([
        ["true", "Available for new opportunities", false],
        ["false", "Not available for new opportunities", true]
    ] as const)("renders configured contacts with availability %s", async (value, message, unavailable) => {
        vi.stubEnv("VITE_CONTACT_EMAIL", "developer@example.com");
        vi.stubEnv("VITE_CONTACT_PHONE", "+44 (20) 7946-0958");
        vi.stubEnv("VITE_AVAILABLE_FOR_OPPORTUNITIES", value);
        vi.stubGlobal("IntersectionObserver", class {
            observe() {}
            disconnect() {}
        });
        const { default: Contact } = await import("../src/lib/user-interface/components/Contact.svelte");

        render(Contact);

        expect(screen.getByText('"developer@example.com"')).toBeInTheDocument();
        expect(screen.getByText("+44 (20) 7946-0958")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /WhatsApp/ }))
            .toHaveAttribute("href", "https://wa.me/442079460958");
        expect(screen.getByText(message).parentElement?.classList.contains("unavailable"))
            .toBe(unavailable);
    });
});
