module.exports = {
  name: 'ng-ui-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-ui-app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
