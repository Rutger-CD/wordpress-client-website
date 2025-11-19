# GitHub Secrets Setup Guide

Complete instructies voor het configureren van GitHub Secrets voor automated deployment naar Strato hosting.

## Overzicht

GitHub Secrets worden gebruikt om gevoelige informatie (zoals passwords en API keys) veilig op te slaan en te gebruiken in GitHub Actions workflows zonder ze in de code te committen.

---

## Required Secrets

### Staging Secrets

Navigeer naar: **Repository → Settings → Secrets and variables → Actions → New repository secret**

#### 1. STAGING_SFTP_HOST
```
ssh.strato.com
```

#### 2. STAGING_SFTP_PORT
```
22
```

#### 3. STAGING_SFTP_USER
```
sftp_claude@craftdigital.nl
```

#### 4. STAGING_SFTP_PASSWORD
```
F53RRZer24!e5wNHB8u&
```

#### 5. STAGING_PATH
```
/STRATO-apps/wordpress_01/app
```

#### 6. STAGING_URL
```
https://wp-base-stg.rutgerthus.nl
```

#### 7. STAGING_DB_HOST
```
database-5019035203.webspace-host.com
```

#### 8. STAGING_DB_NAME
```
dbs14980737
```

#### 9. STAGING_DB_USER
```
dbu3367084
```

#### 10. STAGING_DB_PASSWORD
```
uwySL$&&PTXWZtBqaaU3
```

---

### Production Secrets

#### 11. PRODUCTION_SFTP_HOST
```
ssh.strato.com
```

#### 12. PRODUCTION_SFTP_PORT
```
22
```

#### 13. PRODUCTION_SFTP_USER
```
sftp_claude@craftdigital.nl
```

#### 14. PRODUCTION_SFTP_PASSWORD
```
F53RRZer24!e5wNHB8u&
```

#### 15. PRODUCTION_PATH
```
/STRATO-apps/wordpress_02/app
```

#### 16. PRODUCTION_URL
```
https://wp-base.rutgerthus.nl
```

#### 17. PRODUCTION_DB_HOST
```
database-5019035225.webspace-host.com
```

#### 18. PRODUCTION_DB_NAME
```
dbs14980753
```

#### 19. PRODUCTION_DB_USER
```
dbu1413266
```

#### 20. PRODUCTION_DB_PASSWORD
```
NHT@Cb6PPTc6vxgp#F*B
```

---

## Linear Integration (Optional)

Voor automatische updates in Linear:

#### 21. LINEAR_API_KEY
```
<your-linear-api-key-here>
```

---

## Step-by-Step Setup

### Stap 1: Open GitHub Repository Settings

1. Ga naar je GitHub repository
2. Klik op **Settings** (rechtsboven)
3. Klik in het linker menu op **Secrets and variables**
4. Klik op **Actions**

### Stap 2: Voeg Secrets Toe

Voor elk secret hierboven:

1. Klik op **New repository secret**
2. Vul de **Name** in (exact zoals hierboven, hoofdlettergevoelig!)
3. Kopieer de **Value** (let op speciale karakters!)
4. Klik **Add secret**

**Belangrijk:**
- Secret names zijn HOOFDLETTERGEVOELIG
- Controleer dubbel op typefouten in passwords
- Speciale karakters zoals `$`, `&`, `!` moeten exact overgenomen worden

### Stap 3: Verifieer Secrets

Na het toevoegen zie je een lijst zoals:

```
STAGING_SFTP_HOST          Updated now
STAGING_SFTP_PORT          Updated now
STAGING_SFTP_USER          Updated now
STAGING_SFTP_PASSWORD      Updated now
...
```

**Let op:** Je kunt de values niet meer zien na het opslaan (alleen bewerken/verwijderen)

---

## GitHub Actions Workflow Updates

De GitHub Actions workflows moeten worden aangepast om deze secrets te gebruiken:

### Deploy Staging Workflow

**File:** `.github/workflows/deploy-staging.yml`

```yaml
name: Deploy to Staging

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          npm install
          cd blocks && npm install

      - name: Build blocks
        run: cd blocks && npm run build

      - name: Deploy to Staging
        env:
          STAGING_SFTP_HOST: ${{ secrets.STAGING_SFTP_HOST }}
          STAGING_SFTP_PORT: ${{ secrets.STAGING_SFTP_PORT }}
          STAGING_SFTP_USER: ${{ secrets.STAGING_SFTP_USER }}
          STAGING_SFTP_PASSWORD: ${{ secrets.STAGING_SFTP_PASSWORD }}
          STAGING_PATH: ${{ secrets.STAGING_PATH }}
        run: |
          # Create .env file from secrets
          cat > .env << EOF
          STAGING_SFTP_HOST=${{ secrets.STAGING_SFTP_HOST }}
          STAGING_SFTP_PORT=${{ secrets.STAGING_SFTP_PORT }}
          STAGING_SFTP_USER=${{ secrets.STAGING_SFTP_USER }}
          STAGING_SFTP_PASSWORD=${{ secrets.STAGING_SFTP_PASSWORD }}
          STAGING_PATH=${{ secrets.STAGING_PATH }}
          STAGING_URL=${{ secrets.STAGING_URL }}
          EOF

          # Run deployment scripts
          node deploy-theme-staging.js
          node deploy-blocks-complete.js
```

### Deploy Production Workflow

**File:** `.github/workflows/deploy-production.yml`

```yaml
name: Deploy to Production

on:
  workflow_dispatch:  # Manual trigger only

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # Requires approval

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          npm install
          cd blocks && npm install

      - name: Build blocks
        run: cd blocks && npm run build

      - name: Deploy to Production
        env:
          PRODUCTION_SFTP_HOST: ${{ secrets.PRODUCTION_SFTP_HOST }}
          PRODUCTION_SFTP_PORT: ${{ secrets.PRODUCTION_SFTP_PORT }}
          PRODUCTION_SFTP_USER: ${{ secrets.PRODUCTION_SFTP_USER }}
          PRODUCTION_SFTP_PASSWORD: ${{ secrets.PRODUCTION_SFTP_PASSWORD }}
          PRODUCTION_PATH: ${{ secrets.PRODUCTION_PATH }}
        run: |
          # Create .env file from secrets
          cat > .env << EOF
          PRODUCTION_SFTP_HOST=${{ secrets.PRODUCTION_SFTP_HOST }}
          PRODUCTION_SFTP_PORT=${{ secrets.PRODUCTION_SFTP_PORT }}
          PRODUCTION_SFTP_USER=${{ secrets.PRODUCTION_SFTP_USER }}
          PRODUCTION_SFTP_PASSWORD=${{ secrets.PRODUCTION_SFTP_PASSWORD }}
          PRODUCTION_PATH=${{ secrets.PRODUCTION_PATH }}
          PRODUCTION_URL=${{ secrets.PRODUCTION_URL }}
          EOF

          # Run deployment scripts (aanpassen voor production)
          node deploy-theme-production.js
          node deploy-blocks-production.js
```

---

## Protected Environments

### Staging Environment

**Settings → Environments → New environment**

- Name: `staging`
- Protection rules: (optioneel)
  - Wait timer: 0 minutes
  - Required reviewers: Geen

### Production Environment

**Settings → Environments → New environment**

- Name: `production`
- Protection rules: **VERPLICHT**
  - ✅ Required reviewers: Minimaal 1 persoon
  - ✅ Wait timer: 5 minutes (optioneel, voor safety)
  - ✅ Deployment branches: Only `main` branch

---

## Testing Secrets

### Test via GitHub Actions

Maak een test workflow:

**`.github/workflows/test-secrets.yml`**

```yaml
name: Test Secrets

on: workflow_dispatch

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Test Staging Secrets
        run: |
          echo "SFTP Host: ${{ secrets.STAGING_SFTP_HOST }}"
          echo "SFTP Port: ${{ secrets.STAGING_SFTP_PORT }}"
          echo "SFTP User: ${{ secrets.STAGING_SFTP_USER }}"
          echo "Path: ${{ secrets.STAGING_PATH }}"
          # Password niet echoën!

      - name: Test Production Secrets
        run: |
          echo "SFTP Host: ${{ secrets.PRODUCTION_SFTP_HOST }}"
          echo "SFTP Port: ${{ secrets.PRODUCTION_SFTP_PORT }}"
          echo "SFTP User: ${{ secrets.PRODUCTION_SFTP_USER }}"
          echo "Path: ${{ secrets.PRODUCTION_PATH }}"
```

Run via: **Actions → Test Secrets → Run workflow**

---

## Security Best Practices

### ✅ DO:
- Gebruik altijd secrets voor credentials
- Roteer passwords regelmatig
- Gebruik verschillende passwords voor staging/production
- Test secrets in een safe environment eerst
- Documenteer welke secrets waar worden gebruikt

### ❌ DON'T:
- Commit `.env` file naar Git
- Echo/print secrets in logs
- Deel secrets via Slack/email
- Gebruik production credentials in staging
- Hard-code credentials in scripts

---

## Troubleshooting

### Secret niet beschikbaar in workflow

**Probleem:** `secrets.STAGING_SFTP_HOST` is undefined

**Oplossingen:**
1. Check secret name spelling (hoofdlettergevoelig!)
2. Verifieer secret bestaat in repository settings
3. Check of je in de juiste repository bent
4. Herstart workflow na het toevoegen van secrets

### Permission denied tijdens deployment

**Probleem:** SFTP login faalt

**Oplossingen:**
1. Verifieer SFTP credentials zijn correct
2. Test credentials handmatig via FileZilla/WinSCP
3. Check of IP niet geblokkeerd is door Strato
4. Verifieer username format is correct

### Speciale karakters in password

**Probleem:** Password met `$`, `&`, `!` werkt niet

**Oplossing:**
In GitHub Secrets: Kopieer exact zoals ze zijn (geen escaping nodig)
In `.env` file: Gebruik quotes als nodig:
```env
PASSWORD="uwySL$&&PTXWZtBqaaU3"
```

---

## Checklist

Gebruik deze checklist bij het setup:

- [ ] Alle 20 staging secrets toegevoegd
- [ ] Alle 20 production secrets toegevoegd
- [ ] Linear API key toegevoegd (optioneel)
- [ ] Secret names exact overgenomen (case-sensitive)
- [ ] Speciale karakters correct gekopieerd
- [ ] Test workflow uitgevoerd
- [ ] Protected environment geconfigureerd voor production
- [ ] GitHub Actions workflows geüpdatet
- [ ] `.env.example` bijgewerkt voor team members
- [ ] Documentatie gelezen door team

---

## Volgende Stappen

Na het configureren van secrets:

1. ✅ Update GitHub Actions workflows
2. ✅ Test deployment naar staging
3. ✅ Verifieer deployment werkt
4. ✅ Setup protected environment voor production
5. ✅ Document proces voor team

---

**Laatst bijgewerkt:** 18 November 2024
**Contact:** Development team voor vragen over credentials
