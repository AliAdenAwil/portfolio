# Official Playwright image — has Chromium, Firefox, and WebKit pre-installed.
# Using a pinned version so tests are reproducible across machines.
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Install dependencies first (layer cached until package.json changes)
COPY package*.json ./
RUN npm install

# Copy portfolio source
COPY . .
