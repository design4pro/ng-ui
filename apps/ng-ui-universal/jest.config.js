module.exports = {
  name: 'ng-ui-universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-ui-universal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
