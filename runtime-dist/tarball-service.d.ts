export declare class TarballService {
    /**
     * Create a .tar.gz from a directory.
     * @param sourceDir - absolute path to the package directory (e.g. /path/to/code-reviewer)
     * @param destPath - absolute path where .tar.gz should be written (e.g. ~/.spwnr/tarballs/code-reviewer/0.1.0.tar.gz)
     */
    pack(sourceDir: string, destPath: string): Promise<void>;
    /**
     * Extract a .tar.gz into a directory.
     * @param tarballPath - absolute path to the .tar.gz
     * @param destDir - absolute path to extract into (will be created)
     */
    extract(tarballPath: string, destDir: string): Promise<void>;
}
//# sourceMappingURL=tarball-service.d.ts.map