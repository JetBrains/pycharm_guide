import React, { FC } from 'react';
import { graphql } from 'gatsby';

import ReferenceLayout from 'gatsby-theme-bulmaio/src/components/layout/ReferenceLayout';
import { PageContext } from '../../components/models';
import ResourceCard from '../../components/resourcecard/ResourceCard';
import Pagination from '../../components/Pagination';
import { TipResource } from './models';

interface AllTipProps {
  data: {
    allTip: {
      nodes: TipResource[]
    }
  }
  pageContext: PageContext
}

const PAGE_TITLE = 'Tips';
const SUBTITLE = 'Visual, standalone, bite-sized learning resources organized into different categories.';

const AllTip: FC<AllTipProps> = (
  {
    data: { allTip: { nodes } },
    pageContext: { numPages }
  }) => {

  const listing = (
    <div>
      {nodes && nodes.map(resource => (
          <ResourceCard
            key={resource.slug}
            thumbnail={resource.thumbnail}
            media={{ href: resource.slug, title: resource.title, subtitle: resource.subtitle }}
            products={{ items: resource.products }}
            technologies={{ items: resource.technologies }}
            topics={{ items: resource.topics }}
            date={{ date: resource.date }}
            author={{ thumbnail: resource.author.thumbnail, slug: resource.author.slug, title: resource.author.title }}
          />
        )
      )}
    </div>
  );

  return (
    <ReferenceLayout
      pageTitle={PAGE_TITLE}
      subtitle={SUBTITLE}
    >
      {{
        listing: (
          <>
            {listing}
            <Pagination numPages={numPages} prefix={'tips'} />
          </>
        )
      }}
    </ReferenceLayout>
  );
};

// noinspection JSUnusedGlobalSymbols
export default AllTip;

// noinspection JSUnusedGlobalSymbols
export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allTip(limit: $limit, skip: $skip, sort: {fields: [title]}) {
      nodes {
        ...ListedTipFragment
      }
    }
  }
`;
