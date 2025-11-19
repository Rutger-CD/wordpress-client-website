const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function getPendingBlocks() {
  console.log('📋 Fetching pending block development issues from Linear...\n');

  try {
    // Query for issues related to block development
    const query = `
      query {
        issues(
          filter: {
            or: [
              { title: { contains: "block" } }
              { title: { contains: "Block" } }
              { description: { contains: "block" } }
            ]
          }
          orderBy: createdAt
        ) {
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

    const issues = data.data.issues.nodes;

    if (issues.length === 0) {
      console.log('✅ No pending block development issues found!\n');
      return;
    }

    console.log(`📊 Found ${issues.length} pending block-related issues:\n`);
    console.log('═'.repeat(80));

    // Group by state
    const byState = {};
    issues.forEach(issue => {
      const state = issue.state.name;
      if (!byState[state]) byState[state] = [];
      byState[state].push(issue);
    });

    // Display grouped by state
    for (const [state, stateIssues] of Object.entries(byState)) {
      console.log(`\n📌 ${state.toUpperCase()} (${stateIssues.length})`);
      console.log('─'.repeat(80));

      stateIssues.forEach(issue => {
        console.log(`\n${issue.identifier}: ${issue.title}`);
        console.log(`   Priority: ${issue.priorityLabel || 'None'} (${issue.priority})`);
        console.log(`   🔗 ${issue.url}`);

        if (issue.description) {
          // Extract first few lines of description
          const lines = issue.description.split('\n').slice(0, 3);
          console.log(`   📝 ${lines.join('\n      ')}`);
          if (issue.description.split('\n').length > 3) {
            console.log('      [...]');
          }
        }
      });
    }

    console.log('\n' + '═'.repeat(80));
    console.log(`\n📋 Total: ${issues.length} block-related issues\n`);

    // Look specifically for block creation tasks
    const blockCreationIssues = issues.filter(i =>
      i.title.toLowerCase().includes('create') ||
      i.title.toLowerCase().includes('develop') ||
      i.title.toLowerCase().includes('implement') ||
      i.title.toLowerCase().includes('add')
    );

    if (blockCreationIssues.length > 0) {
      console.log('🎨 Block Creation/Development Tasks:');
      console.log('─'.repeat(80));
      blockCreationIssues.forEach(issue => {
        console.log(`   • ${issue.identifier}: ${issue.title}`);
        console.log(`     ${issue.url}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

getPendingBlocks();
