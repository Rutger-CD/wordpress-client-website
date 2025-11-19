const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function createIssues() {
  console.log('Creating deployment issues in Linear...\n');

  try {
    // Get project and team
    const projectQuery = `
      query {
        projects(filter: { name: { contains: "WordPress" } }) {
          nodes {
            id
            name
            teams { nodes { id name } }
          }
        }
        workflowStates(filter: { name: { eq: "Backlog" } }) {
          nodes { id name team { id } }
        }
      }
    `;

    const projectRes = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': LINEAR_API_KEY
      },
      body: JSON.stringify({ query: projectQuery })
    });

    const projectData = await projectRes.json();
    if (projectData.errors) {
      console.error('Error:', projectData.errors);
      return;
    }

    const project = projectData.data.projects.nodes[0];
    const team = project.teams.nodes[0];
    const backlogState = projectData.data.workflowStates.nodes.find(
      s => s.team.id === team.id
    );

    console.log(`Project: ${project.name}`);
    console.log(`Team: ${team.name}\n`);

    // Define issues
    const issues = [
      {
        title: '🔧 Configureer Deployment Servers (Staging & Productie)',
        priority: 1,
        description: `Configureer staging en productie servers voor WordPress deployment.

TAKEN:
- Kies hosting provider
- Maak staging subdomain aan (staging.domein.nl)
- Maak productie domein aan (www.domein.nl)
- Configureer FTP/SFTP toegang voor beide
- Installeer WordPress op beide servers
- Configureer databases
- SSL certificaten installeren
- Test FTP verbindingen

SERVER VEREISTEN:
- PHP 8.0+
- MySQL 5.7+ of MariaDB 10.3+
- HTTPS/SSL enabled
- FTP/SFTP toegang
- WP-CLI (aanbevolen)

CREDENTIALS NODIG:
Voor staging en productie:
- FTP_SERVER, FTP_USERNAME, FTP_PASSWORD
- DB_HOST, DB_NAME, DB_USER, DB_PASSWORD

ACCEPTATIE:
- Beide servers bereikbaar via HTTPS
- FTP upload werkt
- WordPress admin toegankelijk
- Database connectie werkt

Zie: docs/DEPLOYMENT-GUIDE.md`
      },
      {
        title: '🔐 Configureer GitHub Secrets voor Deployment',
        priority: 1,
        description: `Configureer GitHub Secrets en Variables voor automatische deployment.

DEPENDENCIES: Vereist "Configureer Deployment Servers" voltooid

GITHUB SECRETS toevoegen (Settings → Secrets and variables → Actions):

Staging:
- STAGING_FTP_SERVER
- STAGING_FTP_USERNAME
- STAGING_FTP_PASSWORD
- STAGING_DB_HOST
- STAGING_DB_NAME
- STAGING_DB_USER
- STAGING_DB_PASSWORD

Production:
- PRODUCTION_FTP_SERVER
- PRODUCTION_FTP_USERNAME
- PRODUCTION_FTP_PASSWORD
- PRODUCTION_DB_HOST
- PRODUCTION_DB_NAME
- PRODUCTION_DB_USER
- PRODUCTION_DB_PASSWORD

GITHUB VARIABLES (Variables tab):
- STAGING_URL (https://staging.domein.nl)
- PRODUCTION_URL (https://www.domein.nl)

GITHUB ENVIRONMENTS (Settings → Environments):
- staging environment
- production environment met required reviewers

SECURITY:
- Sterke wachtwoorden gebruiken
- Bewaar credentials in wachtwoordmanager
- Verschillende credentials voor staging vs productie
- SFTP boven FTP gebruiken

Zie: docs/DEPLOYMENT-GUIDE.md - Configuratie Checklist`
      },
      {
        title: '🧪 Test Deployment Pipeline (Staging)',
        priority: 2,
        description: `Test volledige deployment pipeline naar staging.

DEPENDENCIES:
- Configureer Deployment Servers
- Configureer GitHub Secrets

TESTS:

1. AUTOMATISCHE DEPLOYMENT
- Wijzig homepage content
- Commit en push naar develop branch
- Monitor GitHub Actions workflow
- Verifieer deployment succesvol
- Check staging website voor wijziging

2. HANDMATIGE DEPLOYMENT
- GitHub Actions → Deploy to Staging
- Run workflow handmatig
- Verifieer success

3. STAGING VERIFICATIE
- Website bereikbaar via HTTPS
- Navigatie werkt
- Custom blocks worden getoond
- Styling correct
- Geen console errors
- WordPress admin werkt

4. BUILD VERIFICATIE
- Verifieer blocks/build/ directory bestaat
- Check alle block files aanwezig
- Verifieer .asset.php files

5. DATABASE MIGRATIE (optioneel)
- Export lokale database
- Upload naar staging
- Test content en URLs

ACCEPTATIE:
- Automatische deployment bij push naar develop
- Handmatige deployment via GitHub Actions
- Staging 100% functioneel
- Deployment < 5 minuten
- Alle blocks werkend

Troubleshooting: docs/DEPLOYMENT-GUIDE.md`
      },
      {
        title: '🚀 Test Production Deployment Pipeline',
        priority: 3,
        description: `Test productie deployment met safety features en rollback.

DEPENDENCIES: Staging deployment getest en stabiel

WAARSCHUWING: Test op acceptatie environment, NIET live client site!

PRE-DEPLOYMENT:
- Staging volledig getest
- Content/functionaliteit werkt op staging
- Backups aanwezig
- Rollback plan gedocumenteerd
- Deployment window gepland

DEPLOYMENT TEST:
1. Merge develop naar main
2. Push naar main
3. GitHub Actions → Deploy to Production
4. Type bevestiging: "deploy-to-production"
5. Monitor workflow (validation, checks, backup, deploy, health check)

VERIFICATIE:
- Homepage laadt correct
- Navigatie perfect
- Blocks werken
- Styling 100% correct
- Geen errors
- Mobile responsive
- Performance < 3 sec

ROLLBACK TEST:
- Deploy breaking change
- Verifieer website kapot
- Trigger rollback workflow
- Verifieer herstel succesvol

PERFORMANCE & SECURITY:
- Lighthouse audit (> 85 score)
- SSL certificate geldig
- Security headers
- Uptime monitoring

ACCEPTATIE:
- Handmatige approval werkt
- Pre-deployment checks blokkeren fouten
- Automatic backup
- Health checks detecteren issues
- Rollback binnen 5 minuten

Zie: docs/DEPLOYMENT-GUIDE.md - Production`
      },
      {
        title: '📚 Update Deployment Documentatie',
        priority: 4,
        description: `Update deployment docs met server config en lessons learned.

DEPENDENCIES: Alle deployment issues voltooid

UPDATE DOCS:

docs/DEPLOYMENT-GUIDE.md:
- Echte server URLs
- Screenshots workflows
- Troubleshooting issues
- Performance metrics
- Lessons learned

docs/TROUBLESHOOTING.md:
- Deployment issues
- FTP/SFTP problemen
- Database migration issues
- GitHub Actions failures

docs/CLIENT-PROJECT-WORKFLOW.md:
- Deployment sectie
- Staging review process
- Client approval workflow

NIEUWE DOCS:
- docs/SERVER-CONFIGURATION.md (server specs, PHP, DB, FTP, SSL)
- docs/DEPLOYMENT-RUNBOOK.md (procedures, rollback, contacts)

SCRIPTS:
- scripts/deploy-staging.sh
- scripts/deploy-production.sh
- scripts/sync-database.sh

TEMPLATES:
- templates/deployment-checklist.md
- templates/rollback-procedure.md

ACCEPTATIE:
- Documentatie compleet en accuraat
- Scripts tested en werkend
- Screenshots toegevoegd
- Nieuwe developers kunnen deployen met docs alleen`
      }
    ];

    // Create issues
    const created = [];
    for (const issue of issues) {
      const mutation = `
        mutation($input: IssueCreateInput!) {
          issueCreate(input: $input) {
            success
            issue { id identifier title url }
          }
        }
      `;

      const input = {
        title: issue.title,
        description: issue.description,
        teamId: team.id,
        projectId: project.id,
        stateId: backlogState.id,
        priority: issue.priority
      };

      const res = await fetch(LINEAR_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': LINEAR_API_KEY
        },
        body: JSON.stringify({ query: mutation, variables: { input } })
      });

      const data = await res.json();
      if (data.errors) {
        console.error(`Error creating "${issue.title}":`, data.errors);
        continue;
      }

      if (data.data.issueCreate.success) {
        const i = data.data.issueCreate.issue;
        created.push(i);
        console.log(`✅ ${i.identifier}: ${i.title}`);
        console.log(`   ${i.url}\n`);
      }
    }

    console.log('='.repeat(70));
    console.log(`\n✅ Created ${created.length} deployment issues\n`);
    console.log('Next steps:');
    console.log('1. Review issues in Linear');
    console.log('2. Start with: Configureer Deployment Servers');
    console.log('3. Then: Configureer GitHub Secrets');
    console.log('4. Test staging deployment');
    console.log('5. Test production deployment');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

createIssues();
