import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, test } from "vitest";
import THistory from "../src/lib/Terminal/History.svelte";
import TInfo from "../src/lib/Terminal/Info.svelte";

describe("Terminal", () => {
    describe("History", () => {
        const command = {
            input: "cerveja",
            response: "min de papai",
            path: "~"
        }

        beforeEach(() => {
            render(THistory, { props: { history: [command] } });
        });

        it("Should render the input", () => {
            const input = screen.getByText(command.input);
            expect(input).toBeInTheDocument();
        });
        it("Should render the response", () => {
            const response = screen.getByText(command.response);
            expect(response).toBeInTheDocument();
        });
        it("Should render the path", () => {
            const path = screen.getByText(command.path);
            expect(path).toBeInTheDocument();
        });
    });

    describe("Info", () => {
        let wd: string = "~"

        beforeEach(() => {
            render(TInfo, { props: { wd } });
        });

        it("Should render the working directory", () => {
            const dir = screen.getByText(wd);
            expect(dir).toBeInTheDocument();
        });
    });

    describe("Commands", () => {
        test("cd",)
    });
});