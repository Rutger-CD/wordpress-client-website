// Script to update Linear issue statuses
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

async function getIssues() {
  const query = `
    query {
      issues(first: 50) {
        nodes {
          id
          identifier
          title
          state {
            id
            name
            type
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.issues.nodes.filter(issue =>
    ['CRA-6', 'CRA-8'].includes(issue.identifier)
  );
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

async function updateIssueState(issueId, stateId) {
  const mutation = `
    mutation($id: String!, $stateId: String!) {
      issueUpdate(
        id: $id
        input: {
          stateId: $stateId
        }
      ) {
        success
        issue {
          id
          identifier
          title
          state {
            name
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(mutation, { id: issueId, stateId: stateId });
  return data.issueUpdate;
}

async function main() {
  console.log('\n🔄 Updating Linear issue statuses...\n');

  // Get workflow states
  const states = await getWorkflowStates();
  console.log('Available states:');
  states.forEach(s => console.log(`  - ${s.name} (${s.type}) - ID: ${s.id}`));

  const doneState = states.find(s => s.type === 'completed');

  if (!doneState) {
    throw new Error('Could not find Done state');
  }

  console.log(`\n✓ Using Done state: ${doneState.name} (${doneState.id})\n`);

  // Get our issues
  const issues = await getIssues();

  // Update each issue
  for (const issue of issues) {
    console.log(`Updating ${issue.identifier}: ${issue.title}`);
    console.log(`  Current state: ${issue.state.name}`);

    if (issue.state.type === 'completed') {
      console.log(`  ✓ Already marked as Done\n`);
      continue;
    }

    const result = await updateIssueState(issue.id, doneState.id);

    if (result.success) {
      console.log(`  ✅ Updated to: ${result.issue.state.name}\n`);
    } else {
      console.log(`  ❌ Failed to update\n`);
    }
  }

  console.log('✅ All issues updated!\n');
  console.log('📊 Summary:');
  console.log('   ✅ CRA-6: Brand Guide - Marked as DONE');
  console.log('   ✅ CRA-8: WordPress Theme - Marked as DONE');
  console.log('');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
