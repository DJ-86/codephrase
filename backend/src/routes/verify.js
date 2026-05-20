const express = require('express');
const router = express.Router();
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const db = require('../db');


router.post('/', async (req, res) => {
    try {
        const { challengeId, code } = req.body;

        if (!code) {
            return res.status(400).json({error: 'No code provided'});
        }

        const challengeResult = await db.query(
            'SELECT expected_method, breakdown_template FROM challenges WHERE id = $1', 
            [challengeId]
        );

        if (challengeResult.rows.length === [0]) {
            return res.status(404).json({ error: 'Challenge not found'});
        }

        const challenge = challengeResult.rows[0];
        const expectedMethod = challenge.expected_method;

        let ast;
        try {
            ast = parser.parse(code, {
                sourceType: 'module',
                allowImportExportEverywhere: true,
            });
        }catch (parseError) {
            return res.status(400).json({
                passed: false,
                error: `Syntax error: ${parseError.message}`,
                output: null,
                breakdown: null,
            });
        }

        let methodFound = false;
        traverse(ast, {
            CallExpression(path) {
                const node = path.node;
                if (
                    node.callee.type === 'MemberExpression' &&
                    node.callee.property.name === expectedMethod
                ) {
                    methodFound = true;
                }
            }
        });

        let output = '';
        let executionError = null;

        try {
            const originalLog = console.log;
            console.log = (...arge) => {
                output += args.join(' ') + '\n'
            };

            eval(code);

            console.log = originalLog;
        } catch (error) {
            executionError = error.message;
        }

        res.json({
            passed: methodFound,
            output: output.trim(),
            error: executionError,
            breakdown: methodFound ? challenge.breakdown_template : 'Did not use the expected method(s).',
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;