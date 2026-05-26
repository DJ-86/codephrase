# CodePhrase 🎓

A full-stack learning platform that teaches programming through **decision-making and methodology**, not syntax memorization.

> **Status:** MVP (locally runnable, not deployed)

---

## The Vision

Traditional programming education teaches syntax in isolation. CodePhrase teaches **when and why** to use a tool through:

1. **Real use cases** — "You're processing user data. How do you keep the original safe?"
2. **Concept explanation** — Why immutability matters, not just what `.map()` does
3. **Methodology-based testing** — "Did you use `.map()`?" not "Is the output correct?"
4. **Depth-first learning** — 7 varied challenges per concept until intuition forms

**Philosophy:** Repetition + variation = mastery. Learn one concept deeply before moving to the next.

---

## What Works (MVP Complete)

✅ **Full authentication** — Register, login, JWT tokens  
✅ **12 concepts, 84 challenges** — Complete curriculum structure  
✅ **Methodology verification** — AST parsing checks if you used the right method  
✅ **Code execution** — Runs your code and captures output  
✅ **Progress tracking** — Shows which concepts you've mastered  
✅ **Modern UI** — Dark theme, smooth interactions, responsive design  
✅ **Full-stack working** — Frontend ↔ Backend ↔ Database fully integrated  

---

## What's Tested

| Feature | Status | Notes |
|---------|--------|-------|
| Login/Register | ✅ Working | JWT auth, password hashing |
| Load challenges | ✅ Working | All 84 challenges in database |
| Write code | ✅ Working | Textarea editor (Monaco later) |
| Verify methodology | ✅ Working | Checks for `.map()`, `let`, `if`, `for`, etc. |
| Execute code | ✅ Working | Runs user code, captures output |
| Track progress | ✅ Working | Updates when concept fully complete |
| Navigate UI | ✅ Working | Dashboard → Concept → Challenge flow |

---

## What's NOT Tested (Phase 2)

❌ **Output validation** — Currently doesn't check if result is *correct*, just that method exists  
❌ **Detailed feedback** — Generic breakdowns, not personalized  
❌ **Code sandbox** — Uses `eval()`, not safe for production  
❌ **Infinite loop detection** — No timeout on code execution  
❌ **Mobile responsive** — Desktop-optimized  

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router
- Axios (API client)

**Backend**
- Node.js + Express
- JWT + bcrypt (auth)
- @babel/parser (AST analysis)

**Database**
- PostgreSQL (Neon Cloud)

**Deployment:** Not deployed (local only)

---

## How to Run Locally

### Prerequisites
- Node.js 18+
- PostgreSQL account (Neon free tier)
- npm

### Setup

**1. Clone & install**
```bash
git clone <repo>
cd codephrase

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

**2. Create `.env` files**

`backend/.env`:
```
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/codephrase?sslmode=require
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

`frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

**3. Seed database**
```bash
cd backend
node src/db/seed.js
```

**4. Run both servers**

Terminal 1:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

Terminal 2:
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**5. Test it**
- Go to http://localhost:5173
- Register a new account
- Click a concept
- Click a challenge
- Write code that uses the required method
- Submit

---

## The Learning Loop

```
1. User sees challenge with use case
   ↓
2. User writes code in editor
   ↓
3. User clicks Submit
   ↓
4. Backend:
   - Parses code to AST
   - Checks if required method (e.g., .map()) exists
   - Executes code
   - Returns pass/fail + breakdown
   ↓
5. Frontend shows result + explanation
   ↓
6. Dashboard updates progress (when all 7 in concept done)
```

---

## Verification Logic (How Tests Work)

### Current (MVP)
Checks:
- ✅ Does the code use the required method? (AST parsing)
- ✅ Does the code execute without errors?

Does NOT check:
- ❌ Is the output correct?
- ❌ Is the method used correctly?

### Example: Transform names to uppercase

**Current verification:**
```javascript
const code = `const names = ['alice', 'bob']; names.map(n => n.toUpperCase());`;
// Result: PASS ✅ (because .map() exists)
```

**What Phase 2 would do:**
```javascript
// Setup: const names = ['alice', 'bob'];
// Run user code
// Check: result === ['ALICE', 'BOB']
// Only pass if output matches expected
```

---

## Curriculum Structure

All 12 concepts follow the same pattern: **depth-first with progressive variation**.

### Concepts (in order)

1. **Variables & Assignment** (7 challenges)
2. **Primitive Types** (7 challenges)
3. **Operators** (7 challenges)
4. **Control Flow** (7 challenges)
5. **Loops** (7 challenges)
6. **Functions** (7 challenges)
7. **Scope & Context** (7 challenges)
8. **Objects & Properties** (7 challenges)
9. **Arrays & Indexing** (7 challenges)
10. **Array.map()** (7 challenges)
11. **Array.filter()** (7 challenges)
12. **Array.reduce()** (7 challenges)

Each concept builds on previous ones. Depth-first approach: master one concept fully before moving to the next.

---

## What's Phase 2

1. **Output validation** (15-20 hours)
   - Define expected output for each challenge
   - Validate user output against it

2. **Better error messages** (5-10 hours)
   - Parse AST to tell them what they did wrong

3. **Code sandbox** (10-15 hours)
   - Don't use `eval()` (unsafe)
   - Handle infinite loops, timeouts

4. **More challenges** (5-10 hours)
   - DOM manipulation
   - Async/promises
   - Object methods

5. **UI polish** (5 hours)
   - Monaco editor
   - Mobile responsive
   - Better animations

6. **Deployment** (2-3 hours)
   - Railway/Render backend
   - Vercel frontend

---

## Known Issues & Limitations

| Issue | Impact | Workaround |
|-------|--------|-----------|
| Uses `eval()` | Unsafe; code not sandboxed | Don't use in production |
| No infinite loop detection | Browser can freeze | Add timeout in Phase 2 |
| All tests auto-pass | Verification not strict | Implement output validation in Phase 2 |
| Textarea editor | Poor UX | Use Monaco editor in Phase 2 |

---

## What I Learned Building This

**Technical:**
- Full-stack architecture (frontend ↔ backend ↔ database)
- JWT authentication + token management
- AST parsing with Babel
- React routing + state management
- SQL queries + PostgreSQL

**About Teaching:**
- Depth-first learning beats breadth
- Methodology testing is harder than output testing
- Progress visualization matters
- Real use cases drive engagement

---

## Git Commits

```
feat: backend auth with JWT and PostgreSQL
feat: React frontend scaffold
feat: challenge verification with AST parsing
feat: Dashboard with modern UI redesign
feat: MVP complete - full-stack learning platform
```

---

## Questions?

Read the code. Understand the philosophy. Build your own version.

The interesting part isn't the code—it's the **curriculum design** and **learning methodology**.

Happy learning! 🚀