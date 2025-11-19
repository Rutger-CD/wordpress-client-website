const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function createCRA14() {
  console.log('📋 Creating CRA-14 in Linear - Local WordPress Development Environment...\n');

  try {
    // First, get the project and team info
    const getProjectQuery = `
      query {
        projects(filter: { name: { contains: "WordPress" } }) {
          nodes {
            id
            name
            teams {
              nodes {
                id
                name
              }
            }
          }
        }
        workflowStates(filter: { name: { eq: "Todo" } }) {
          nodes {
            id
            name
          }
        }
      }
    `;

    const getProjectResponse = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${LINEAR_API_KEY}`
      },
      body: JSON.stringify({ query: getProjectQuery })
    });

    const getProjectData = await getProjectResponse.json();

    if (getProjectData.errors) {
      throw new Error(`Linear API error: ${JSON.stringify(getProjectData.errors)}`);
    }

    const project = getProjectData.data.projects.nodes[0];
    const team = project.teams.nodes[0];
    const todoState = getProjectData.data.workflowStates.nodes.find(s => s.name === 'Todo');

    console.log(`✓ Project: ${project.name} (${project.id})`);
    console.log(`✓ Team: ${team.name} (${team.id})`);
    console.log(`✓ Todo State: ${todoState.name} (${todoState.id})\n`);

    // Create the issue
    const createIssueMutation = `
      mutation {
        issueCreate(input: {
          title: "🔧 Local WordPress Development Environment"
          description: "## Overview\\n\\nSetup complete local WordPress development environment met wp-env die seamless integreert met staging en production deployment workflow.\\n\\n## Workflow Design\\n\\n\`\`\`\\n┌──────────────────────┐\\n│ Local Development    │\\n│ (wp-env/Docker)      │\\n│ - Claude development │\\n│ - Live reload        │\\n│ - Database included  │\\n└──────────┬───────────┘\\n           │\\n           │ git push origin develop\\n           ▼\\n┌──────────────────────┐\\n│ Staging Server       │\\n│ (Auto-deploy)        │\\n│ - WordPress running  │\\n│ - Client preview     │\\n│ - QA testing         │\\n└──────────┬───────────┘\\n           │\\n           │ Manual approval + merge to main\\n           ▼\\n┌──────────────────────┐\\n│ Production Server    │\\n│ (Manual deploy)      │\\n│ - Live website       │\\n│ - Full backups       │\\n│ - Rollback enabled   │\\n└──────────────────────┘\\n\`\`\`\\n\\n## Deliverables\\n\\n### 1. .wp-env.json Configuration\\n\\n**File**: \`.wp-env.json\` (project root)\\n\\n\`\`\`json\\n{\\n  \\"core\\": \\"WordPress/WordPress#6.4\\",\\n  \\"phpVersion\\": \\"8.0\\",\\n  \\"themes\\": [\\n    \\".\\"\\n  ],\\n  \\"plugins\\": [],\\n  \\"port\\": 8888,\\n  \\"config\\": {\\n    \\"WP_DEBUG\\": true,\\n    \\"WP_DEBUG_LOG\\": true,\\n    \\"WP_DEBUG_DISPLAY\\": false,\\n    \\"SCRIPT_DEBUG\\": true\\n  }\\n}\\n\`\`\`\\n\\n**Features**:\\n- ✅ WordPress 6.4+\\n- ✅ PHP 8.0\\n- ✅ Theme auto-sync (current directory)\\n- ✅ Debug mode enabled\\n- ✅ Port 8888\\n\\n### 2. Block Development Workflow\\n\\n**Setup**:\\n\`\`\`bash\\n# Terminal 1: Start WordPress\\nwp-env start\\n\\n# Terminal 2: Watch mode for blocks\\ncd blocks\\nnpm start\\n\\n# Browser: WordPress editor\\nhttp://localhost:8888/wp-admin\\n\`\`\`\\n\\n**Features**:\\n- ✅ Live reload voor block changes\\n- ✅ Auto-rebuild on file save\\n- ✅ Direct visible in WordPress editor\\n\\n### 3. Database Management\\n\\n**Commands**:\\n\`\`\`bash\\n# Export database\\nwp-env run cli wp db export backup.sql\\n\\n# Import database\\nwp-env run cli wp db import backup.sql\\n\\n# Reset database (fresh install)\\nwp-env destroy\\nwp-env start\\n\\n# Search-replace URLs (staging → local)\\nwp-env run cli wp search-replace 'https://staging.url' 'http://localhost:8888'\\n\`\`\`\\n\\n### 4. Git Integration Workflow\\n\\n**Complete workflow**:\\n\`\`\`bash\\n# 1. Develop locally\\ngit checkout -b feature/my-feature\\n# ... develop in wp-env ...\\n\\n# 2. Commit & push\\ngit add .\\ngit commit -m \\"feat: my feature\\"\\ngit push origin feature/my-feature\\n\\n# 3. Create PR to develop\\n# GitHub → Pull Request\\n\\n# 4. Auto-deploy to staging\\n# (when merged to develop)\\n\\n# 5. Client approval on staging\\n\\n# 6. Merge to main → manual production deploy\\n\`\`\`\\n\\n### 5. Documentation Updates\\n\\n**Files to Update**:\\n\\n1. **SETUP.md**:\\n   - Add .wp-env.json setup section\\n   - Document wp-env commands\\n   - Add database sync instructions\\n   - Troubleshooting wp-env issues\\n\\n2. **README.md**:\\n   - Add local development quick start\\n   - Update workflow diagram\\n   - Add wp-env as recommended option\\n\\n3. **New: docs/LOCAL-DEVELOPMENT.md**:\\n   - Complete wp-env guide\\n   - Database management procedures\\n   - Content sync from staging\\n   - Troubleshooting guide\\n   - Best practices\\n\\n### 6. .gitignore Updates\\n\\n**Add**:\\n\`\`\`\\n# wp-env\\n.wp-env/\\n*.sql\\n*.sql.gz\\n\`\`\`\\n\\n## Implementation Checklist\\n\\n### Phase 1: Basic Setup (1-2 hours)\\n- [ ] Create .wp-env.json configuration\\n- [ ] Update .gitignore\\n- [ ] Test wp-env start/stop\\n- [ ] Verify theme loads in WordPress\\n- [ ] Test block development workflow\\n- [ ] Verify live reload works\\n\\n### Phase 2: Database Management (1 hour)\\n- [ ] Document database export/import\\n- [ ] Test database reset procedure\\n- [ ] Create sample database backup\\n- [ ] Document content sync from staging\\n- [ ] Test search-replace for URLs\\n\\n### Phase 3: Documentation (1-2 hours)\\n- [ ] Update SETUP.md with wp-env instructions\\n- [ ] Update README.md with workflow diagram\\n- [ ] Create docs/LOCAL-DEVELOPMENT.md\\n- [ ] Add troubleshooting section\\n- [ ] Update MAINTENANCE.md\\n\\n### Phase 4: Testing & Validation (1 hour)\\n- [ ] Test complete workflow (local → staging → production)\\n- [ ] Verify all 5 blocks work in wp-env\\n- [ ] Test database sync from staging\\n- [ ] Validate git workflow\\n- [ ] Test with fresh wp-env install\\n\\n### Phase 5: PR & Merge\\n- [ ] Create feature branch\\n- [ ] Commit all changes\\n- [ ] Create PR to develop\\n- [ ] Merge PR\\n- [ ] Update Linear issue to Done\\n\\n## Success Criteria\\n\\n**Local Development**:\\n- ✅ wp-env werkt out-of-the-box\\n- ✅ Theme auto-sync werkt\\n- ✅ Block live reload werkt\\n- ✅ Database management is eenvoudig\\n\\n**Workflow Integration**:\\n- ✅ Git workflow local → staging → production is duidelijk\\n- ✅ Auto-deploy naar staging werkt\\n- ✅ Manual deploy naar production werkt\\n\\n**Documentation**:\\n- ✅ Complete setup guide\\n- ✅ Database management procedures\\n- ✅ Troubleshooting guide\\n- ✅ Workflow diagram\\n\\n## Technical Requirements\\n\\n**Dependencies**:\\n- Node.js 18+\\n- npm\\n- Docker (voor wp-env)\\n- Git\\n\\n**WordPress**:\\n- WordPress 6.4+\\n- PHP 8.0+\\n- MySQL 8.0 (via Docker)\\n\\n## Timeline\\n\\n**Total**: ~4-6 hours\\n\\n**Breakdown**:\\n- Phase 1: 1-2 hours\\n- Phase 2: 1 hour\\n- Phase 3: 1-2 hours\\n- Phase 4: 1 hour\\n- Phase 5: 30 minutes\\n\\n## Priority & Effort\\n\\n**Priority**: High (enables efficient local development)\\n**Effort**: Medium (4-6 hours)\\n**Impact**: High (complete development workflow)\\n\\n## Related Issues\\n\\n- ✅ CRA-9: WordPress Blocks (Done)\\n- ✅ CRA-12: Production Deployment Workflow (Done)\\n- ✅ CRA-13: Documentation & Handover (Done)\\n\\n## Resources\\n\\n- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)\\n- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)\\n- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)"
          teamId: "${team.id}"
          projectId: "${project.id}"
          stateId: "${todoState.id}"
          priority: 2
        }) {
          success
          issue {
            id
            identifier
            title
            url
          }
        }
      }
    `;

    console.log('Creating CRA-14 issue...');
    const createResponse = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${LINEAR_API_KEY}`
      },
      body: JSON.stringify({ query: createIssueMutation })
    });

    const createData = await createResponse.json();

    if (createData.errors) {
      throw new Error(`Linear API error: ${JSON.stringify(createData.errors)}`);
    }

    const issue = createData.data.issueCreate.issue;
    console.log('✓ Issue created\n');

    console.log('✅ CRA-14 created successfully in Linear!\n');
    console.log('📊 Issue Details:');
    console.log(`   ID: ${issue.identifier}`);
    console.log(`   Title: ${issue.title}`);
    console.log(`   URL: ${issue.url}`);
    console.log(`   Priority: High (2)`);
    console.log(`   Status: Todo`);
    console.log('\n🎯 Ready to start implementation!');

  } catch (error) {
    console.error('❌ Error creating Linear issue:', error.message);
    throw error;
  }
}

createCRA14();
