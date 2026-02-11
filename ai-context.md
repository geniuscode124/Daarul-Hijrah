SYSTEM CONTEXT — DO NOT RE-ARCHITECT
------------------------------------

This document defines **non-negotiable architectural decisions** for this project.All implementations must conform to this context.Do **not** suggest alternative stacks or redesign core choices.

1\. Project Overview
--------------------

This is a **Madrasah education platform** delivered as a **Progressive Web App (PWA)**, focused on:

*   Lecture delivery (online + offline)
    
*   Structured memorisation of classical texts (mutoon)
    
*   Musaabaqah (memorisation competitions)
    
*   Q/A between students and teachers
    
*   Strong role governance and trust
    

The platform is **admin-governed**, not open-ended or social-media-like.

2\. Technology Stack (FIXED)
----------------------------

### Frontend

*   **Next.js (App Router)**
    
*   React (Server + Client Components)
    
*   PWA with Service Workers
    

### Backend

*   **Next.js API routes only**
    
*   No Express, no separate backend service
    

### Database

*   **PostgreSQL**
    
*   **Prisma ORM**
    

### Authentication

*   **Server-side sessions**
    
*   Sessions stored in database
    
*   **HTTP-only, Secure cookies**
    
*   No JWTs
    
*   No localStorage auth
    
*   No third-party auth providers
    

### Storage

*   **Object storage** (e.g. S3-compatible) for audio files
    
*   PostgreSQL stores **metadata only**
    
*   **Never store large blobs in PostgreSQL**
    

3\. User Roles (STRICT)
-----------------------

Roles are fixed and enforced server-side:

*   STUDENT
    
*   TEACHER
    
*   ADMIN
    

Rules:

*   Only **STUDENTS** can sign up
    
*   TEACHER and ADMIN accounts are created manually
    
*   Roles cannot be chosen or modified by clients
    
*   Role checks are enforced server-side only
    

4\. PWA & Offline Model (IMPORTANT)
-----------------------------------

This is an **offline-first app**, but with strict boundaries.

### IndexedDB is used ONLY for:

*   Offline audio storage
    
*   Draft recordings
    
*   Playback state (timestamps, speed, iterations)
    
*   Temporary upload queues
    
*   Cached lecture content
    

IndexedDB is:

*   **Client-side only**
    
*   **Not authoritative**
    
*   **Never synced bidirectionally**
    
*   **Never treated as a replacement for PostgreSQL**
    

### Online-only responsibilities:

*   Authentication
    
*   Authorization
    
*   Role checks
    
*   Metadata persistence
    
*   Publishing content
    
*   Musaabaqah rules
    
*   Q/A system
    

5\. Audio Architecture (NON-NEGOTIABLE)
---------------------------------------

*   Teachers may record audio **offline**
    
*   Audio is stored locally until online
    
*   Uploads use **signed URLs**
    
*   API routes handle metadata only
    
*   Audio playback supports:
    
    *   Start/end timestamps
        
    *   Loop count
        
    *   Playback speed
        
    *   Segment-based memorisation
        
    *   Text highlighting (by segment ID)
        

6\. Design Principles
---------------------

All implementations must follow these principles:

*   **Security over convenience**
    
*   **Explicit over magical**
    
*   **Server-side authority**
    
*   **Simple over clever**
    
*   **Evolvable, not speculative**
    

Avoid:

*   Over-engineering
    
*   Premature abstractions
    
*   Hidden coupling
    
*   “Future-proofing” beyond stated needs
    

7\. Explicitly Forbidden
------------------------

Do NOT:

*   Introduce JWT authentication
    
*   Store auth data in localStorage
    
*   Add Firebase / Supabase / Clerk / Auth0
    
*   Upload large files through API routes
    
*   Store audio blobs in PostgreSQL
    
*   Sync IndexedDB bidirectionally
    
*   Trust client-provided role data
    
*   Implement social features beyond scope
    

8\. How to Respond to Prompts
-----------------------------

When implementing a feature:

*   Assume prior features exist and are correct
    
*   Treat this work as an **incremental addition**
    
*   Do not rewrite unrelated code
    
*   If assumptions are required, state them explicitly
    
*   If tradeoffs exist, explain them
    

9\. Change Policy
-----------------

If a requirement appears to conflict with this context:

*   Call it out explicitly
    
*   Do NOT silently change architecture
    
*   Ask for clarification instead