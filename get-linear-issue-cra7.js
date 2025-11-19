// Get CRA-7 issue details from Linear
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

async function getProjectAndIssue() {
  // Get project first (following guardrails!)
  const projectQuery = `
    query {
      projects(filter: { name: { eq: "🌐 WordPress Website - Klant Project" } }) {
        nodes {
          id
          name
        }
      }
    }
  `;

  const projectData = await graphqlRequest(projectQuery);
  const project = projectData.projects.nodes[0];

  console.log(`✓ Project: ${project.name}`);

  // Get issue within project scope
  const issueQuery = `
    query {
      issues(filter: {
        project: { id: { eq: "${project.id}" } }
      }) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
          }
        }
      }
    }
  `;

  const issueData = await graphqlRequest(issueQuery);
  const issue = issueData.issues.nodes.find(i => i.identifier === 'CRA-7');

  return { project, issue };
}

async function main() {
  console.log('\n📋 Getting CRA-7 Issue Details...\n');

  const { project, issue } = await getProjectAndIssue();

  if (!issue) {
    throw new Error('CRA-7 not found in project!');
  }

  console.log('='.repeat(80));
  console.log(`\n${issue.identifier}: ${issue.title}`);
  console.log(`Status: ${issue.state.name}\n`);
  console.log('DESCRIPTION:');
  console.log(issue.description);
  console.log('\n' + '='.repeat(80) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
