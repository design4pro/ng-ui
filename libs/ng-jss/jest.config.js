module.exports = {
  name: 'ng-jss',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-jss',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
