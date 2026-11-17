import type { CommandBlockProps } from "./command-block";
export interface DockerCommandProps extends Omit<CommandBlockProps, "command"> {
    /** The docker verb. */
    command: "pull" | "run" | "push";
    /** Image reference — "registry.foundathyon.dev/library/nginx:1.27". */
    image: string;
    /** Extra flags, placed between the verb and the image ("-d", "-p 8080:80"). */
    args?: string[];
}
/**
 * DockerCommand — CommandBlock preset for `docker pull/run/push` lines (§20),
 * used by Dokgistry screens so every image command is assembled — and copied —
 * the same way.
 */
export declare function DockerCommand({ command, image, args, ...props }: DockerCommandProps): import("react").JSX.Element;
