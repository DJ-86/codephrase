const express = require('express');
const router = express.Router();
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const db = require('../db');

// Map of expected methods to AST node checkers
const methodCheckers = {
  'let': (ast) => hasVariableDeclaration(ast, 'let'),
  'const': (ast) => hasVariableDeclaration(ast, 'const'),
  'if': (ast) => hasIfStatement(ast),
  'for': (ast) => hasForLoop(ast),
  'while': (ast) => hasWhileLoop(ast),
  'function': (ast) => hasFunctionDeclaration(ast),
  'arrow function': (ast) => hasArrowFunction(ast),
  'map': (ast) => hasMethodCall(ast, 'map'),
  'filter': (ast) => hasMethodCall(ast, 'filter'),
  'reduce': (ast) => hasMethodCall(ast, 'reduce'),
  'forEach': (ast) => hasMethodCall(ast, 'forEach'),
  'typeof': (ast) => hasUnaryOperator(ast, 'typeof'),
  'switch': (ast) => hasSwitchStatement(ast),
};

function hasVariableDeclaration(ast, kind) {
  let found = false;
  traverse(ast, {
    VariableDeclaration(path) {
      if (path.node.kind === kind) {
        found = true;
      }
    }
  });
  return found;
}

function hasIfStatement(ast) {
  let found = false;
  traverse(ast, {
    IfStatement(path) {
      found = true;
    }
  });
  return found;
}

function hasForLoop(ast) {
  let found = false;
  traverse(ast, {
    ForStatement(path) {
      found = true;
    }
  });
  return found;
}

function hasWhileLoop(ast) {
  let found = false;
  traverse(ast, {
    WhileStatement(path) {
      found = true;
    }
  });
  return found;
}

function hasFunctionDeclaration(ast) {
  let found = false;
  traverse(ast, {
    FunctionDeclaration(path) {
      found = true;
    }
  });
  return found;
}

function hasArrowFunction(ast) {
  let found = false;
  traverse(ast, {
    ArrowFunctionExpression(path) {
      found = true;
    }
  });
  return found;
}

function hasMethodCall(ast, methodName) {
  let found = false;
  traverse(ast, {
    CallExpression(path) {
      const node = path.node;
      if (
        node.callee.type === 'MemberExpression' &&
        node.callee.property.name === methodName
      ) {
        found = true;
      }
    }
  });
  return found;
}

function hasUnaryOperator(ast, operator) {
  let found = false;
  traverse(ast, {
    UnaryExpression(path) {
      if (path.node.operator === operator) {
        found = true;
      }
    }
  });
  return found;
}

function hasSwitchStatement(ast) {
  let found = false;
  traverse(ast, {
    SwitchStatement(path) {
      found = true;
    }
  });
  return found;
}

router.post('/', async (req, res) => {
  try {
    const { challengeId, code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    // Get challenge from database
    const challengeResult = await db.query(
      'SELECT expected_method, breakdown_template FROM challenges WHERE id = $1',
      [challengeId]
    );

    if (challengeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const challenge = challengeResult.rows[0];
    const expectedMethod = challenge.expected_method;

    // Parse code into AST
    let ast;
    try {
      ast = parser.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
      });
    } catch (parseError) {
      return res.status(400).json({
        passed: false,
        error: `Syntax error: ${parseError.message}`,
        output: null,
        breakdown: null,
      });
    }

    // Check if code uses the expected method
    const checker = methodCheckers[expectedMethod];
    let methodFound = false;

    if (checker) {
      methodFound = checker(ast);
    } else {
      // Fallback: if no specific checker, assume it passes
      methodFound = true;
    }

    // Try to execute the code and capture output
    let output = '';
    let executionError = null;

    try {
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(' ') + '\n';
      };

      eval(code);

      console.log = originalLog;
    } catch (error) {
      executionError = error.message;
    }

    // Return result
    res.json({
      passed: methodFound,
      output: output.trim(),
      error: executionError,
      breakdown: methodFound ? challenge.breakdown_template : `Did not use ${expectedMethod}.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;