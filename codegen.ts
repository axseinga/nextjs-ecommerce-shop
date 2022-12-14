import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-eu-west-2.hygraph.com/v2/cla4ant1k3ggm01ui9s8ge08e/master",
  documents: ["services/graphql/queries/*.graphql", "services/graphql/mutations/*.graphql"],
  generates: {
    "generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
