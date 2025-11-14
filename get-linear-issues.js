// Script to fetch Linear issues
const API_KEY = 'lin_api_vpeoMlx9utiHtSeQp48Nflbgc3b02F4Z58i2exSR';
const LINEAR_API_URL = 'https://api.linear.app/graphql';

const query = `
  query {
    issues(
      filter: {
        state: { type: { nin: ["completed", "canceled"] } }
      }
    ) {
      nodes {
        id
        identifier
        title
        description
        priority
        state {
          name
          type
        }
        assignee {
          name
          email
        }
        createdAt
        updatedAt
      }
    }
  }
`;

fetch(LINEAR_API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      process.exit(1);
    }

    const issues = data.data.issues.nodes;
    console.log(`\n✓ Gevonden: ${issues.length} openstaande issues\n`);

    issues.forEach(issue => {
      console.log(`[${issue.identifier}] ${issue.title}`);
      console.log(`  Status: ${issue.state.name}`);
      if (issue.assignee) {
        console.log(`  Toegewezen aan: ${issue.assignee.name}`);
      }
      console.log(`  Prioriteit: ${issue.priority || 'Geen'}`);
      console.log('');
    });
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
