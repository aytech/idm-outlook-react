###UNIT TESTS

- Jest is used to perform unit tests for react components (https://jestjs.io/docs/en/tutorial-react)
- run tests with `npm run test`
- Jest creates snapshots to test results of components (regression test)
    - snapshots are part of the repository and should be part of the code review
    - in order to keep component directory tree clean `jestSnapshotResolver` was implemented (https://jestjs.io/docs/en/configuration#snapshotresolver-string)
- when rendered output of component is changed by code changes, run `npm run test -- -u` to upgrade snapshots
    - do not use `-u` flag to force your changes, failing tests should be reviewed before upgrading snapshots
     
