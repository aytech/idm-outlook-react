const SNAPSHOT_PATH = 'test/snapshots';
const SRC_PATH = 'src';

module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) =>  {
    return testPath.replace(SRC_PATH, SNAPSHOT_PATH) + snapshotExtension;
  },

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath
      .replace(SNAPSHOT_PATH, SRC_PATH)
      .slice(0, -snapshotExtension.length);
  },

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'src/components/example.test.js',
};
