import type { LogInput } from "./types";
declare const config: LogInput["config"];
declare const setConfig: (newConfig: LogInput["config"]) => void;
export { setConfig, config };
