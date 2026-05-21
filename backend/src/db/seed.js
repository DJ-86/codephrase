const db = require('./index');

const seedData = async () => {
  try {
    // Concept 1: Map
    const mapResult = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        'map',
        'Array.map()',
        'Transform each element in an array without mutating the original',
        'You\'re processing user data. If you mutate the original array and something fails, you\'ve lost your source data. How do you keep the original safe while working with transformed values?',
        'Immutability means the original stays untouched. .map() creates a new array with transformed values. This is safer than looping and mutating in place.',
        'beginner',
        1
      ]
    );

    const mapId = mapResult.rows[0].id;

    await db.query(
      `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        mapId,
        'Transform names to uppercase',
        'You have an array of student names. Transform each name to uppercase and return the new array.',
        `const names = ['alice', 'bob', 'carol'];
// Write your code here`,
        'map',
        `const names = ['alice', 'bob', 'carol'];
const result = PLACEHOLDER;
console.log(result);`,
        'Your original array stayed untouched. The new array has uppercase values. That\'s why .map() was the right choice.'
      ]
    );

    // Concept 2: Filter
    const filterResult = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        'filter',
        'Array.filter()',
        'Keep only elements that match a condition',
        'You have a list of users and need to find only the active ones. Filter lets you create a new array with only the items you want, without touching the original.',
        'Filter checks each element against a condition. If true, it keeps it. If false, it removes it. Returns a new array with only matching items.',
        'beginner',
        2
      ]
    );

    const filterId = filterResult.rows[0].id;

    await db.query(
      `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        filterId,
        'Find numbers greater than 5',
        'You have an array of numbers. Return a new array with only numbers greater than 5.',
        `const numbers = [1, 3, 7, 2, 8, 4, 9];
// Write your code here`,
        'filter',
        `const numbers = [1, 3, 7, 2, 8, 4, 9];
const result = PLACEHOLDER;
console.log(result);`,
        'Your original array stayed untouched. The new array contains only numbers greater than 5. That\'s what filter does—keep what matches, discard the rest.'
      ]
    );

    // Concept 3: Reduce
    const reduceResult = await db.query(
      `INSERT INTO concepts (slug, title, description, use_case, explanation, difficulty, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        'reduce',
        'Array.reduce()',
        'Combine all elements into a single value',
        'You have an array of purchase amounts and need to calculate the total. Reduce lets you accumulate values into one final result.',
        'Reduce takes each element and combines it with an accumulator. It starts with an initial value, then for each element, it updates the accumulator and returns the final combined value.',
        'beginner',
        3
      ]
    );

    const reduceId = reduceResult.rows[0].id;

    await db.query(
      `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        reduceId,
        'Sum all numbers in an array',
        'You have an array of numbers. Use reduce to calculate the sum of all numbers.',
        `const numbers = [5, 10, 15, 20];
// Write your code here`,
        'reduce',
        `const numbers = [5, 10, 15, 20];
const result = PLACEHOLDER;
console.log(result);`,
        'You used reduce to accumulate all numbers into a single sum. That\'s the power of reduce—combining many values into one.'
      ]
    );

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();