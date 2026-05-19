const db = require ('./index');

const seedData = async () => {
    try {
        const conceptResult = await db.query(
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

        const conceptId = conceptResult.rows[0].id;

        await db.query(
            `INSERT INTO challenges (concept_id, title, description, starter_code, expected_method, test_code, breakdown_template)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
            conceptId,
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

        console.log('Seed data inserted successfully');

        
    } catch (error) {
        console.error('Error seeding data', error);
    }
};

seedData();