# Specification

## Summary
**Goal:** Provide complete, copy/paste-ready production deployment documentation so a developer can reliably publish the current draft build to the Internet Computer mainnet using DFX, including verification and rollback guidance.

**Planned changes:**
- Update `frontend/DEPLOYMENT.md` with a complete sequence of commands to deploy to `--network ic` with no placeholders or truncated sections.
- Document production deployment steps including: selecting the correct DFX identity, ensuring correct production canister IDs, deploying backend canister and frontend assets, and confirming the app loads on mainnet.
- Add documentation for how an admin configures Stripe in production, including where/how to call the backend method that sets Stripe configuration and noting admin permissions are required.
- Add a post-deploy verification checklist covering: Internet Identity login/logout, landing page load, invoice creation + PDF export, pricing page checkout session creation, and payment success/failure routes.
- Add a high-level rollback/redeploy note describing how to redeploy a previous known-good build using DFX if publishing fails.

**User-visible outcome:** A developer can follow `frontend/DEPLOYMENT.md` to deploy the current build to IC mainnet, configure Stripe as an admin, verify key flows end-to-end, and recover via rollback/redeploy if needed.
