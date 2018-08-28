const isInject = require('../utils/is-inject');

module.exports = {
  meta: {
    schema: [
      {
        enum: ['string', 'function']
      }
    ]
  },
  create: context => {
    const injectType = context.options[0] || 'string';

    return {
      CallExpression: node => {
        if (isInject(node)) {
          if (
            injectType === 'string' &&
            node.arguments[0].type === 'Literal' &&
            typeof node.arguments[0].value !== 'string'
          ) {
            context.report({
              message: 'Stores should be injected with a string',
              node
            });
          } else if (
            injectType === 'function' &&
            !['FunctionExpression', 'ArrowFunctionExpression'].includes(node.arguments[0].type)
          ) {
            context.report({
              message: 'Store properties should be injected with a function',
              node
            });
          }
        }
      }
    };
  }
};
