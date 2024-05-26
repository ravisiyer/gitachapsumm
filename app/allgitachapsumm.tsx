import { gql } from "@apollo/client";
import createApolloClient from "@/apolloClient";

// Ref: https://www.apollographql.com/blog/next-js-getting-started
export async function getAllChapters() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        allGitaChapters {
          nodes {
            id
            chapterNumber
            chapterSummary
            chapterSummaryHindi
            name
            nameTranslated
            versesCount
          }
        }
      }
    `,
  });

  return {
    allGitaChapters: data.allGitaChapters.nodes,
  };
}

async function AllGitaChaptersSummaries() {
  let data = await getAllChapters();
  let allGitaChapters = data.allGitaChapters;

  return (
    <div>
      <h2>Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश</h2>
      <p>
        Starter/test app. version without styling. Data source:
        https://gql.bhagavadgita.io/graphql. Data fetched using Apollo Client.
      </p>
      {allGitaChapters.map(
        (chapter: {
          id: number;
          chapterNumber: number;
          name: string;
          nameTranslated: string;
          chapterSummary: string;
          chapterSummaryHindi: string;
          versesCount: number;
        }) => (
          <div key={chapter.id}>
            <h3>{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name}`}</h3>
            <h4>English Summary</h4>
            <p>{chapter.chapterSummary}</p>
            <h4>हिन्दी सारांश</h4>
            <p>{chapter.chapterSummaryHindi}</p>
            <p>{`${chapter.versesCount} verses`}</p>
          </div>
        )
      )}
    </div>
  );
}
export default AllGitaChaptersSummaries;
