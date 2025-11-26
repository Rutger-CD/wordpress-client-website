/**
 * Get All Pending Issues from Linear
 */

const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function getAllPendingIssues() {
  console.log('📋 Fetching all pending issues from WordPress project...\n');

  try {
    const query = `
      query {
        projects(filter: { name: { contains: "WordPress" } }) {
          nodes {
            id
            name
            issues {
              nodes {
                id
                identifier
                title
                description
                state { name type }
                priority
                priorityLabel
                url
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    `;

    const res = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': LINEAR_API_KEY
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    if (data.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      return;
    }

    const project = data.data.projects.nodes[0];
    const issues = project.issues.nodes;

    console.log(`📊 Project: ${project.name}`);
    console.log(`📊 Total issues: ${issues.length}\n`);
    console.log('═'.repeat(80));

    // Group by state
    const byState = {};
    issues.forEach(issue => {
      const state = issue.state.name;
      if (!byState[state]) byState[state] = [];
      byState[state].push(issue);
    });

    // Display grouped by state
    for (const [state, stateIssues] of Object.entries(byState).sort()) {
      console.log(`\n📌 ${state.toUpperCase()} (${stateIssues.length})`);
      console.log('─'.repeat(80));

      stateIssues.sort((a, b) => {
        // Sort by priority (1 = highest)
        if (a.priority !== b.priority) return a.priority - b.priority;
        // Then by identifier
        return a.identifier.localeCompare(b.identifier);
      }).forEach(issue => {
        console.log(`\n${issue.identifier}: ${issue.title}`);
        console.log(`   Priority: ${issue.priorityLabel || 'None'} (${issue.priority})`);
        console.log(`   🔗 ${issue.url}`);
      });
    }

    console.log('\n' + '═'.repeat(80));

    // Summary by state
    console.log('\n📊 Summary by State:');
    for (const [state, stateIssues] of Object.entries(byState).sort()) {
      console.log(`   ${state}: ${stateIssues.length} issues`);
    }

    // Critical issues
    const todo = byState['Todo'] || [];
    const backlog = byState['Backlog'] || [];
    const inProgress = byState['In Progress'] || [];
    const inReview = byState['In Review'] || [];

    const pending = [...todo, ...backlog, ...inProgress, ...inReview];

    if (pending.length > 0) {
      console.log('\n⚠️  Issues that need attention before using as template:');
      console.log('─'.repeat(80));

      const critical = pending.filter(i => i.priority <= 2); // High and Urgent
      const normal = pending.filter(i => i.priority > 2);

      if (critical.length > 0) {
        console.log('\n🔴 CRITICAL (High/Urgent priority):');
        critical.forEach(i => {
          console.log(`   • ${i.identifier}: ${i.title} [${i.state.name}]`);
        });
      }

      if (normal.length > 0) {
        console.log('\n🟡 NORMAL (Medium/Low priority):');
        normal.forEach(i => {
          console.log(`   • ${i.identifier}: ${i.title} [${i.state.name}]`);
        });
      }
    } else {
      console.log('\n✅ No pending issues - ready to use as template!');
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

getAllPendingIssues();
