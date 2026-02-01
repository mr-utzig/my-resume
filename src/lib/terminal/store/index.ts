import { writable } from "svelte/store";

export const input = writable<string>("");
export const history = writable<ICommandHistory[]>([]);
export const wd = writable<string>("~");
export const showMatrix = writable<boolean>(false);
export const isHacking = writable<boolean>(false);