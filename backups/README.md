# Database Backups

Deze folder bevat database backups voor alle environments.

## ⚠️ Belangrijk

- **NOOIT** commit backups naar Git!
- Backups staan in `.gitignore`
- Bewaar productie backups minimaal 30 dagen
- Pre-sync backups bewaren totdat sync succesvol is

## 📁 Bestandsnaamconventie

```
{environment}-backup-{date}-{time}.sql
{environment}-backup-BEFORE-SYNC-{date}-{time}.sql
```

### Voorbeelden:

```
production-backup-20250126.sql
production-backup-BEFORE-SYNC-20250126-1430.sql
staging-backup-20250126.sql
development-backup-20250126.sql
```

## 🗜️ Compressie

Voor lange-termijn opslag, comprimeer backups:

```bash
# Comprimeer
node ../scripts/database-backup-helper.js compress production-backup-20250126.sql

# Dit creëert:
production-backup-20250126.sql.gz  # 5-10x kleiner

# Decomprimeer wanneer nodig
node ../scripts/database-backup-helper.js decompress production-backup-20250126.sql.gz
```

## 📊 Backup Overzicht

Bekijk alle backups:

```bash
node ../scripts/database-backup-helper.js list
```

## 🧹 Opruimen Oude Backups

Verwijder backups ouder dan 30 dagen:

```bash
# Dry run (test zonder te verwijderen)
node ../scripts/database-backup-helper.js clean 30 --dry-run

# Echt verwijderen
node ../scripts/database-backup-helper.js clean 30
```

## 📝 Best Practices

### Productie Backups
- Maak ALTIJD een backup voor je production database wijzigt
- Bewaar minimaal 30 dagen
- Pre-sync backups bewaren totdat nieuwe versie stabiel is
- Comprimeer voor lange-termijn opslag

### Staging Backups
- Bewaar minimaal 14 dagen
- Backup voor elke production → staging sync

### Development Backups
- Optioneel, kun je altijd re-syncen vanaf production
- Gebruik voor experimentele wijzigingen

## 🔐 Security

- Backups bevatten gevoelige data (passwords, emails, etc.)
- Bewaar ALLEEN lokaal of in encrypted cloud storage
- Verwijder oude backups volgens retention policy
- Check regelmatig `.gitignore` om SQL bestanden te excluderen

## 💾 Opslag Locaties

### Lokaal (Development)
```
/backups/              # Deze folder (Git ignored)
```

### Alternatieve Opslag
- Google Drive (encrypted folder)
- Dropbox (encrypted)
- External HDD (voor kritieke backups)

## 🆘 Emergency Restore

Bij productie problemen:

1. **Vind laatste werkende backup**:
   ```bash
   node ../scripts/database-backup-helper.js list
   ```

2. **Decomprimeer indien nodig**:
   ```bash
   node ../scripts/database-backup-helper.js decompress production-backup-{date}.sql.gz
   ```

3. **Import via phpMyAdmin**:
   - Login Strato panel
   - Open phpMyAdmin voor production
   - Import → Choose file → Go

4. **Verify site werkt**

## 📚 Meer Info

- [Database Sync Guide](../docs/DATABASE-SYNC.md)
- [Troubleshooting](../docs/DATABASE-SYNC-TROUBLESHOOTING.md)
