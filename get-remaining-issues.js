const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function getRemainingIssues() {
  const query = `
    query GetRemainingIssues {
      issues(
        filter: {
          state: { name: { nin: ["Done", "Canceled"] } }
        }
        orderBy: updatedAt
      ) {
        nodes {
          id
          identifier
          title
          priority
          priorityLabel
          state {
            name
            type
          }
          project {
            name
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': LINEAR_API_KEY
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Linear API error: ${JSON.stringify(data.errors)}`);
    }

    const issues = data.data.issues.nodes;

    console.log('\n📋 Remaining Issues (Not Done/Canceled)\n');

    if (issues.length === 0) {
      console.log('🎉 No remaining issues! All tasks are complete.\n');
      return;
    }

    // Group by state
    const grouped = issues.reduce((acc, issue) => {
      const state = issue.state.name;
      if (!acc[state]) acc[state] = [];
      acc[state].push(issue);
      return acc;
    }, {});

    Object.keys(grouped).forEach(state => {
      console.log(`\n${state}:`);
      grouped[state].forEach(issue => {
        const priorityIcon = {
          0: '🔵',
          1: '🟡',
          2: '🟠',
          3: '🔴',
          4: '⚫'
        }[issue.priority] || '⚪';

        console.log(`  ${priorityIcon} ${issue.identifier}: ${issue.title}`);
        console.log(`     Priority: ${issue.priorityLabel} (${issue.priority})`);
        console.log(`     Project: ${issue.project?.name || 'No project'}`);
        console.log('');
      });
    });

    // Summary
    console.log('\n📊 Summary:');
    console.log(`Total remaining issues: ${issues.length}`);
    Object.keys(grouped).forEach(state => {
      console.log(`  - ${state}: ${grouped[state].length} issues`);
    });

    return issues;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

getRemainingIssues();
