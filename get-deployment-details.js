const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function getDeploymentDetails() {
  console.log('📋 Getting detailed deployment issue information...\n');

  const query = `
    query {
      issues(filter: {
        or: [
          { title: { containsIgnoreCase: "CI/CD Pipeline" } }
          { title: { containsIgnoreCase: "Production Deployment" } }
        ]
      }) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
            type
          }
          priority
          priorityLabel
          project {
            name
          }
          assignee {
            name
            email
          }
          comments {
            nodes {
              body
              createdAt
              user {
                name
              }
            }
          }
          attachments {
            nodes {
              title
              url
            }
          }
          createdAt
          updatedAt
          completedAt
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
      console.error('❌ Error:', data.errors);
      return;
    }

    const issues = data.data.issues.nodes.sort((a, b) =>
      a.identifier.localeCompare(b.identifier)
    );

    issues.forEach(issue => {
      console.log('='.repeat(80));
      console.log(`${issue.identifier}: ${issue.title}`);
      console.log('='.repeat(80));
      console.log(`Status: ${issue.state.name}`);
      console.log(`Priority: ${issue.priorityLabel || 'None'}`);
      console.log(`Completed: ${issue.completedAt ? new Date(issue.completedAt).toLocaleDateString() : 'Not completed'}`);

      console.log('\n📝 Description:');
      console.log(issue.description || 'No description');

      if (issue.comments.nodes.length > 0) {
        console.log('\n💬 Comments:');
        issue.comments.nodes.forEach(comment => {
          console.log(`\n   [${new Date(comment.createdAt).toLocaleDateString()}] ${comment.user.name}:`);
          console.log(`   ${comment.body.substring(0, 200)}${comment.body.length > 200 ? '...' : ''}`);
        });
      }

      console.log('\n');
    });

    console.log('='.repeat(80));
    console.log('🔍 Analysis:');
    console.log('='.repeat(80));
    console.log('\nBoth deployment issues (CRA-11 & CRA-12) are marked as Done.');
    console.log('This means the CI/CD pipeline and deployment workflows were designed/planned,');
    console.log('but we need to verify if they are actually implemented and functional.');
    console.log('\n💡 Next steps:');
    console.log('   1. Check if .github/workflows/ directory exists');
    console.log('   2. Verify staging server configuration');
    console.log('   3. Verify production server configuration');
    console.log('   4. Test the deployment pipeline');
    console.log('   5. Update Linear issues if implementation is incomplete');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getDeploymentDetails();
