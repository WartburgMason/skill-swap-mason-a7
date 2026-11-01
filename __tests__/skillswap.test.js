const { filterSkillsByCategory, calculateTotalCost, matchSkillsToUser } = require('../skillswap-functions.js');
const skills= [
    {title: "JavaScript", category: "Programming",tutor: "John Doe", price: 20},
    {title: "Python", category: "Programming", tutor: "Jane Smith", price: 25},
    {title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0},
    {title: "Guitar Lessons", category: "Music", tutor: "Alice Brown", price: 15},
    {title: "Italian Cooking", category: "Cooking", tutor: "Mario Rossi", price: 30},
    {title: "Yoga Instruction", category: "Fitness", tutor: "Sarah Davis", price: 20}
];
describe('Category filters', () => {
    test('filters skills by category', () => {
        const result = filterSkillsByCategory(skills,'Programming');
        expect(result).toEqual([
            { title: "JavaScript", category: "Programming", tutor: "John Doe", price: 20 },
            { title: "Python", category: "Programming", tutor: "Jane Smith", price: 25 },
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 }
        ]);
    });
    test('returns all skills when category is "All"', () => {
        const result = filterSkillsByCategory(skills, 'All');
        expect(result).toEqual([
            { title: "JavaScript", category: "Programming", tutor: "John Doe", price: 20 },
            { title: "Python", category: "Programming", tutor: "Jane Smith", price: 25 },
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 },
            { title: "Guitar Lessons", category: "Music", tutor: "Alice Brown", price: 15 },
            { title: "Italian Cooking", category: "Cooking", tutor: "Mario Rossi", price: 30 },
            { title: "Yoga Instruction", category: "Fitness", tutor: "Sarah Davis", price: 20 }
        ]);
    });
    test('returns an empty array when no skills match the category', () => {
        const result = filterSkillsByCategory(skills, 'Art');
        expect(result).toEqual([]);
    });
});
describe('Test Calculator', () => {
   test('Calculates Rate correctly', () => {
    const result =calculateTotalCost(2, 20);
    expect(result).toEqual("40.00");
   });
   test('Calculates Rate correctly', () => {
    const result =calculateTotalCost(3, 20);
    expect(result).toEqual("60.00");
   });
   test('Handle Free Sessions', () => {
    const result =calculateTotalCost(2, 0);
    expect(result).toEqual("0.00");
   });
   test('Handle session with 0 hours', () => {
    const result =calculateTotalCost(0, 20);
    expect(result).toEqual("0.00");
   });
   test('Handles decimal hours', () => {
    const result =calculateTotalCost(2.5, 10);
    expect(result).toEqual("25.00");
   });
   test('Handles decimal rates', () => {
    const result =calculateTotalCost(3, 10.25);
    expect(result).toEqual("30.75");
   }) ;
});

describe("Category and Price Filter", () =>{
    test("Handles Category Filter", () =>{
        const user1={category: "Programming", maxPrice: ""};
        const result=matchSkillsToUser(user1, skills)
        expect(result).toEqual([
            { title: "JavaScript", category: "Programming", tutor: "John Doe", price: 20 },
            { title: "Python", category: "Programming", tutor: "Jane Smith", price: 25 },
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 }
        ]);
    });
    test("Handle Category and Price Filter", () => {
        const user2={category: "Programming", maxPrice: 15}
        const result=matchSkillsToUser(user2, skills);
        expect(result).toEqual([
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 }
        ]);
    });
    test("Handle Price Filter", () =>{
        const user3={category: "All", maxPrice: 15};
        const result=matchSkillsToUser(user3, skills);
        expect(result).toEqual([
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 },
            {title: "Guitar Lessons", category: "Music", tutor: "Alice Brown", price: 15}
        ]);
    });
    test("Handle Free filter", () =>{
        const user4={category: "All", maxPrice: 0}
        const result=matchSkillsToUser(user4, skills)
        expect(result).toEqual([
            { title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0 }
        ]);
    });
    test("Returns Empty Array if no tutors match filter", () => {
        const user5={category: "Art", maxPrice: 15};
        const result=matchSkillsToUser(user5, skills);
        expect(result).toEqual([
        ]);
    })
});