// Script to check Linear issues and compare with what we've done
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

async function getDetailedIssues() {
  const query = `
    query {
      issues(first: 50) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
            type
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  // Filter for our specific issues
  return data.issues.nodes.filter(issue =>
    ['CRA-6', 'CRA-7', 'CRA-8'].includes(issue.identifier)
  );
}

async function main() {
  console.log('\n🔍 Checking Linear issues vs completed work...\n');

  const issues = await getDetailedIssues();

  for (const issue of issues) {
    console.log('='.repeat(80));
    console.log(`\n📋 ${issue.identifier}: ${issue.title}`);
    console.log(`Status: ${issue.state.name}\n`);
    console.log('DESCRIPTION FROM LINEAR:');
    console.log(issue.description);
    console.log('\n' + '='.repeat(80) + '\n');
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
