import { jsx as _jsx } from "react/jsx-runtime";
import { CommandBlock } from "./command-block";
/**
 * DockerCommand — CommandBlock preset for `docker pull/run/push` lines (§20),
 * used by Dokgistry screens so every image command is assembled — and copied —
 * the same way.
 */
export function DockerCommand({ command, image, args, ...props }) {
    return _jsx(CommandBlock, { command: ["docker", command, ...(args ?? []), image].join(" "), ...props });
}
