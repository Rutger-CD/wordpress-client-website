/**
 * Create Linear Issue for Database Sync Automation
 */

const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function createAutomationIssue() {
	console.log('📋 Creating Linear issue for Database Sync Automation...\n');

	try {
		const getProjectQuery = `
			query {
				projects(filter: { name: { contains: "WordPress" } }) {
					nodes {
						id
						name
						teams { nodes { id name } }
					}
				}
				workflowStates(filter: { name: { eq: "Todo" } }) {
					nodes { id name }
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

		console.log(`✓ Project: ${project.name}`);
		console.log(`✓ Team: ${team.name}`);
		console.log(`✓ State: ${todoState.name}\n`);

		// Create issue with variables to avoid escaping issues
		const mutation = `
			mutation CreateAutomationIssue($input: IssueCreateInput!) {
				issueCreate(input: $input) {
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

		const description = `## Overview

Automate the currently manual database synchronization workflow to reduce human error, save time, and improve reliability.

## Current Situation

**Manual Process** (CRA-23, CRA-24, CRA-25):
- Complete documentation (1100+ lines)
- Helper scripts for URL replacement, splitting, backup management
- Safety protocols and checklists
- Still requires manual phpMyAdmin operations (time-consuming)
- Multiple manual steps prone to human error

**Strato Hosting Constraints**:
- No SSH shell access (only SFTP)
- No WP-CLI command line access
- phpMyAdmin available (manual only)
- PHP/WordPress environment available

**Pain Points**:
1. Manual phpMyAdmin export/import is time-consuming (30+ minutes)
2. Multiple steps increase chance of errors
3. URL replacement requires downloading/uploading files
4. No one-click solution for developers
5. Difficult to schedule automated syncs

---

## Automation Options

### Option 1: WordPress Plugin (Recommended)

**Concept**: Custom WordPress plugin that handles database sync via admin interface

**Features**:
- One-click database export from production
- Automatic URL replacement (handles serialized data)
- One-click import to staging/development
- Built-in backup before sync
- Progress indicators and error handling
- Sync history and rollback capability

**Workflow**:
1. User clicks "Sync from Production" in WordPress admin (staging)
2. Plugin makes authenticated API call to production WordPress
3. Production exports database, uploads to secure temporary location
4. Staging downloads database export
5. Plugin runs URL replacement (serialized-safe)
6. Creates backup of current staging database
7. Imports production database
8. Updates URLs to staging
9. Verifies import success
10. Shows success/error message with rollback option

**Pros**:
- Works within Strato constraints (PHP-based)
- User-friendly admin interface
- No SSH/WP-CLI required
- Handles serialized data correctly
- Built-in safety (backups, verification)

**Cons**:
- Requires plugin development
- PHP execution time limits (large databases)
- Memory limits for large databases
- Needs secure authentication between environments

**Implementation Effort**: Medium (2-3 weeks)

---

### Option 2: Strato API Integration

**Concept**: Use Strato hosting API (if available) for database operations

**Action Required**: Research Strato API documentation

**Implementation Effort**: Low (if API exists) / Not possible (if no API)

---

### Option 3: Hosting Migration

**Concept**: Migrate to hosting provider with WP-CLI/SSH support

**Hosting Options**:
- Kinsta: Premium WordPress hosting, WP-CLI, SSH, automated backups
- WP Engine: Managed WordPress, WP-CLI, staging environments
- DigitalOcean: VPS with full control, WP-CLI, SSH
- Cloudways: Managed cloud hosting, WP-CLI, SSH

**Pros**:
- Full automation possible
- WP-CLI = reliable, tested tooling
- SSH access for debugging
- Better performance usually

**Cons**:
- Migration effort required
- Potential downtime during migration
- Higher hosting costs (usually)

**Implementation Effort**: High (4-6 weeks including migration, testing)

---

### Option 4: Hybrid - Scripts + WordPress REST API (Quick Win)

**Concept**: Custom WordPress REST API endpoints + Node.js orchestration scripts

**Approach**:
- WordPress plugin with REST API endpoints (export/import)
- Node.js orchestration script
- GitHub Actions workflow for automated sync
- Reuses existing helper scripts

**Pros**:
- Works within current Strato constraints
- Reuses existing URL replacement scripts
- Can be automated via GitHub Actions
- Moderate development effort

**Implementation Effort**: Medium (2-3 weeks)

---

## Recommended Approach

### Phase 1: Quick Win (2-3 weeks)
**Option 4 - Hybrid Approach**

Build minimal WordPress plugin with REST API endpoints + Node.js orchestration.

**Why**:
- Works within current Strato constraints
- Reuses existing helper scripts
- Can be automated via GitHub Actions
- Lower risk than full migration
- Faster to implement than full plugin

**Deliverables**:
- WordPress plugin with REST API endpoints (export/import)
- Node.js orchestration script
- GitHub Actions workflow for automated sync
- Updated documentation

### Phase 2: Polish (1-2 weeks)
**Enhance with Admin UI**

Add WordPress admin interface for manual triggering and monitoring.

---

## Implementation Plan

### Week 1: Foundation
- Research Strato API (if exists)
- Create WordPress plugin skeleton
- Implement database export endpoint
- Implement database import endpoint
- Add authentication layer

### Week 2: Orchestration
- Build Node.js orchestration script
- Integrate existing URL replacement logic
- Add backup functionality
- Implement error handling and rollback
- Add verification checks

### Week 3: Automation & Testing
- Create GitHub Actions workflow
- Test production → staging sync
- Test staging → production sync
- Document new automated workflow
- Update Linear issues CRA-23, CRA-24, CRA-25

### Week 4: Polish & Launch
- Add admin UI (optional but recommended)
- Implement sync history
- Add monitoring and notifications
- User acceptance testing
- Deploy to production

---

## Success Criteria

- One-click database sync (production → staging)
- One-click database sync (staging → production with approval)
- Automatic backups before sync
- URL replacement handles serialized data correctly
- Rollback capability on failure
- Sync completes in < 5 minutes for typical database size
- Zero manual phpMyAdmin steps required
- Detailed logging and error reporting
- Updated documentation

---

## Related Issues

- CRA-23: Database Sync: Production → Staging/Development (manual process documented)
- CRA-24: Database Sync: Staging → Production (manual process documented)
- CRA-25: Database Sync: Documentation & Testing (complete)

---

## Resources

- Current documentation: docs/DATABASE-SYNC.md
- Helper scripts: scripts/sql-url-replace.js, scripts/sql-split.js
- WordPress REST API: https://developer.wordpress.org/rest-api/
- WordPress Application Passwords: https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/

---

## Notes

- Current manual process is functional but time-consuming
- Automation will reduce sync time from ~30 minutes to ~5 minutes
- Will eliminate human error in URL replacement
- Consider this high-value improvement for developer experience
- ROI: High (saves time on every sync, reduces errors)

---

**Priority**: Medium (improves DX significantly)
**Effort**: Medium (2-3 weeks for hybrid approach)
**Impact**: High (reduces sync time by 80%, eliminates manual errors)
**Risk**: Low (can fall back to manual process if automation fails)`;

		const variables = {
			input: {
				teamId: team.id,
				projectId: project.id,
				stateId: todoState.id,
				title: "Automate Database Sync Workflow",
				description: description,
				priority: 2
			}
		};

		console.log('Creating automation issue...');
		const createResponse = await fetch(LINEAR_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${LINEAR_API_KEY}`
			},
			body: JSON.stringify({ query: mutation, variables })
		});

		const createData = await createResponse.json();

		if (createData.errors) {
			throw new Error(`Linear API error: ${JSON.stringify(createData.errors)}`);
		}

		const issue = createData.data.issueCreate.issue;

		console.log('\n✅ Database Sync Automation issue created successfully!\n');
		console.log('📊 Issue Details:');
		console.log(`   ID: ${issue.identifier}`);
		console.log(`   Title: ${issue.title}`);
		console.log(`   URL: ${issue.url}`);
		console.log(`   Priority: Medium (2)`);
		console.log(`   Status: Todo`);
		console.log('\n🎯 Recommended: Phase 1 - Hybrid Approach (WordPress REST API + Node.js)');
		console.log('   Estimated effort: 2-3 weeks');
		console.log('   Impact: Reduces sync time from 30min → 5min, eliminates manual errors');

	} catch (error) {
		console.error('❌ Error creating Linear issue:', error.message);
		process.exit(1);
	}
}

createAutomationIssue();
