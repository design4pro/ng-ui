module.exports = {
  name: 'ng-ui-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-ui-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
