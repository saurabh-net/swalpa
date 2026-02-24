# SWALPA (Spoken Words And Language Practical Acquisition)

SWALPA is a **phonetic-only, Bangalore-functional** Kannada learning resource.
It is designed for non-Kannada speakers in Bangalore (IT professionals, migrants, etc.) who want to survive and thrive through spoken language without needing to learn the formal script.

The philosophy is simple: **"Speak first, read never."** We maximize ROI on high-frequency vocabulary necessary for daily life in Bangalore.

To view the live documentation, visit: [https://saurabh-net.github.io/swalpa](https://saurabh-net.github.io/swalpa)

## Development

This documentation site is built using **MkDocs** with the **Material for MkDocs** theme.

### Prerequisites

You need Python 3 installed. Then install the required packages:

```bash
pip install mkdocs-material
```

### Running Locally

To preview the documentation site locally with live-reloading:

```bash
mkdocs serve
```

This will host the site at `http://127.0.0.1:8000/`.

### Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch. 

To deploy manually:
```bash
mkdocs gh-deploy
```
