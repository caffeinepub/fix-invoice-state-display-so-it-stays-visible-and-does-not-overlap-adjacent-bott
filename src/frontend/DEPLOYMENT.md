# GST Invoice Pro - Production Deployment Guide

This document provides a complete, step-by-step guide to deploy GST Invoice Pro to the Internet Computer mainnet using DFX.

## Prerequisites

Before deploying to production, ensure you have:

- **DFX CLI** installed (version 0.15.0 or later recommended)
- **Production canister IDs** for both backend and frontend
- **Admin access** to the backend canister (your DFX identity must be registered as admin)
- **Stripe API keys** (production secret key and allowed countries list)
- **Sufficient cycles** in your wallet for deployment and operation

## Safety Checks

Before proceeding with production deployment:

1. **Test locally first**: Ensure the application works correctly in your local development environment
2. **Backup current state**: Document current production canister IDs and configuration
3. **Verify identity**: Confirm you're using the correct DFX identity with admin permissions
4. **Check cycles balance**: Ensure canisters have sufficient cycles for deployment and operation

## Step 1: Identity Selection and Verification

### Select the Correct DFX Identity

List all available identities:
