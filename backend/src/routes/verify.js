const express = require('express');
const router = express.Router();
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const db = require('../db');

// Method checkers
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
      'SELECT expected_method, breakdown_template, test_code FROM challenges WHERE id = $1',
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
      // Fallback: unknown method, assume passes
      methodFound = false;
    }

    // Execute code and capture output
    let output = '';
    let executionError = null;
    let executionSuccess = false;

    try {
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(' ') + '\n';
      };

      eval(code);

      console.log = originalLog;
      executionSuccess = true;
    } catch (error) {
      executionError = error.message;
    }

    // Determine pass/fail
    // For MVP: pass if method found AND code executes without error
    const passed = methodFound && executionSuccess;

    res.json({
      passed,
      output: output.trim(),
      error: executionError,
      breakdown: passed 
        ? challenge.breakdown_template 
        : executionError 
          ? `Code error: ${executionError}`
          : `Did not use ${expectedMethod}.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;