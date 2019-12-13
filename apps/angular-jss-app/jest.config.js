module.exports = {
  name: 'angular-jss',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-jss-app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
