module.exports = {
  name: 'angular-jss-universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-jss-universal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
