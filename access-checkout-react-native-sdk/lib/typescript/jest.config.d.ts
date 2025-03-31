export const collectCoverage: boolean;
export const coverageDirectory: string;
export const collectCoverageFrom: string[];
export const preset: string;
export const setupFilesAfterEnv: string[];
export const testRegex: string;
export const reporters: (string | (string | {
    outputPath: string;
})[] | (string | {
    outputDirectory: string;
})[])[];
