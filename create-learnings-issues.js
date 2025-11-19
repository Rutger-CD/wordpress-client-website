const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function createLearningsIssues() {
  console.log('📋 Creating Linear issues for deployment learnings...\n');

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
      console.error('GraphQL Errors:', JSON.stringify(projectData.errors, null, 2));
      return;
    }

    const project = projectData.data.projects.nodes[0];
    const team = project.teams.nodes[0];
    const backlogState = projectData.data.workflowStates.nodes.find(
      s => s.team.id === team.id
    );

    console.log(`✅ Project: ${project.name}`);
    console.log(`✅ Team: ${team.name}\n`);

    // Define learnings issues (tijdelijke workarounds en verbeteringen)
    const issues = [
      {
        title: '🔄 Re-enable linting in production deployment workflow',
        priority: 2,
        description: `Linting is tijdelijk uitgeschakeld in production-deploy.yml om deployment niet te blokkeren.

## Context
Tijdens de eerste productie deployment op 2025-11-19 moesten we linting uitschakelen omdat:
1. CSS linting faalde met 1000+ errors (indentation, color-hex-length, string-quotes, etc.)
2. Dit blokkeerde de productie deployment

## Huidige Status
- ⚠️ Linting volledig verwijderd in commit 442ef8a
- ✅ JavaScript linting errors zijn gefixed (line endings)
- ❌ CSS linting errors zijn NIET gefixed

## Taken
- [ ] Fix alle CSS linting errors met \`npm run lint:css -- --fix\`
- [ ] Test of alle blocks nog correct werken na CSS fixes
- [ ] Voeg linting toe als **optionele** pre-deployment check (mag falen zonder deployment te blokkeren)
- [ ] Overweeg stylelint config aan te passen voor minder strikte rules voor WordPress blocks
- [ ] Test volledige production deployment workflow met linting enabled
- [ ] Update documentatie met linting requirements

## Acceptatie Criteria
- [ ] CSS linting passed zonder errors
- [ ] Production deployment workflow heeft linting stap
- [ ] Linting failure blokkeert deployment NIET (alleen warning)
- [ ] Documentatie updated

## Technische Details
Workflow locatie: \`.github/workflows/production-deploy.yml\`

Huidige lint scripts in \`blocks/package.json\`:
\`\`\`json
"lint:css": "wp-scripts lint-style **/*.css --ignore-pattern node_modules --ignore-pattern build",
"lint:js": "wp-scripts lint-js */index.js */edit.js */save.js"
\`\`\`

## Related
- docs/PRODUCTION-DEPLOYMENT-LEARNINGS.md (sectie 2)
- Issue: "Fix CSS linting errors in all blocks"

## Impact
- **Code Quality**: Hogere code kwaliteit door vroege detectie van problemen
- **Developer Experience**: Duidelijke feedback over code style issues
- **Deployment Safety**: Extra validatie laag voor productie deployments`
      },
      {
        title: '🎨 Fix CSS linting errors in all blocks',
        priority: 2,
        description: `Alle blocks hebben CSS linting errors die moeten worden opgelost.

## Context
Tijdens productie deployment setup ontdekten we dat stylelint 1000+ errors rapporteert in de block CSS files.

## Error Types
1. **Indentation**: Verwacht tabs in plaats van spaces
2. **Color Hex Length**: Verwacht \`#fff\` in plaats van \`#ffffff\`
3. **String Quotes**: Verwacht dubbele quotes voor font families
4. **Value Keyword Case**: Font namen moeten lowercase zijn

## Affected Files
- \`blocks/button/editor.css\`
- \`blocks/card-grid/editor.css\`
- \`blocks/content-section/editor.css\`
- \`blocks/cta-section/editor.css\`
- \`blocks/hero/editor.css\`

## Oplossing
Run auto-fix commando:
\`\`\`bash
cd blocks
npm run lint:css -- --fix
\`\`\`

## Verificatie
Na de fix:
\`\`\`bash
cd blocks
npm run lint:css  # Should pass without errors
npm run build      # Ensure blocks still build
\`\`\`

Test in browser:
- [ ] Blocks hebben correcte styling in editor
- [ ] Blocks hebben correcte styling op frontend
- [ ] Geen visual regressions

## Acceptatie Criteria
- [ ] \`npm run lint:css\` passed zonder errors
- [ ] Alle blocks builden correct
- [ ] Visual testing passed (editor + frontend)
- [ ] Commit en push naar main

## Related
- docs/PRODUCTION-DEPLOYMENT-LEARNINGS.md (sectie 2)
- Issue: "Re-enable linting in production deployment workflow"`
      },
      {
        title: '🔧 Add repository variables for deployment URLs',
        priority: 3,
        description: `Deployment workflows gebruiken secrets voor URLs, maar deze zouden beter als repository variables kunnen.

## Context
Momenteel gebruiken we \`secrets.STAGING_URL\` en \`secrets.PRODUCTION_URL\` in de workflows, maar URLs zijn niet gevoelig en hoeven niet gemaskeerd te worden.

## Probleem
- URLs worden gemaskeerd in logs (onnodig)
- Moeilijker te debuggen omdat URLs niet zichtbaar zijn
- Secrets zijn bedoeld voor gevoelige data (passwords, API keys)
- Best practice: gebruik vars voor niet-gevoelige config

## Oplossing

### Stap 1: Maak Repository Variables
In GitHub Settings → Secrets and variables → Actions → Variables tab:
- \`STAGING_URL\`: https://wp-base-stg.rutgerthus.nl
- \`PRODUCTION_URL\`: https://wp-base.rutgerthus.nl

### Stap 2: Update Workflows
- \`.github/workflows/deploy-staging.yml\`
- \`.github/workflows/production-deploy.yml\`
- \`.github/workflows/rollback-production.yml\`

Change:
\`\`\`yaml
# Van:
\${{ secrets.STAGING_URL }}

# Naar:
\${{ vars.STAGING_URL }}
\`\`\`

### Stap 3: Test & Cleanup
- [ ] Test staging deployment
- [ ] Test production deployment
- [ ] Verwijder oude URL secrets (STAGING_URL, PRODUCTION_URL)

## Acceptatie Criteria
- [ ] Repository variables zijn aangemaakt
- [ ] Alle workflows gebruiken vars in plaats van secrets voor URLs
- [ ] URLs zijn zichtbaar in workflow logs
- [ ] Deployments werken nog steeds correct
- [ ] Oude URL secrets zijn verwijderd

## Impact
- **Debugging**: URLs zichtbaar in logs maakt debugging makkelijker
- **Best Practices**: Secrets alleen voor gevoelige data
- **Transparantie**: Duidelijker waar deployments naartoe gaan

## Related
- docs/PRODUCTION-DEPLOYMENT-LEARNINGS.md (sectie "Actiepunten", Issue 3)`
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
        console.error(`❌ Error creating "${issue.title}":`, data.errors);
        continue;
      }

      if (data.data.issueCreate.success) {
        const i = data.data.issueCreate.issue;
        created.push(i);
        console.log(`✅ ${i.identifier}: ${i.title}`);
        console.log(`   🔗 ${i.url}\n`);
      }
    }

    console.log('═'.repeat(70));
    console.log(`\n🎉 Created ${created.length}/${issues.length} learnings issues!\n`);

    if (created.length > 0) {
      console.log('📋 Summary:');
      console.log(`   Project: ${project.name}`);
      console.log(`   Team: ${team.name}`);
      console.log(`   State: ${backlogState.name}\n`);

      console.log('📝 Issues Created:');
      created.forEach(i => {
        console.log(`   • ${i.identifier}: ${i.title}`);
      });

      console.log('\n🔗 View in Linear:');
      console.log(`   ${created[0].url.split('/')[0]}//${created[0].url.split('/')[2]}/team/${team.id.split('-')[0]}`);
    }

    console.log('\n📚 Documentation:');
    console.log('   docs/PRODUCTION-DEPLOYMENT-LEARNINGS.md');
    console.log('   .gitattributes (already created)');

    console.log('\n✅ Deployment was successful!');
    console.log('   Theme: Client Website activated');
    console.log('   Blocks: All 5 blocks working');
    console.log('   URL: https://wp-base.rutgerthus.nl\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

createLearningsIssues();
