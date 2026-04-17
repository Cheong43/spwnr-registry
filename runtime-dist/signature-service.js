import { createHash } from 'crypto';
export class SignatureService {
    /**
     * Sign a manifest: returns SHA-256 hex of JSON.stringify(manifest).
     */
    sign(manifest) {
        return createHash('sha256')
            .update(JSON.stringify(manifest))
            .digest('hex');
    }
    /**
     * Verify a manifest against a previously generated signature.
     */
    verify(manifest, signature) {
        return this.sign(manifest) === signature;
    }
}
//# sourceMappingURL=signature-service.js.map