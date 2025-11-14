# Branch Protection Rules Setup

Deze instructies helpen je om branch protection rules in te stellen op GitHub voor het `wordpress-client-website` repository.

## 📋 Repository Info

- **Repository**: https://github.com/Rutger-CD/wordpress-client-website
- **Main Branch**: `main` (Productie)
- **Develop Branch**: `develop` (Staging)

---

## 🔒 Branch Protection voor `main`

### Stap 1: Ga naar Settings
1. Ga naar https://github.com/Rutger-CD/wordpress-client-website/settings
2. Klik op **Branches** in het linkermenu

### Stap 2: Add Branch Protection Rule
1. Klik op **Add branch protection rule**
2. Bij "Branch name pattern" vul in: `main`

### Stap 3: Configureer Protection Rules

**✅ Require a pull request before merging**
- Schakel **aan**
- **Require approvals**: 0 (of 1 indien je met een team werkt)
- **Dismiss stale pull request approvals when new commits are pushed**: AAN

**✅ Require status checks to pass before merging** (optioneel voor nu)
- Schakel **uit** (we activeren dit later bij CRA-11 met CI/CD)

**✅ Require conversation resolution before merging**
- Schakel **aan**

**✅ Require signed commits** (optioneel)
- Schakel **uit** (tenzij je signed commits wilt enforc en)

**✅ Require linear history**
- Schakel **aan** (voorkomt merge commits, alleen rebase/squash)

**✅ Do not allow bypassing the above settings**
- Schakel **aan**

**✅ Restrict who can push to matching branches**
- Schakel **UIT** (tenzij je met meerdere developers werkt)

**✅ Allow force pushes**
- Schakel **UIT** ❌ (NOOIT force push naar main!)

**✅ Allow deletions**
- Schakel **UIT** ❌ (voorkomt accidenteel verwijderen van main)

### Stap 4: Opslaan
- Klik op **Create** onderaan de pagina

---

## 🔒 Branch Protection voor `develop`

### Stap 1: Add Another Branch Protection Rule
1. Klik opnieuw op **Add branch protection rule**
2. Bij "Branch name pattern" vul in: `develop`

### Stap 2: Configureer Protection Rules

**✅ Require a pull request before merging**
- Schakel **aan**
- **Require approvals**: 0 (minder strikt dan main)

**✅ Require status checks to pass before merging**
- Schakel **UIT** voor nu (activeren bij CI/CD setup)

**✅ Require conversation resolution before merging**
- Schakel **aan**

**✅ Require linear history**
- Schakel **aan**

**✅ Do not allow bypassing the above settings**
- Schakel **UIT** (develop mag iets flexibeler zijn)

**✅ Allow force pushes**
- Schakel **UIT** ❌

**✅ Allow deletions**
- Schakel **UIT** ❌

### Stap 3: Opslaan
- Klik op **Create**

---

## 🌿 Branch Strategy Overzicht

```
main (protected)
  ↑
  │ PR + Review
  │
develop (protected)
  ↑
  │ PR
  │
feature/my-feature
bugfix/my-bugfix
hotfix/urgent-fix
```

### Workflow
1. **Feature development**: Create branch van `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```

2. **Work & commit**: Maak changes en commit
   ```bash
   git add .
   git commit -m "feat: Add new feature"
   ```

3. **Push & PR**: Push naar GitHub en maak Pull Request
   ```bash
   git push origin feature/my-feature
   ```
   - Maak PR naar `develop` branch
   - Review en merge

4. **Deploy to staging**: Merge naar `develop` triggert auto-deploy naar staging (later met CI/CD)

5. **Deploy to production**: PR van `develop` naar `main`
   - Manual review required
   - Merge triggert production deployment

---

## ✅ Verificatie

Na het instellen van branch protection rules, test het volgende:

### Test 1: Direct Push Blocked
```bash
git checkout main
echo "test" > test.txt
git add test.txt
git commit -m "test"
git push origin main
```
**Verwacht resultaat**: Push wordt geblokkeerd met error message

### Test 2: PR Workflow Works
```bash
git checkout develop
git checkout -b feature/test
echo "test" > test.txt
git add test.txt
git commit -m "feat: test feature"
git push origin feature/test
```
- Maak PR op GitHub naar `develop`
- PR zou moeten kunnen worden gemaakt
- Merge de PR
- **Verwacht resultaat**: PR merges successfully

### Test 3: Force Push Blocked
```bash
git checkout develop
git commit --amend -m "amended commit"
git push -f origin develop
```
**Verwacht resultaat**: Force push wordt geblokkeerd

---

## 🚨 Belangrijke Regels

### ❌ NOOIT Doen:
- Direct pushen naar `main` branch
- Force push naar `main` of `develop`
- Branch protection rules uitschakelen zonder overleg
- `main` of `develop` branches verwijderen

### ✅ ALTIJD Doen:
- Feature branches maken van `develop`
- Pull Requests gebruiken voor alle merges
- Code reviewen voor merge naar `main`
- Linear issues updaten bij merges

---

## 📊 Status Check (later met CI/CD)

Wanneer we CI/CD hebben opgezet (CRA-11), activeren we deze status checks:

**Voor `main`:**
- ✅ All tests pass
- ✅ Lighthouse score > 90
- ✅ No linting errors
- ✅ Build succeeds

**Voor `develop`:**
- ✅ Build succeeds
- ✅ No critical linting errors

---

## 🔐 Additional Security (optioneel)

### Enable Signed Commits
Als je signed commits wilt enforc en:

1. **Generate GPG key**:
   ```bash
   gpg --full-generate-key
   ```

2. **Add to GitHub**:
   - Copy GPG key: `gpg --armor --export YOUR_EMAIL`
   - Ga naar GitHub Settings → SSH and GPG keys
   - Add new GPG key

3. **Configure Git**:
   ```bash
   git config --global user.signingkey YOUR_KEY_ID
   git config --global commit.gpgsign true
   ```

4. **Enable in Branch Protection**:
   - Schakel "Require signed commits" aan

---

## 📝 Checklist

Na het instellen van branch protection:

- [ ] `main` branch protection rule actief
- [ ] `develop` branch protection rule actief
- [ ] Direct push naar `main` geblokkeerd
- [ ] Direct push naar `develop` geblokkeerd
- [ ] PR workflow getest en werkend
- [ ] Force push geblokkeerd
- [ ] Team members hebben juiste permissions
- [ ] Branch strategy gedocumenteerd

---

**Laatst bijgewerkt**: November 2024
**Versie**: 1.0.0
