import type { SubagentManifest } from '@spwnr/core-types';
export declare class SignatureService {
    /**
     * Sign a manifest: returns SHA-256 hex of JSON.stringify(manifest).
     */
    sign(manifest: SubagentManifest): string;
    /**
     * Verify a manifest against a previously generated signature.
     */
    verify(manifest: SubagentManifest, signature: string): boolean;
}
//# sourceMappingURL=signature-service.d.ts.map