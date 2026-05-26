const db = require('./index');

const seedData = async () => {

  try {
    console.log('🌱 Starting seed...');

    // ========================================
    // CONCEPT 1: Variables & Assignment
    // ========================================
    const concept1 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        'variables',
        'Variables & Assignment',
        'Store information in named containers so you can use it later',
        'You need to store information so you can use it later. Like writing down a phone number so you don\'t forget it.',
        'Variables are named containers for values. Use let for variables that change, const for values that stay the same. Assignment means storing a value in a variable.',
        'beginner',
        1
      ]
    );
    const c1Id = concept1.rows[0].id;

    const c1Challenges = [
      {
        title: 'Create and assign variables',
        description: 'Declare three variables: name (your name), age (your age), and city (your city). Assign values to each.',
        starterCode: `// Declare and assign three variables here`,
        expectedMethod: 'let',
        testCode: `// Variables should be defined with values`,
        breakdown: 'You successfully stored three pieces of information in variables. Now you can use them anywhere in your code.'
      },
      {
        title: 'Reassign a variable',
        description: 'Declare a variable with let, assign it a value, then change it to a different value. Show both assignments.',
        starterCode: `let message = "Hello";
// Now reassign it to "Goodbye"`,
        expectedMethod: 'let',
        testCode: `// Variable should be reassigned`,
        breakdown: 'You changed the value of a variable. That\'s why we use let—it allows reassignment. const would give an error here.'
      },
      {
        title: 'const vs let',
        description: 'Try to reassign a const variable and see what happens. Explain why it fails.',
        starterCode: `const favorite = "pizza";
// Try to reassign it to "sushi"`,
        expectedMethod: 'const',
        testCode: `// const should prevent reassignment`,
        breakdown: 'const prevents reassignment. Use const by default, only use let when you need to change the value later.'
      },
      {
        title: 'Initialize before use',
        description: 'Declare a variable, then use it in a console.log(). Don\'t assign a value first—use it undefined.',
        starterCode: `let empty;
// Try to use "empty" here`,
        expectedMethod: 'let',
        testCode: `// Variable should be declared`,
        breakdown: 'Variables declared without assignment have the value undefined. This is often a bug—always assign a value when you create a variable.'
      },
      {
        title: 'Follow naming conventions',
        description: 'Declare variables for: user first name, user last name, account balance. Use camelCase naming.',
        starterCode: `// Use camelCase: firstName, lastName, accountBalance`,
        expectedMethod: 'const',
        testCode: `// Variables should follow camelCase`,
        breakdown: 'camelCase is the JavaScript standard. It makes code readable and consistent with other developers\' code.'
      },
      {
        title: 'Store user data for a form',
        description: 'You\'re building a signup form. Declare variables for: email, password, and confirmPassword. Assign realistic example values.',
        starterCode: `// Declare and assign form field variables`,
        expectedMethod: 'const',
        testCode: `// Should have email, password, confirmPassword`,
        breakdown: 'You\'ve built the data structure for a form. In a real app, these would come from user input, but the pattern is the same.'
      },
      {
        title: 'Type matters: mixing types',
        description: 'Declare a variable as a number, then reassign it to a string. Show that JavaScript allows this (loose typing).',
        starterCode: `let value = 42;
// Reassign it to "hello"`,
        expectedMethod: 'let',
        testCode: `// Type should change`,
        breakdown: 'JavaScript allows variables to change types. This flexibility is powerful but can be dangerous—always know what type you\'re working with.'
      }
    ];

    for (const challenge of c1Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c1Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 1: Variables & Assignment (7 challenges)');

    // ========================================
    // CONCEPT 2: Primitive Types
    // ========================================
    const concept2 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'types',
        'Primitive Types',
        'Understand the different kinds of data: numbers, strings, booleans, null, and undefined',
        'JavaScript has different "kinds" of information: numbers, text, true/false. Each behaves differently, and you need to know which is which.',
        'JavaScript has 7 primitive types: number, string, boolean, null, undefined, symbol, and bigint. Each type behaves uniquely. Use typeof to check the type of a value.',
        'beginner',
        2
      ]
    );
    const c2Id = concept2.rows[0].id;

    const c2Challenges = [
      {
        title: 'Identify types with typeof',
        description: 'Given these values: 42, "hello", true, undefined, null. Use typeof on each and log the result.',
        starterCode: `// Use typeof on: 42, "hello", true, undefined, null
// Log each result`,
        expectedMethod: 'typeof',
        testCode: `// Should use typeof on multiple values`,
        breakdown: 'You used typeof to identify each type. Notice typeof null returns "object"—that\'s a famous quirk in JavaScript!'
      },
      {
        title: 'String vs Number',
        description: 'Create two variables: one with "42" (string) and one with 42 (number). Show they\'re different.',
        starterCode: `const stringNum = "42";
const actualNum = 42;
// Compare them with ===`,
        expectedMethod: 'const',
        testCode: `// Should have both string and number`,
        breakdown: 'Even though they look similar, "42" and 42 are completely different. This difference matters in calculations and comparisons.'
      },
      {
        title: 'Boolean true and false',
        description: 'Create boolean variables for: isLoggedIn (true), isAdmin (false). Use them in conditionals.',
        starterCode: `const isLoggedIn = true;
const isAdmin = false;
// Use these in if statements`,
        expectedMethod: 'const',
        testCode: `// Should have boolean values`,
        breakdown: 'Booleans power decisions in your code. If something is true, do this. If false, do that.'
      },
      {
        title: 'null vs undefined',
        description: 'Declare a variable with null. Declare another without assigning (undefined). Explain the difference.',
        starterCode: `const empty = null;
let uninitialized;
// Log both, compare with typeof`,
        expectedMethod: 'const',
        testCode: `// Should have both null and undefined`,
        breakdown: 'null is intentional emptiness (you set it). undefined is accidental emptiness (variable not set). null === undefined is false, but == is true.'
      },
      {
        title: 'Type coercion surprise',
        description: '"5" + 3 equals "53", not 8. Show string concatenation vs addition. Explain why.',
        starterCode: `console.log("5" + 3);
console.log(5 + 3);
// Are they the same?`,
        expectedMethod: 'const',
        testCode: `// Should show type coercion`,
        breakdown: 'When you add a string and a number, JavaScript converts both to strings and concatenates. This is type coercion—automatic conversion. It\'s powerful but dangerous.'
      },
      {
        title: 'Truthy and falsy values',
        description: 'Show what counts as true and false in conditionals: 0, "", null, undefined, false, true, 1, "hello".',
        starterCode: `// Test each value in an if statement
const values = [0, "", null, undefined, false, true, 1, "hello"];
// Log which are truthy/falsy`,
        expectedMethod: 'const',
        testCode: `// Should test truthiness`,
        breakdown: 'In JavaScript, false, 0, "", null, undefined are falsy. Everything else is truthy. This matters in conditionals.'
      },
      {
        title: 'Real scenario: user profile',
        description: 'Create variables for a user: name (string), age (number), isVerified (boolean), bio (string or null). This is real data structure thinking.',
        starterCode: `const user = {
  name: "Alice",
  age: 25,
  isVerified: true,
  bio: null
};`,
        expectedMethod: 'const',
        testCode: `// Should have mixed types`,
        breakdown: 'You\'ve built a real data structure with mixed types. Objects combine primitives into meaningful data.'
      }
    ];

    for (const challenge of c2Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c2Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 2: Primitive Types (7 challenges)');

    // ========================================
    // CONCEPT 3: Operators
    // ========================================
    const concept3 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'operators',
        'Operators: Arithmetic, Comparison, Logical',
        'Do math, compare values, and combine conditions',
        'You need to do math, compare things, and combine conditions. Like: "Is this person old enough AND do they have permission?"',
        'Operators let you work with data. Arithmetic operators do math: +, -, *, /, %. Comparison operators check equality: ===, !==, <, >. Logical operators combine conditions: &&, ||, !',
        'beginner',
        3
      ]
    );
    const c3Id = concept3.rows[0].id;

    const c3Challenges = [
      {
        title: 'Arithmetic operations',
        description: 'Calculate: sum of 10 and 5, product of 4 and 3, remainder of 17 divided by 5.',
        starterCode: `const a = 10, b = 5, c = 4, d = 3, e = 17, f = 5;
// Calculate sum, product, remainder`,
        expectedMethod: 'const',
        testCode: `// Should use +, *, %`,
        breakdown: 'You used arithmetic operators. + adds, * multiplies, % gives remainder (modulo). These are the building blocks of math in code.'
      },
      {
        title: 'Comparison: === vs ==',
        description: 'Compare "5" === 5 and "5" == 5. Show strict (===) vs loose (==) equality.',
        starterCode: `console.log("5" === 5);
console.log("5" == 5);
// Which is true?`,
        expectedMethod: 'const',
        testCode: `// Should use === and ==`,
        breakdown: '=== is strict: "5" and 5 are different types, so false. == is loose: it converts types, so true. Always use === to avoid bugs.'
      },
      {
        title: 'Logical AND',
        description: 'Check if age >= 18 AND hasLicense === true. Only proceed if both are true.',
        starterCode: `const age = 25;
const hasLicense = true;
const canDrive = age >= 18 && hasLicense;
// What is canDrive?`,
        expectedMethod: 'const',
        testCode: `// Should use &&`,
        breakdown: 'AND (&&) requires both conditions true. If either is false, the whole thing is false. This is how you check multiple requirements.'
      },
      {
        title: 'Logical OR',
        description: 'Check if user is admin OR user is moderator. They only need one role.',
        starterCode: `const isAdmin = false;
const isModerator = true;
const hasAccess = isAdmin || isModerator;
// What is hasAccess?`,
        expectedMethod: 'const',
        testCode: `// Should use ||`,
        breakdown: 'OR (||) requires at least one condition true. If either is true, the whole thing is true. Use this for alternatives.'
      },
      {
        title: 'Logical NOT',
        description: 'If isLoggedIn is false, use NOT (!) to make it true. Show inverting a boolean.',
        starterCode: `const isLoggedIn = false;
const needsLogin = !isLoggedIn;
// What is needsLogin?`,
        expectedMethod: 'const',
        testCode: `// Should use !`,
        breakdown: 'NOT (!) flips true to false and false to true. Use this to invert conditions.'
      },
      {
        title: 'Modulo: odd/even check',
        description: 'Use modulo (%) to check if a number is odd or even. 5 % 2 === 1 means odd.',
        starterCode: `const num = 7;
const isOdd = num % 2 === 1;
// What is isOdd?`,
        expectedMethod: 'const',
        testCode: `// Should use %`,
        breakdown: 'Modulo (%) gives the remainder. For odd/even: if number % 2 === 1, it\'s odd. If === 0, it\'s even.'
      },
      {
        title: 'Real scenario: permission system',
        description: 'User can access if: (isAdmin OR isModerator) AND isLoggedIn AND isBanned === false.',
        starterCode: `const isAdmin = true;
const isModerator = false;
const isLoggedIn = true;
const isBanned = false;
// Check permission with logical operators`,
        expectedMethod: 'const',
        testCode: `// Should combine &&, ||`,
        breakdown: 'You layered multiple conditions. This is how permission systems work—check multiple rules to decide access.'
      }
    ];

    for (const challenge of c3Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c3Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 3: Operators (7 challenges)');

    // ========================================
    // CONCEPT 4: Control Flow (if/else, switch)
    // ========================================
    const concept4 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'control-flow',
        'Control Flow: if/else and switch',
        'Make decisions in your code: do this if true, do that if false',
        'Your program needs to make decisions. "If the user is logged in, show their dashboard. Otherwise, show the login page."',
        'if/else lets you execute different code based on conditions. if (condition) { do this } else { do that }. Switch is useful for many cases.',
        'beginner',
        4
      ]
    );
    const c4Id = concept4.rows[0].id;

    const c4Challenges = [
      {
        title: 'Basic if/else',
        description: 'Check if a number is positive or negative. Log "Positive" or "Negative".',
        starterCode: `const number = -5;
// Use if/else to check sign`,
        expectedMethod: 'if',
        testCode: `// Should use if/else`,
        breakdown: 'You made a decision based on a condition. That\'s if/else—the foundation of conditional logic.'
      },
      {
        title: 'else if chain',
        description: 'Grade assignment: A (90+), B (80+), C (70+), F (<70). Use else if.',
        starterCode: `const score = 85;
// Use else if for each grade threshold`,
        expectedMethod: 'if',
        testCode: `// Should use else if`,
        breakdown: 'You chained multiple conditions. else if lets you check many possibilities in order.'
      },
      {
        title: 'Nested if',
        description: 'Check age >= 18 AND hasLicense === true. Nested if checks both.',
        starterCode: `const age = 25;
const hasLicense = true;
// Nested if: check age, then license`,
        expectedMethod: 'if',
        testCode: `// Should have nested if statements`,
        breakdown: 'Nested ifs check one condition, then another. This is readable but can get complex. Logical operators (&&) are often cleaner.'
      },
      {
        title: 'Truthy and falsy in conditions',
        description: 'Test what counts as true/false in an if: 0, "", null, undefined, false vs 1, "hi", true.',
        starterCode: `// Test falsy values: 0, "", null, undefined, false
// Test truthy values: 1, "hello", true`,
        expectedMethod: 'if',
        testCode: `// Should test truthiness`,
        breakdown: 'In conditionals, falsy values (0, "", null, undefined, false) act like false. Everything else is truthy. Remember this!'
      },
      {
        title: 'Switch statement',
        description: 'Match day of week: 1 = Monday, 2 = Tuesday, etc. Use switch, not if/else.',
        starterCode: `const day = 3;
// Use switch to match day number to name`,
        expectedMethod: 'switch',
        testCode: `// Should use switch`,
        breakdown: 'Switch is cleaner than if/else for many cases. Each case ends with break to avoid falling through.'
      },
      {
        title: 'Ternary operator',
        description: 'Rewrite an if/else as a ternary: condition ? valueIfTrue : valueIfFalse.',
        starterCode: `const age = 20;
// Use ternary instead of if/else
const status = age >= 18 ? "Adult" : "Minor";`,
        expectedMethod: 'const',
        testCode: `// Should use ? :`,
        breakdown: 'Ternary is a concise if/else for simple decisions. Don\'t use for complex logic—it gets hard to read.'
      },
      {
        title: 'Real scenario: permission system',
        description: 'User access depends on role: admin (all access), moderator (most), user (limited), guest (minimal).',
        starterCode: `const userRole = "moderator";
// Use switch or if/else to show access level`,
        expectedMethod: 'if',
        testCode: `// Should use control flow`,
        breakdown: 'This is how real apps work—check user role and grant different access. Control flow makes this possible.'
      }
    ];

    for (const challenge of c4Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c4Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 4: Control Flow (7 challenges)');
    // ========================================
    // CONCEPT 5: Loops
    // ========================================
    const concept5 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'loops',
        'Loops: for, while, forEach',
        'Do the same thing many times without rewriting code',
        'You need to do the same thing many times. Like: "Print each name in a list" or "Add up all the numbers."',
        'Loops repeat code. for loops run a set number of times. while loops run until a condition is false. forEach loops through arrays.',
        'beginner',
        5
      ]
    );
    const c5Id = concept5.rows[0].id;

    const c5Challenges = [
      {
        title: 'Basic for loop',
        description: 'Print numbers 1-10 using a for loop.',
        starterCode: `// for loop to print 1-10`,
        expectedMethod: 'for',
        testCode: `// Should use for`,
        breakdown: 'A for loop with i = 0; i < 10; i++ counts from 0 to 9. Add 1 to print 1-10.'
      },
      {
        title: 'Countdown with for loop',
        description: 'Print numbers 10 down to 1 using a for loop.',
        starterCode: `// for loop to count down from 10`,
        expectedMethod: 'for',
        testCode: `// Should use for with decrement`,
        breakdown: 'Use i-- to decrement instead of i++. This counts down.'
      },
      {
        title: 'while loop',
        description: 'Repeat until a condition is false. Start with count = 0; while count < 5, log and increment.',
        starterCode: `let count = 0;
// while loop until count >= 5`,
        expectedMethod: 'while',
        testCode: `// Should use while`,
        breakdown: 'while loops run as long as the condition is true. When false, they stop. This is useful when you don\'t know iterations in advance.'
      },
      {
        title: 'Loop with accumulator',
        description: 'Sum all numbers 1-100 using a loop and an accumulator variable.',
        starterCode: `let sum = 0;
// Loop from 1 to 100, adding each to sum`,
        expectedMethod: 'for',
        testCode: `// Should accumulate values`,
        breakdown: 'Accumulators start at an initial value (0 for sum, 1 for product). Each iteration updates it. At the end, you have your result.'
      },
      {
        title: 'forEach array loop',
        description: 'Use forEach to print each item in an array of fruits.',
        starterCode: `const fruits = ["apple", "banana", "cherry"];
// forEach to log each fruit`,
        expectedMethod: 'forEach',
        testCode: `// Should use forEach`,
        breakdown: 'forEach is the array-friendly loop. It runs once for each item, passing the item to a callback function.'
      },
      {
        title: 'break and continue',
        description: 'Loop through 1-10. Break at 6 (stop early). In another loop, continue at 5 (skip it).',
        starterCode: `// for loop with break at 6
// for loop with continue at 5`,
        expectedMethod: 'for',
        testCode: `// Should use break and continue`,
        breakdown: 'break stops the loop immediately. continue skips to the next iteration. Use these for precise control.'
      },
      {
        title: 'Real scenario: process orders',
        description: 'You have an array of orders. Loop through, calculate total cost (skip canceled orders).',
        starterCode: `const orders = [
  { id: 1, price: 50, status: "paid" },
  { id: 2, price: 30, status: "canceled" },
  { id: 3, price: 80, status: "paid" }
];
// Loop and sum only paid orders`,
        expectedMethod: 'forEach',
        testCode: `// Should loop with condition`,
        breakdown: 'This is real—you loop through items, check a condition, and accumulate results. Loops make this possible.'
      }
    ];

    for (const challenge of c5Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c5Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 5: Loops (7 challenges)');

    // ========================================
    // CONCEPT 6: Functions
    // ========================================
    const concept6 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'functions',
        'Functions: Declaration, Parameters, Return',
        'Wrap code in reusable blocks that you can call over and over',
        'You have code you\'ll use over and over. Instead of rewriting it, wrap it in a function. Like a recipe you can follow multiple times.',
        'Functions are reusable blocks of code. Declare with function name(params) { ... return value; }. Parameters are inputs, return is output. Arrow functions: (params) => { ... }',
        'beginner',
        6
      ]
    );
    const c6Id = concept6.rows[0].id;

    const c6Challenges = [
      {
        title: 'Basic function',
        description: 'Write a function that takes a number and returns it doubled.',
        starterCode: `// function double(n) that returns n * 2`,
        expectedMethod: 'function',
        testCode: `// Should have function with return`,
        breakdown: 'You declared a function with a parameter and a return value. Now you can call double(5) anytime.'
      },
      {
        title: 'Multiple parameters',
        description: 'Write a function that takes two numbers and returns their sum.',
        starterCode: `// function add(a, b) that returns a + b`,
        expectedMethod: 'function',
        testCode: `// Should have 2 parameters`,
        breakdown: 'Functions can take multiple inputs. Each parameter is a separate value you can use in the function.'
      },
      {
        title: 'Calculate area',
        description: 'Write a function that calculates area of a rectangle (width × height).',
        starterCode: `// function area(width, height)`,
        expectedMethod: 'function',
        testCode: `// Should calculate area`,
        breakdown: 'You used a function to encapsulate a calculation. This makes code reusable and readable.'
      },
      {
        title: 'No return value',
        description: 'Write a function that logs a message but doesn\'t return anything. Call it and see it returns undefined.',
        starterCode: `// function greet(name) that logs but doesn't return`,
        expectedMethod: 'function',
        testCode: `// Should have function without explicit return`,
        breakdown: 'Functions without return statements implicitly return undefined. Some functions exist just for side effects (like logging).'
      },
      {
        title: 'Arrow functions',
        description: 'Rewrite a regular function as an arrow function: const double = (n) => n * 2;',
        starterCode: `// Rewrite as arrow function
function add(a, b) { return a + b; }`,
        expectedMethod: 'arrow function',
        testCode: `// Should use =>`,
        breakdown: 'Arrow functions are concise syntax for functions. (n) => n * 2 is the same as function(n) { return n * 2; }'
      },
      {
        title: 'Default parameters',
        description: 'Function with default parameter: greet(name = "Friend") logs "Hello, Friend" if no name given.',
        starterCode: `// function greet(name = "Friend")`,
        expectedMethod: 'function',
        testCode: `// Should have default parameter`,
        breakdown: 'Default parameters kick in if the caller doesn\'t provide a value. This prevents undefined errors.'
      },
      {
        title: 'Real scenario: validators',
        description: 'Write functions: isValidEmail(email), isStrongPassword(password). Return true/false.',
        starterCode: `// isValidEmail: check for @ and .
// isStrongPassword: check length >= 8`,
        expectedMethod: 'function',
        testCode: `// Should have validation logic`,
        breakdown: 'Validators are functions that check if data meets requirements. They\'re used everywhere in real apps.'
      }
    ];

    for (const challenge of c6Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c6Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 6: Functions (7 challenges)');

    // ========================================
    // CONCEPT 7: Scope & Context
    // ========================================
    const concept7 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'scope',
        'Scope & Context: Where variables exist',
        'Understand variable lifetimes and visibility',
        'Variables have a "lifetime" and a "visibility." A variable declared inside a function is only usable inside that function. Outside, it doesn\'t exist.',
        'Global scope: accessible everywhere (avoid). Function scope: only in the function. Block scope (let/const): only in { } blocks. Shadowing: inner variable hides outer.',
        'beginner',
        7
      ]
    );
    const c7Id = concept7.rows[0].id;

    const c7Challenges = [
      {
        title: 'Global vs local scope',
        description: 'Declare a global variable. Inside a function, declare a local variable with the same name. Show shadowing.',
        starterCode: `let name = "Global";
function test() {
  let name = "Local";
  // Which name is used here?
}`,
        expectedMethod: 'let',
        testCode: `// Should show shadowing`,
        breakdown: 'The inner variable "shadows" the outer one. Inside the function, you use the local name. Outside, the global name. Same variable name, different values.'
      },
      {
        title: 'Block scope with let',
        description: 'Declare let inside an if block. Try to access it outside. It should fail.',
        starterCode: `if (true) {
  let blockScoped = "Only here";
}
// Try to log blockScoped here`,
        expectedMethod: 'let',
        testCode: `// Should show block scope`,
        breakdown: 'let respects block scope: { }. var doesn\'t—it\'s function-scoped. This is why let is preferred.'
      },
      {
        title: 'var vs let',
        description: 'Show var ignores block scope, let doesn\'t. Declare var and let in if block; access outside.',
        starterCode: `if (true) {
  var funcScoped = "var here";
  let blockScoped = "let here";
}
// Which can you access?`,
        expectedMethod: 'let',
        testCode: `// Should show scope difference`,
        breakdown: 'var is function-scoped, ignoring blocks. let is block-scoped. Use let—it\'s the modern standard.'
      },
      {
        title: 'Function scope',
        description: 'Access an outer function\'s variable from an inner function.',
        starterCode: `function outer() {
  let outerVar = "From outer";
  function inner() {
    // Can you access outerVar here?
  }
}`,
        expectedMethod: 'function',
        testCode: `// Should access outer variable`,
        breakdown: 'Inner functions can access outer variables. This is called "closure"—a preview of a more advanced concept.'
      },
      {
        title: 'Scope chain',
        description: 'Show lookup order: block → function → global. Where does JavaScript look for a variable?',
        starterCode: `let global = "Global";
function outer() {
  let funcVar = "Function";
  function inner() {
    let blockVar = "Block";
    // JavaScript looks: block → function → global
  }
}`,
        expectedMethod: 'let',
        testCode: `// Should access variables correctly`,
        breakdown: 'JavaScript looks for variables in this order: local block → function → global. First match wins. This is the scope chain.'
      },
      {
        title: 'this context',
        description: 'Call a method on an object. Inside the method, this refers to the object.',
        starterCode: `const person = {
  name: "Alice",
  greet: function() {
    // What does "this" refer to here?
  }
};`,
        expectedMethod: 'const',
        testCode: `// Should use this correctly`,
        breakdown: 'In a method, this = the object the method belongs to. this.name gets the name property. this is context-dependent.'
      },
      {
        title: 'Real scenario: module pattern',
        description: 'Create a module: private variable inside function, return public functions that access it.',
        starterCode: `const counter = (function() {
  let count = 0; // private
  return {
    increment: function() { count++; },
    getCount: function() { return count; }
  };
})();`,
        expectedMethod: 'const',
        testCode: `// Should show module pattern`,
        breakdown: 'This is a real pattern: only expose what\'s needed (public interface), keep the rest private. Scope and closures make this possible.'
      }
    ];

    for (const challenge of c7Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c7Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 7: Scope & Context (7 challenges)');
    // ========================================
    // CONCEPT 8: Objects & Properties
    // ========================================
    const concept8 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'objects',
        'Objects & Properties: Store related data together',
        'Group related information into a single container',
        'A single variable can only hold one value. But what if you need to store multiple related pieces of information together? Like a person: name, age, email. Use an object.',
        'Objects are key-value pairs: { key: value }. Access with dot notation (object.key) or bracket notation (object["key"]). Objects are mutable: you can change their properties.',
        'beginner',
        8
      ]
    );
    const c8Id = concept8.rows[0].id;

    const c8Challenges = [
      {
        title: 'Create and access object',
        description: 'Create a user object with: name, age, email. Access each property.',
        starterCode: `const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};
// Access each property`,
        expectedMethod: 'const',
        testCode: `// Should have object with properties`,
        breakdown: 'You grouped related data into one object. This is cleaner than three separate variables.'
      },
      {
        title: 'Mutate object properties',
        description: 'Create an object, then change some properties.',
        starterCode: `const person = { name: "Bob", age: 30 };
// Change name to "Bobby"
// Change age to 31`,
        expectedMethod: 'const',
        testCode: `// Should mutate properties`,
        breakdown: 'Objects are mutable—you can change properties after creation. This is different from const strings/numbers.'
      },
      {
        title: 'Add new properties',
        description: 'Create an object, then add a new property that wasn\'t there before.',
        starterCode: `const car = { brand: "Toyota", model: "Camry" };
// Add a new property: color = "blue"`,
        expectedMethod: 'const',
        testCode: `// Should add new property`,
        breakdown: 'JavaScript lets you add properties dynamically. You can expand objects anytime.'
      },
      {
        title: 'Dynamic property keys',
        description: 'Use a variable as a property key: const key = "email"; object[key].',
        starterCode: `const user = { name: "Alice", email: "alice@example.com" };
const key = "email";
// Access using the variable`,
        expectedMethod: 'const',
        testCode: `// Should use bracket notation`,
        breakdown: 'Bracket notation lets you use variables as keys. Dot notation (object.key) requires the key name literally.'
      },
      {
        title: 'Nested objects',
        description: 'Create an object with another object inside: person with address (city, state).',
        starterCode: `const person = {
  name: "Alice",
  address: {
    city: "New York",
    state: "NY"
  }
};
// Access person.address.city`,
        expectedMethod: 'const',
        testCode: `// Should have nested object`,
        breakdown: 'Objects can contain other objects. Access nested properties with dots: object.nested.property.'
      },
      {
        title: 'Methods on objects',
        description: 'Add a function to an object: person.greet = function() { ... }.',
        starterCode: `const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
// Call person.greet()`,
        expectedMethod: 'const',
        testCode: `// Should have method`,
        breakdown: 'Functions on objects are called "methods". Inside a method, this = the object. Methods are how objects do things.'
      },
      {
        title: 'Real scenario: data model',
        description: 'Build a product object: id, name, price, inStock (boolean), category. Use in e-commerce context.',
        starterCode: `const product = {
  id: 101,
  name: "Laptop",
  price: 999,
  inStock: true,
  category: "Electronics"
};`,
        expectedMethod: 'const',
        testCode: `// Should have product object`,
        breakdown: 'This is how real apps model data. Each entity (product, user, order) is an object with properties.'
      }
    ];

    for (const challenge of c8Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c8Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 8: Objects & Properties (7 challenges)');
    // ========================================
    // CONCEPT 9: Arrays & Indexing
    // ========================================
    const concept9 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'arrays',
        'Arrays & Indexing: Ordered lists of data',
        'Store multiple items in order and access by position',
        'An array is like a list. Each item has a position (index). You can get any item by its position.',
        'Arrays are ordered collections: [item1, item2, item3]. Zero-indexed: first item is index 0. Access with arr[0], arr[1]. Use .length to get count.',
        'beginner',
        9
      ]
    );
    const c9Id = concept9.rows[0].id;

    const c9Challenges = [
      {
        title: 'Create and access array',
        description: 'Create an array of fruits. Access the first, second, and last items.',
        starterCode: `const fruits = ["apple", "banana", "cherry"];
// Access index 0, 1, and last`,
        expectedMethod: 'const',
        testCode: `// Should access by index`,
        breakdown: 'Arrays are zero-indexed: first item is [0]. You accessed items by their position—that\'s indexing.'
      },
      {
        title: 'Array length',
        description: 'Create an array and use .length to count items.',
        starterCode: `const colors = ["red", "green", "blue"];
// Log the length`,
        expectedMethod: 'const',
        testCode: `// Should use .length`,
        breakdown: '.length tells you how many items are in the array. It\'s 1 more than the last index.'
      },
      {
        title: 'Out of bounds access',
        description: 'Try to access an index that doesn\'t exist. See what JavaScript returns.',
        starterCode: `const numbers = [1, 2, 3];
// Try to access index 10`,
        expectedMethod: 'const',
        testCode: `// Should attempt out of bounds`,
        breakdown: 'Accessing an invalid index returns undefined. This is often a bug—check .length before accessing.'
      },
      {
        title: 'Mutate by index',
        description: 'Create an array, then change an item at a specific position.',
        starterCode: `const names = ["Alice", "Bob", "Carol"];
// Change index 1 to "Bobby"`,
        expectedMethod: 'const',
        testCode: `// Should mutate array`,
        breakdown: 'Arrays are mutable: you can change, add, or remove items. arr[index] = newValue changes an item.'
      },
      {
        title: 'Mixed type array',
        description: 'Create an array with different types: number, string, boolean, object.',
        starterCode: `const mixed = [42, "hello", true, { key: "value" }];
// Log the array`,
        expectedMethod: 'const',
        testCode: `// Should have mixed types`,
        breakdown: 'JavaScript arrays can hold any type, even mixed. This flexibility is powerful but requires care.'
      },
      {
        title: 'Nested arrays (2D)',
        description: 'Create an array of arrays (like a grid). Access items: arr[row][col].',
        starterCode: `const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
// Access the middle item: grid[1][1]`,
        expectedMethod: 'const',
        testCode: `// Should have 2D array`,
        breakdown: 'Nested arrays are useful for grids, matrices, or any 2D data. Access with [row][col] indexing.'
      },
      {
        title: 'Real scenario: shopping list',
        description: 'Array of products: each item has id, name, quantity. This is a real shopping cart.',
        starterCode: `const cart = [
  { id: 1, name: "Laptop", quantity: 1 },
  { id: 2, name: "Mouse", quantity: 2 },
  { id: 3, name: "Keyboard", quantity: 1 }
];
// Access first item's price`,
        expectedMethod: 'const',
        testCode: `// Should have array of objects`,
        breakdown: 'This is real data modeling: array of objects. Each product is an object, the collection is an array.'
      }
    ];

    for (const challenge of c9Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c9Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 9: Arrays & Indexing (7 challenges)');

    // ========================================
    // CONCEPT 10: Array Methods - map
    // ========================================
    const concept10 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'map',
        'Array.map(): Transform each element',
        'Create a new array by transforming each element',
        'You have a list and need to transform it. Like: "Make all names uppercase," "Extract prices from products," or "Calculate new values."',
        '.map() runs a function on each element and returns a new array with the results. Original array is untouched (immutable). Most important for data transformation.',
        'intermediate',
        10
      ]
    );
    const c10Id = concept10.rows[0].id;

    const c10Challenges = [
      {
        title: 'Basic transform: uppercase',
        description: 'Transform array of names to uppercase using .map().',
        starterCode: `const names = ["alice", "bob", "charlie"];
// Use .map() to uppercase each name`,
        expectedMethod: 'map',
        testCode: `// Should use .map() with toUpperCase()`,
        breakdown: 'You used .map() to transform each element. Original array untouched. New array has uppercase names.'
      },
      {
        title: 'Extract from objects',
        description: 'Array of products with prices. Use .map() to extract just the prices.',
        starterCode: `const products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 }
];
// Use .map() to get prices array`,
        expectedMethod: 'map',
        testCode: `// Should use .map() and access property`,
        breakdown: 'You extracted one property from each object. .map() transforms the structure of data.'
      },
      {
        title: 'Calculation: multiply',
        description: 'Array of numbers. Use .map() to multiply each by 2.',
        starterCode: `const numbers = [1, 2, 3, 4];
// Use .map() to double each`,
        expectedMethod: 'map',
        testCode: `// Should use .map() with multiplication`,
        breakdown: 'You applied math to each element. .map() is perfect for calculations on every item.'
      },
      {
        title: 'Conditional transform',
        description: 'Array of numbers. Use .map() with ternary to mark odd/even: "3 (odd)", "4 (even)".',
        starterCode: `const numbers = [1, 2, 3, 4, 5];
// Use .map() with ternary to label odd/even`,
        expectedMethod: 'map',
        testCode: `// Should use .map() with ternary`,
        breakdown: 'You combined .map() with conditional logic. This is powerful for conditional transformations.'
      },
      {
        title: 'Chained maps',
        description: 'Transform an array twice: first uppercase names, then add prefix "Mr. ".',
        starterCode: `const names = ["alice", "bob"];
// Chain .map().map() or do both in one`,
        expectedMethod: 'map',
        testCode: `// Should use .map()`,
        breakdown: 'You chained transformations or did them together. Multiple transforms on data is common.'
      },
      {
        title: 'Template literal in map',
        description: 'Array of users with names and ages. Use .map() with template literal: "Alice (25 years old)".',
        starterCode: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];
// Use .map() with template literal`,
        expectedMethod: 'map',
        testCode: `// Should use .map() and template literals`,
        breakdown: 'Template literals in .map() are perfect for formatting data. You\'re combining transformation with formatting.'
      },
      {
        title: 'Real scenario: UI display list',
        description: 'Array of products. Use .map() to create display strings: "Laptop - $999" for each.',
        starterCode: `const products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];
// Use .map() to format for display`,
        expectedMethod: 'map',
        testCode: `// Should use .map()`,
        breakdown: 'This is real: transform data for display. .map() prepares data for the UI.'
      }
    ];

    for (const challenge of c10Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c10Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 10: Array.map() (7 challenges)');
    // ========================================
    // CONCEPT 11: Array Methods - filter
    // ========================================
    const concept11 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'filter',
        'Array.filter(): Keep only elements that match',
        'Create a new array with only elements that pass a test',
        'You have a list and need to keep only items that match a condition. Like: "Keep only users over 18," "Find active products," or "Get emails that include @".',
        '.filter() checks each element with a function. If true, keep it. If false, discard it. Returns new array with only matches. Original untouched.',
        'intermediate',
        11
      ]
    );
    const c11Id = concept11.rows[0].id;

    const c11Challenges = [
      {
        title: 'Basic filter: numbers',
        description: 'Array of numbers. Use .filter() to keep only numbers > 5.',
        starterCode: `const numbers = [1, 3, 7, 2, 8, 4, 9];
// Use .filter() to keep only > 5`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter()`,
        breakdown: 'You filtered numbers by condition. Only items where the function returns true remain.'
      },
      {
        title: 'Filter objects by property',
        description: 'Array of users with ages. Use .filter() to keep only users >= 18.',
        starterCode: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 16 },
  { name: "Carol", age: 30 }
];
// Use .filter() to keep only adults`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter()`,
        breakdown: 'You filtered by checking a property. This is how you filter datasets by criteria.'
      },
      {
        title: 'Filter by type',
        description: 'Mixed array. Use .filter() to keep only strings (or only numbers).',
        starterCode: `const mixed = [1, "hello", 2, "world", 3];
// Use .filter() to keep only strings`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter() and typeof`,
        breakdown: 'You filtered by type. typeof is useful in filters for type-based filtering.'
      },
      {
        title: 'Complex condition',
        description: 'Products array. Filter: inStock === true AND price < 50.',
        starterCode: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 25, inStock: true },
  { name: "Keyboard", price: 75, inStock: false }
];
// Use .filter() with && condition`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter() with &&`,
        breakdown: 'You combined multiple conditions in .filter(). This is real: filtering by multiple criteria.'
      },
      {
        title: 'Inverse filter',
        description: 'Array of items. Use .filter() with ! (NOT) to keep items that DON\'T match.',
        starterCode: `const items = [1, 2, 3, 4, 5];
// Use .filter() to keep only items NOT === 3`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter() with !`,
        breakdown: 'Inverse filters remove matching items. Use ! to negate the condition.'
      },
      {
        title: 'Filter with method call',
        description: 'Array of strings. Use .filter() with .includes() to keep only emails with "@".',
        starterCode: `const emails = ["alice@example.com", "bob.com", "carol@test.com"];
// Use .filter() with .includes() to verify @ symbol`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter() and .includes()`,
        breakdown: 'You combined .filter() with other methods. Chaining methods is powerful.'
      },
      {
        title: 'Real scenario: search results',
        description: 'Array of products. User searches for "laptop". Filter to show only matching products.',
        starterCode: `const products = [
  { name: "Laptop Pro", category: "Electronics" },
  { name: "Gaming Laptop", category: "Electronics" },
  { name: "Desk", category: "Furniture" }
];
const search = "laptop";
// Use .filter() with .toLowerCase().includes()`,
        expectedMethod: 'filter',
        testCode: `// Should use .filter()`,
        breakdown: 'This is real: filtering search results. .filter() + .includes() is the pattern.'
      }
    ];

    for (const challenge of c11Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c11Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 11: Array.filter() (7 challenges)');
    // ========================================
    // CONCEPT 12: Array Methods - reduce
    // ========================================
    const concept12 = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
      [
        'reduce',
        'Array.reduce(): Combine all elements into one value',
        'Accumulate array elements into a single result',
        'You have an array of values and need one combined result. Like: "Sum all prices," "Count items," "Group by category," or "Join strings with commas".',
        '.reduce() takes an accumulator (starting value) and updates it for each element. Returns final accumulated value. Most powerful array method.',
        'intermediate',
        12
      ]
    );
    const c12Id = concept12.rows[0].id;

    const c12Challenges = [
      {
        title: 'Sum numbers',
        description: 'Array of numbers. Use .reduce() to calculate the sum.',
        starterCode: `const numbers = [5, 10, 15, 20];
// Use .reduce() to sum all`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'You started with 0, then added each number. That\'s reduce: accumulate into one final value.'
      },
      {
        title: 'Multiply all (product)',
        description: 'Array of numbers. Use .reduce() to calculate the product (multiply all).',
        starterCode: `const numbers = [2, 3, 4];
// Use .reduce() to multiply all`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'Start with 1 (identity for multiplication), multiply each number. .reduce() is flexible for any accumulation.'
      },
      {
        title: 'Count items',
        description: 'Array of items. Use .reduce() to count how many match a condition (e.g., > 5).',
        starterCode: `const numbers = [1, 6, 3, 8, 2, 9];
// Use .reduce() to count numbers > 5`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'You accumulated a counter. Each time the condition matched, increment. This is counting with reduce.'
      },
      {
        title: 'Build an object',
        description: 'Array of items. Use .reduce() to build an object grouping by category.',
        starterCode: `const items = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" }
];
// Use .reduce() to group by category`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'You transformed an array into an object structure. This is data reshaping with reduce.'
      },
      {
        title: 'Join with separator',
        description: 'Array of names. Use .reduce() to build a single string: "Alice, Bob, Carol".',
        starterCode: `const names = ["Alice", "Bob", "Carol"];
// Use .reduce() to join with ", "`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'You built a string by accumulating names. .reduce() can accumulate into any type: numbers, objects, strings.'
      },
      {
        title: 'Find max/min value',
        description: 'Array of numbers. Use .reduce() to find the maximum value.',
        starterCode: `const numbers = [3, 7, 2, 9, 1];
// Use .reduce() to find max`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'You compared each number with the accumulator, keeping the larger. Math operations with reduce.'
      },
      {
        title: 'Real scenario: shopping cart total',
        description: 'Cart array with items (each has price and quantity). Use .reduce() to calculate total cost.',
        starterCode: `const cart = [
  { name: "Laptop", price: 999, quantity: 1 },
  { name: "Mouse", price: 25, quantity: 2 },
  { name: "Keyboard", price: 75, quantity: 1 }
];
// Use .reduce() to calculate total: (price * quantity) summed`,
        expectedMethod: 'reduce',
        testCode: `// Should use .reduce()`,
        breakdown: 'Real scenario: calculate total price. .reduce() combines multiple operations: multiply price × quantity, sum all. This is ecommerce logic.'
      }
    ];

    for (const challenge of c12Challenges) {
      await db.query(
        `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [c12Id, challenge.title, challenge.description, challenge.starterCode, challenge.expectedMethod, challenge.testCode, challenge.breakdown]
      );
    }

    console.log('✅ Concept 12: Array.reduce() (7 challenges)');

    console.log('\n✅✅✅ SEED COMPLETE ✅✅✅');
    console.log('📊 Summary:');
    console.log('   12 Concepts');
    console.log('   84 Challenges');
    console.log('   All seeded and ready to go!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();