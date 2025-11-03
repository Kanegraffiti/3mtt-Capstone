# Student Lessons

These notes capture the extended reflections gathered while building the MyMovies capstone as a student team. They are split into three themes so they can double as a workshop outline when mentoring new cohorts.

## 1. Technical mastery grows through repetition
- **APIs feel safer with contracts.** We created a shared "response contract" document with status codes, payload shapes and pagination rules. Printing it during feature planning kept the React components and Express controllers in sync.
- **Observability is a multiplier.** Adding quick `console.group` calls around critical fetches made tracing race conditions trivial. Once the patterns emerged, we promoted the logs into reusable toaster notifications.
- **Intentional offline support.** Simulating airplane mode during demos revealed brittle assumptions about caching. Swapping to indexedDB for long-term caching is now on our post-capstone roadmap.

## 2. Collaboration thrives on transparency
- **Daily 10-minute syncs.** We start stand-ups by asking for a "lesson shared" rather than a status update. This prompts peers to surface blockers or shortcuts that others can reuse immediately.
- **Definition of done checklists.** Every pull request includes testing notes, screenshots where applicable and a student-friendly summary. Reviewers know exactly what to verify and junior teammates get examples of professional documentation.
- **Rotating stewardship.** Each week a new person owns the deployment pipeline and shared credentials. This spreads operational knowledge and prevents hero bottlenecks.

## 3. Career readiness is built intentionally
- **Portfolio breadcrumbs.** After shipping a feature we jot down the problem, approach and result in a shared Notion template. These blurbs later become portfolio case studies or interview stories.
- **Community contribution.** We use GitHub Discussions to catalogue tricky questions the class solves. Linking to those threads in resumes demonstrates real-world problem solving.
- **Continuous improvement loops.** Retrospectives end with one change to keep, one to start and one to stop. Capturing the "why" behind each decision cements the habit of reflective practice.

## Suggested follow-up exercises
1. Run a brown-bag session where each teammate presents a five-minute lightning talk on one lesson above.
2. Build a mini feature in a new branch using the documented definition of done template to practise disciplined delivery.
3. Pair with another cohort and swap lessons learned to broaden exposure to alternative stacks and workflows.

> “The difference between a student project and a professional portfolio piece is the story you can tell about the lessons you learned along the way.”
