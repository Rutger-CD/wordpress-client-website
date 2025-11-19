const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function getBlockDetails() {
  console.log('🔍 Fetching details for CRA-9: Custom WordPress Blocks...\n');

  try {
    const query = `
      query {
        issue(id: "CRA-9") {
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
          comments {
            nodes {
              body
              createdAt
              user { name }
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

    const issue = data.data.issue;

    if (!issue) {
      console.log('❌ Issue CRA-9 not found. Let me try searching by identifier...\n');

      // Try alternative query
      const altQuery = `
        query {
          issues(filter: { identifier: { eq: "CRA-9" } }) {
            nodes {
              id
              identifier
              title
              description
              state { name type }
            }
          }
        }
      `;

      const altRes = await fetch(LINEAR_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': LINEAR_API_KEY
        },
        body: JSON.stringify({ query: altQuery })
      });

      const altData = await altRes.json();
      if (altData.errors) {
        console.error('❌ Alternative query errors:', JSON.stringify(altData.errors, null, 2));
        return;
      }

      if (altData.data.issues.nodes.length > 0) {
        const foundIssue = altData.data.issues.nodes[0];
        console.log(`✅ Found issue: ${foundIssue.identifier}: ${foundIssue.title}\n`);
        console.log('Description:');
        console.log('═'.repeat(80));
        console.log(foundIssue.description);
        console.log('═'.repeat(80));
      }
      return;
    }

    console.log(`📋 ${issue.identifier}: ${issue.title}`);
    console.log(`   State: ${issue.state.name}`);
    console.log(`   Priority: ${issue.priorityLabel}`);
    console.log(`   🔗 ${issue.url}\n`);

    console.log('Description:');
    console.log('═'.repeat(80));
    console.log(issue.description);
    console.log('═'.repeat(80));

    if (issue.comments.nodes.length > 0) {
      console.log('\n💬 Comments:');
      console.log('─'.repeat(80));
      issue.comments.nodes.forEach(comment => {
        console.log(`\n${comment.user.name} (${new Date(comment.createdAt).toLocaleDateString()}):`);
        console.log(comment.body);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

getBlockDetails();
