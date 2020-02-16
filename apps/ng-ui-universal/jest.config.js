module.exports = {
  name: 'ng-ui-universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-ui-universal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
