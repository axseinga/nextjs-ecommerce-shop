import { InferGetStaticPropsType } from "next";
import { GetProductListResponse, Product } from "types";
import { ProductListItem } from "@/components/Product";
import { apolloClient } from "services/graphql/apolloClient";
import { gql } from "@apollo/client";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      {data?.products?.map((product: Product) => {
        return (
          <li key={product.slug} className="shadow-xl border-2">
            <ProductListItem
              data={{
                id: product.slug,
                title: product.title,
                thumbnailUrl: product.thumbnail.url,
                thumbnailAlt: product.title,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductListResponse>({
    query: gql`
      query GetProductsList {
        products {
          slug
          title
          thumbnail {
            url
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
