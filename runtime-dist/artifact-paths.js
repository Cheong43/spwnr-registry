import { join } from 'path';
import { getSpwnrHome } from './db.js';
/** Returns the path where tarballs for a package version are stored. */
export function getTarballPath(packageName, version) {
    return join(getSpwnrHome(), 'tarballs', packageName, `${version}.tar.gz`);
}
/** Returns the directory where a package version is installed. */
export function getInstalledPackageDir(packageName, version) {
    return join(getSpwnrHome(), 'packages', packageName, version);
}
//# sourceMappingURL=artifact-paths.js.map