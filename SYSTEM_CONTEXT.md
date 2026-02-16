Purpose
-------

This document defines the **non-negotiable architectural decisions and constraints** for the system.All implementation work (human or AI-generated) **must strictly conform** to this context.

If an issue requires a deviation, it must be **explicitly proposed and approved** before implementation.

1\. Platform & Framework
------------------------

*   **Framework:** Next.js (App Router only)
    
*   **Runtime:** Node.js
    
*   **Deployment:** Vercel
    
*   **Routing:** App Router with route handlers (app/api/\*\*/route.ts)
    
*   **Middleware:** middleware.ts for request-level concerns only (auth gating, redirects)
    

❌ No pages/api❌ No client-side routing logic for security decisions

2\. Authentication & Sessions (Critical)
----------------------------------------

*   **Authentication model:** Server-side, database-backed sessions
    
*   **JWTs:** ❌ NOT used for authentication
    
*   **Session storage:** Database (authoritative source of truth)
    
*   **Session identifier:** Stored in httpOnly, secure cookies
    
*   **Session validation:** Server-side only
    

Security constraints:

*   ❌ No tokens in localStorage
    
*   ❌ No auth logic trusted to the client
    
*   ❌ No stateless auth assumptions
    

3\. Database & ORM
------------------

*   **Database:** PostgreSQL
    
*   **ORM:** Prisma (final decision)
    
*   **Schema management:** Prisma migrations
    
*   **Validation:**
    
    *   Prisma → persistence-level constraints
        
    *   Zod/Joi → request-level validation (when applicable)
        

❌ No raw SQL unless explicitly justified❌ No secondary ORM or query builders

4\. API & Data Flow
-------------------

*   **API style:** Internal HTTP via route handlers
    
*   **Request flow (high-level):**
    
    1.  Request enters middleware
        
    2.  Session validated server-side
        
    3.  Route handler executes business logic
        
    4.  DB accessed via Prisma
        
    5.  Response returned (JSON / redirect)
        
*   **Client-server contract:**
    
    *   Client is untrusted
        
    *   Server is authoritative
        

5\. State & Side Effects
------------------------

*   **Client state:** UI-only (React state)
    
*   **Server state:**
    
    *   Database
        
    *   Sessions
        
*   **Side effects:**
    
    *   Must occur server-side
        
    *   Must be idempotent where possible
        

6\. Security Baselines
----------------------

*   CSRF protection where applicable
    
*   Secure cookies (httpOnly, secure, sameSite)
    
*   Principle of least privilege
    
*   Explicit allowlists over implicit access
    

Security > convenience, always.

7\. Code Organization
---------------------

*   Clear separation of concerns:
    
    *   lib/ → infrastructure & shared logic
        
    *   app/api/ → HTTP boundaries
        
    *   services/ → business logic (if/when introduced)
        
*   No business logic inside React components
    
*   No DB access inside middleware
    

8\. Branching & Workflow
------------------------

*   **Branching model:**
    
    *   One branch per issue
        
    *   Issues merge into epic branch
        
    *   Epic branches merge into main
        
*   **AI usage rule:**
    
    *   AI may generate code
        
    *   Human reviews for architectural compliance
        
    *   Violations must be corrected immediately
        

9\. Scope Discipline
--------------------

*   Each issue solves **only** its stated goal
    
*   No speculative features
    
*   No “helpful” expansions beyond acceptance criteria
    

10\. Change Policy
------------------

*   Changes to this document:
    
    *   Rare
        
    *   Intentional
        
    *   Explicitly documented
        

If it’s not written here, it’s not a rule.