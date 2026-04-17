import type Database from 'better-sqlite3';
import type { SubagentManifest } from '@spwnr/core-types';
export interface PackageRow {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
}
export interface PackageVersionRow {
    id: string;
    package_id: string;
    version: string;
    manifest_json: string;
    signature: string;
    tarball_path: string;
    published_at: string;
}
export interface PackageWithVersions extends PackageRow {
    versions: PackageVersionRow[];
}
export interface PackageSearchRow {
    package_id: string;
    version_id: string;
    agent_name: string;
    version: string;
    summary: string;
    instruction: string;
    description: string;
    domains: string;
    tags: string;
    persona_role: string;
    compatibility_hosts: string;
}
export declare class PackageStore {
    private readonly db;
    constructor(db: Database.Database);
    /** Insert or get a package by name. Returns the package id. */
    upsertPackage(name: string, description?: string): string;
    /** Publish a new version. Throws if version already exists. */
    publishVersion(opts: {
        packageName: string;
        version: string;
        manifest: SubagentManifest;
        signature: string;
        tarballPath: string;
    }): PackageVersionRow;
    /** Get all packages with their versions. */
    listPackages(): PackageWithVersions[];
    /** Get a specific package with all versions by name. */
    getPackage(name: string): PackageWithVersions | null;
    /** Get a specific version of a package. */
    getVersion(packageName: string, version: string): PackageVersionRow | null;
    /** Get the latest version of a package (by published_at). */
    getLatestVersion(packageName: string): PackageVersionRow | null;
    syncSearchIndex(): void;
    listSearchRows(options: {
        query?: string;
        limit: number;
        host?: string;
    }): Array<PackageSearchRow & {
        raw_score: number;
    }>;
    private listLatestPackageVersions;
    private replaceSearchDocument;
}
//# sourceMappingURL=package-store.d.ts.map