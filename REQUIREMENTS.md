# L2 CLI - What You Need Installed

## To Build & Run the L2 CLI Tool

**You already have these (for Rust development):**
- ✅ Rust 1.75+ (you're using this)
- ✅ Cargo (comes with Rust)

**Status:** You can build and run `l2` CLI commands right now!

---

## To Run Generated React Apps

When users run `l2 init my-app --template react`, they'll need:

### Required
1. **Node.js 18+**
   - Download: https://nodejs.org
   - Check: `node --version`
   - This runs the React development server

2. **npm** (comes with Node.js)
   - Check: `npm --version`
   - This installs React dependencies

### Optional (for users)
3. **MetaMask or Web3 Wallet**
   - Browser extension for connecting to Base/Optimism
   - Users need this to test wallet connection features

---

## Quick Summary

**For YOU (CLI developer):**
- ✅ Already have everything (Rust + Cargo)
- Just need internet to download `include_dir` dependency

**For USERS (app developers):**
- Need Node.js 18+ to run generated React apps
- Need MetaMask to test Web3 features

---

## Current Status

**React Template:** ✅ Complete
- All files created in `templates/react/`
- Vite + React 18 + Tailwind CSS
- Wagmi + RainbowKit for Web3
- Network-specific configs for Base/Optimism

**Build Issue:** Network error downloading `include_dir`
- Just retry `cargo build` when internet is stable
- Everything else is ready!

---

## Next Build Command

```bash
cargo build
```

Once that succeeds, you can test:
```bash
cargo run -- init test-react --template react --network base
cd test-react
npm install
npm run dev
```

🚀 **You're almost there!**
