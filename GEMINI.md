# GEMINI (Private Context & Architecture)

**Welcome to the Extended Environment.** 🔐

This repository, **swalpa-private**, is the superset of the public **swalpa** project. It serves as the internal staging area and "brain" for the project.

## 🎯 Repository Role
While the public repo is for the static site, this private repo is for:
*   **Complete content mirroring**: All documentation from the public site.
*   **Extended Tooling**: Python scripts for data processing, flashcard generation, or scraping.
*   **Knowledge Bases**: Raw research, sensitive data, or "work in progress" content not yet ready for public consumption.
*   **Drafting**: New chapters or architectural changes are tested here first.

## 🏗️ Architecture (Extended)

### Directory Structure
*   `docs/`: Mirrored from public (Source of Truth for the site).
*   `mkdocs.yml`: Mirrored configuration.
*   `scripts/`: [Planned] Python scripts for language processing. DO NOT MIRROR THIS TO THE PUBLIC REPOSITORY.
*   `research/`: [Planned] Knowledge bases and raw data. DO NOT MIRROR THIS TO THE PUBLIC REPOSITORY.

### Configuration & State
*   **Git Identity**: Saurabh Maurya (saurabhmaurya06@gmail.com)
*   **Authentication**: SSH (id_ed25519) configured on this device.
*   **Remotes**:
    *   `origin`: `git@github.com:saurabh-net/swalpa-private.git` (Private)
    *   `public`: `https://github.com/saurabh-net/swalpa.git` (Public)

## 🛠️ Operational Workflow
1.  **Syncing**: Changes are typically developed here and then pushed to the public repo once finalized.
2.  **Scripts**: Any Python automation should reside in this repo.
3.  **Local Development**:
    *   `mkdocs serve` can be run using `/Users/saurabhmaurya/Library/Python/3.9/bin/mkdocs serve`.
    *   Dependencies are installed locally via `pip3 install mkdocs-material`.
4.  **Deployments**: The public repository handles the live site at [https://saurabh-net.github.io/swalpa/](https://saurabh-net.github.io/swalpa/).

## 🚦 Current Status (As of Feb 24, 2026)
*   **Migration Complete**: Initial content migrated from public repo.
*   **Settings Verified**: Public repo is hosting via Pages; private repo is restricted.
*   **Ready for Extension**: Infrastructure is set up for adding Python-based language tools.
