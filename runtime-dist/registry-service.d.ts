import { HostType } from '@spwnr/core-types';
import type { SubagentManifest } from '@spwnr/core-types';
export interface PublishResult {
    name: string;
    version: string;
    signature: string;
    tarballPath: string;
}
export interface InstallResult {
    name: string;
    version: string;
    installedDir: string;
}
export interface ListEntry {
    name: string;
    versions: string[];
    latestVersion: string | null;
}
export interface InfoResult {
    name: string;
    version: string;
    manifest: SubagentManifest;
    signature: string;
    tarballPath: string;
    publishedAt: string;
}
export interface SearchPackagesOptions {
    query?: string | undefined;
    host?: HostType | undefined;
    domain?: string | undefined;
    limit?: number | undefined;
}
export interface SearchPackageResult {
    agentName: string;
    version: string;
    summary: string;
    domains: string[];
    hosts: HostType[];
    score: number;
}
export type WorkerRole = 'research' | 'execute' | 'review';
export interface ShortlistWorkersOptions {
    taskBrief: string;
    host: HostType;
    preferredDomain?: string | undefined;
    role: WorkerRole;
    limit?: number | undefined;
}
export interface WorkerShortlistResult {
    role: WorkerRole;
    taskBrief: string;
    preferredDomain: string | null;
    candidates: SearchPackageResult[];
}
export interface WorkerCoverageUnitOptions {
    unitId: string;
    taskBrief: string;
    preferredDomain?: string | undefined;
    limit?: number | undefined;
}
export interface WorkerCoverageUnitResult {
    unitId: string;
    taskBrief: string;
    preferredDomain: string | null;
    candidates: SearchPackageResult[];
}
export interface WorkerCoverageSelectionEntry {
    agentName: string;
    coversUnitIds: string[];
}
export interface WorkerCoveragePlanOptions {
    host: HostType;
    preferredDomain?: string | undefined;
    units: WorkerCoverageUnitOptions[];
    limit?: number | undefined;
}
export interface WorkerCoveragePlanResult {
    preferredDomain: string | null;
    units: WorkerCoverageUnitResult[];
    recommendedSelection: WorkerCoverageSelectionEntry[];
    uncoveredUnitIds: string[];
}
export declare class RegistryService {
    private readonly db;
    private readonly store;
    private readonly signer;
    private readonly tarball;
    constructor(dbPath?: string);
    publish(packageDir: string): Promise<PublishResult>;
    install(packageName: string, version?: string): Promise<InstallResult>;
    list(): ListEntry[];
    info(packageName: string, version?: string): InfoResult;
    searchPackages(options?: SearchPackagesOptions): SearchPackageResult[];
    shortlistWorkers(options: ShortlistWorkersOptions): WorkerShortlistResult;
    buildCoveragePlan(options: WorkerCoveragePlanOptions): WorkerCoveragePlanResult;
    close(): void;
}
//# sourceMappingURL=registry-service.d.ts.map