const {RuleTester} = require('eslint');
const rule = require('../src/rules/enforce-inject-type');

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
});

ruleTester.run('enforce-inject-type', rule, {
  valid: [
    {
      code: `
        import {inject} from 'mobx-react';

        @inject('store')
        class Thing extends Component {}
      `,
      options: ['string']
    },
    {
      code: `
        import {inject} from 'mobx-react';

        @inject(() => {})
        class Thing extends Component {}
      `,
      options: ['function']
    }
  ],
  invalid: [
    {
      code: `
        import {inject} from 'mobx-react';

        @inject(() => {})
        class Thing extends Component {}
      `,
      options: ['string']
    },
    {
      code: `
        import {inject} from 'mobx-react';

        @inject('store')
        class Thing extends Component {}
      `,
      options: ['function']
    }
  ]
});
