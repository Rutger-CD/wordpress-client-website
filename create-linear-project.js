// Script to create Linear project structure for WordPress website
const API_KEY = 'lin_api_vpeoMlx9utiHtSeQp48Nflbgc3b02F4Z58i2exSR';
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(LINEAR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY
    },
    body: JSON.stringify({ query, variables })
  });

  const data = await response.json();

  if (data.errors) {
    console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
    throw new Error('GraphQL request failed');
  }

  return data.data;
}

async function getTeamId() {
  const query = `
    query {
      teams {
        nodes {
          id
          name
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  const team = data.teams.nodes[0];
  console.log(`✓ Using team: ${team.name} (${team.id})`);
  return team.id;
}

async function getWorkflowStates() {
  const query = `
    query {
      workflowStates {
        nodes {
          id
          name
          type
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.workflowStates.nodes;
}

async function createProject(teamId, name, description) {
  const mutation = `
    mutation($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        success
        project {
          id
          name
        }
      }
    }
  `;

  const data = await graphqlRequest(mutation, {
    input: {
      teamIds: [teamId],
      name: name,
      description: description
    }
  });
  console.log(`✓ Created project: ${data.projectCreate.project.name}`);
  return data.projectCreate.project.id;
}

async function createIssue(teamId, stateId, projectId, title, description, priority = 0) {
  const mutation = `
    mutation($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
          title
        }
      }
    }
  `;

  const data = await graphqlRequest(mutation, {
    input: {
      teamId: teamId,
      stateId: stateId,
      projectId: projectId,
      title: title,
      description: description,
      priority: priority
    }
  });
  console.log(`  ✓ Created issue: ${data.issueCreate.issue.identifier} - ${title}`);
  return data.issueCreate.issue;
}

async function main() {
  console.log('\n🚀 Creating WordPress Website Project in Linear\n');

  // Get team
  const teamId = await getTeamId();

  // Get workflow states
  const states = await getWorkflowStates();
  const todoState = states.find(s => s.type === 'unstarted');

  if (!todoState) {
    throw new Error('Could not find Todo state');
  }

  // Create main project
  const projectDescription = 'WordPress website met custom block theme, brand guide, UI library en CI/CD naar staging/productie';

  const projectId = await createProject(
    teamId,
    '🌐 WordPress Website - Klant Project',
    projectDescription
  );

  console.log('\n📋 Creating issues...\n');

  // Epic/Main issues
  const issues = [
    {
      title: '🎨 Brand Guide & Design System Setup',
      description: `
## Doel
Een complete brand guide en design system opzetten die als basis dient voor alle UI componenten.

## Taken
- [ ] Brand colors, typography, spacing definiëren
- [ ] Logo's en brand assets verzamelen
- [ ] Design tokens maken (CSS custom properties)
- [ ] Documentatie schrijven in Markdown
- [ ] Assets opslaan in \`/brand-guide\` directory

## Deliverables
- \`brand-guide/README.md\` - Complete brand guide documentatie
- \`brand-guide/colors.json\` - Color palette
- \`brand-guide/typography.json\` - Typography scale
- \`brand-guide/assets/\` - Logo's en brand assets

## Acceptatie Criteria
- Alle brand kleuren zijn gedocumenteerd met hex/rgb waarden
- Typography scale is gedefinieerd (heading sizes, body text)
- Assets zijn geoptimaliseerd voor web
      `.trim(),
      priority: 1
    },
    {
      title: '🧩 UI Component Library',
      description: `
## Doel
Een herbruikbare UI component library bouwen gebaseerd op de brand guide.

## Taken
- [ ] Component structuur opzetten (\`/components\`)
- [ ] Basis componenten maken (Button, Card, Header, Footer, etc.)
- [ ] Styling koppelen aan brand guide
- [ ] Component documentatie met voorbeelden
- [ ] Storybook of component preview pagina

## Componenten (minimum)
- Button (primary, secondary, outline varianten)
- Card
- Header/Navigation
- Footer
- Hero Section
- Content Section
- Form elementen (input, textarea, select)

## Deliverables
- \`/components\` directory met alle componenten
- CSS/SCSS bestanden gekoppeld aan design tokens
- Component usage documentatie

## Acceptatie Criteria
- Alle componenten gebruiken brand guide kleuren en typography
- Componenten zijn responsive
- Code is herbruikbaar en gedocumenteerd
      `.trim(),
      priority: 1
    },
    {
      title: '🏗️ WordPress Block Theme Foundation',
      description: `
## Doel
Een modern WordPress block theme opzetten met FSE (Full Site Editing) ondersteuning.

## Taken
- [ ] Theme directory structuur maken (\`/wp-content/themes/custom-theme\`)
- [ ] \`style.css\` met theme header
- [ ] \`theme.json\` configuratie (settings, styles, templates)
- [ ] Basis template parts (header, footer)
- [ ] Block patterns registreren
- [ ] Enqueue scripts en styles

## Theme Structuur
\`\`\`
wp-content/themes/custom-theme/
├── style.css
├── theme.json
├── functions.php
├── templates/
│   ├── index.html
│   ├── single.html
│   └── page.html
├── parts/
│   ├── header.html
│   └── footer.html
└── patterns/
    └── hero-section.php
\`\`\`

## Deliverables
- Werkend WordPress block theme
- \`theme.json\` met brand colors en typography
- Template parts voor header/footer
- Minimum 3 block patterns

## Acceptatie Criteria
- Theme activeert zonder errors
- FSE editor werkt correct
- Brand guide styling is toegepast
- Templates zijn responsive
      `.trim(),
      priority: 1
    },
    {
      title: '🎭 Custom WordPress Blocks',
      description: `
## Doel
Custom Gutenberg blocks maken die de UI component library gebruiken.

## Taken
- [ ] Block development environment opzetten
- [ ] Custom blocks maken voor elke UI component
- [ ] Block styling koppelen aan component library
- [ ] Block controls en attributes definiëren
- [ ] Block.json voor elke block

## Custom Blocks (minimum)
- Hero Block
- Content Section Block
- Card Grid Block
- Button Block
- CTA Section Block

## Deliverables
- \`/blocks\` directory met custom blocks
- Gecompileerde block assets (JS/CSS)
- Block registration in \`functions.php\`

## Acceptatie Criteria
- Blocks verschijnen in Gutenberg editor
- Blocks gebruiken UI component styling
- Blocks hebben editing controls (colors, spacing, etc.)
- Blocks zijn responsive
      `.trim(),
      priority: 2
    },
    {
      title: '📦 GitHub Repository Setup',
      description: `
## Doel
GitHub repository opzetten met branching strategy en CI/CD workflows.

## Taken
- [ ] Repository aanmaken op GitHub
- [ ] \`.gitignore\` configureren voor WordPress
- [ ] Branch protection rules instellen
- [ ] \`main\` branch voor productie
- [ ] \`develop\` branch voor staging
- [ ] README.md met project documentatie

## Branch Strategy
- \`main\` → Productie
- \`develop\` → Staging
- \`feature/*\` → Feature branches

## Deliverables
- GitHub repository
- Branch protection rules
- \`.gitignore\`
- \`README.md\`

## Acceptatie Criteria
- Repository is private (of public indien gewenst)
- Branch protection voorkomt direct push naar main
- README bevat setup instructies
      `.trim(),
      priority: 2
    },
    {
      title: '🚀 CI/CD Pipeline & Staging Deployment',
      description: `
## Doel
GitHub Actions workflow opzetten voor automatische deployment naar staging.

## Taken
- [ ] GitHub Actions workflow maken
- [ ] Staging server/hosting configureren
- [ ] FTP/SFTP of deployment scripts
- [ ] Environment variables instellen
- [ ] Deployment bij push naar \`develop\` branch
- [ ] Deployment notificaties (optioneel)

## Workflow
\`\`\`yaml
name: Deploy to Staging
on:
  push:
    branches: [develop]
jobs:
  deploy:
    - Checkout code
    - Deploy to staging server
    - Run tests (optioneel)
\`\`\`

## Deliverables
- \`.github/workflows/deploy-staging.yml\`
- Staging URL configuratie
- Deployment documentatie

## Acceptatie Criteria
- Push naar develop triggert automatische deployment
- Staging website is bereikbaar
- Deployment succesvol binnen 5 minuten
      `.trim(),
      priority: 2
    },
    {
      title: '✅ Production Deployment Workflow',
      description: `
## Doel
Production deployment workflow met handmatige goedkeuring.

## Taken
- [ ] Production server/hosting configureren
- [ ] GitHub Actions workflow voor productie
- [ ] Manual approval step toevoegen
- [ ] Database backup script
- [ ] Rollback strategie
- [ ] Production deployment checklist

## Workflow
\`\`\`yaml
name: Deploy to Production
on:
  workflow_dispatch:  # Manual trigger
jobs:
  deploy:
    - Manual approval required
    - Backup database
    - Deploy to production
    - Health check
\`\`\`

## Deliverables
- \`.github/workflows/deploy-production.yml\`
- Production URL configuratie
- Deployment checklist
- Rollback procedure

## Acceptatie Criteria
- Deployment vereist handmatige goedkeuring
- Database wordt gebackupt voor deployment
- Production website is bereikbaar
- Rollback procedure is gedocumenteerd
      `.trim(),
      priority: 3
    },
    {
      title: '📚 Documentation & Handover',
      description: `
## Doel
Complete documentatie voor klant en toekomstige developers.

## Taken
- [ ] README.md met project overview
- [ ] Setup instructies (local development)
- [ ] Deployment handleiding
- [ ] Brand guide gebruiksinstructies
- [ ] Component library documentatie
- [ ] WordPress admin handleiding voor klant

## Documentatie Onderdelen
- Development setup
- How to create new blocks
- How to use UI components
- Deployment process
- Troubleshooting guide
- Client admin guide

## Deliverables
- \`/docs\` directory met alle documentatie
- Video walkthrough (optioneel)
- Training sessie voor klant

## Acceptatie Criteria
- Developer kan project lokaal draaien met README instructies
- Klant begrijpt hoe WordPress admin te gebruiken
- Deployment proces is helder gedocumenteerd
      `.trim(),
      priority: 3
    }
  ];

  // Create all issues
  for (const issue of issues) {
    await createIssue(
      teamId,
      todoState.id,
      projectId,
      issue.title,
      issue.description,
      issue.priority
    );
  }

  console.log('\n✅ Project setup complete!\n');
  console.log('📊 Summary:');
  console.log(`   - Project: WordPress Website - Klant Project`);
  console.log(`   - Issues created: ${issues.length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Open Linear and review the project');
  console.log('   2. Assign issues to team members');
  console.log('   3. Start with brand guide setup\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
