import { DataProvider } from '@refinedev/core';
import { sanityClient } from './client';
import { groq } from 'next-sanity';

export const blogDataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const query = groq`*[_type == $type] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      readingTime,
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug
      },
      tags,
      isFeatured
    }`;

    const data = await sanityClient.fetch(query, { type: resource });
    
    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const query = groq`*[_type == $type && _id == $id][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      publishedAt,
      readingTime,
      tableOfContents,
      seoTitle,
      seoDescription,
      author->{
        name,
        slug,
        image,
        bio
      },
      categories[]->{
        title,
        slug
      },
      tags,
      isFeatured
    }`;

    const data = await sanityClient.fetch(query, { type: resource, id });
    
    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const query = groq`*[_type == $type && _id in $ids] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      readingTime,
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug
      },
      tags,
      isFeatured
    }`;

    const data = await sanityClient.fetch(query, { type: resource, ids });
    
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    throw new Error('Create operation not implemented for Sanity');
  },

  update: async ({ resource, id, variables }) => {
    throw new Error('Update operation not implemented for Sanity');
  },

  deleteOne: async ({ resource, id }) => {
    throw new Error('Delete operation not implemented for Sanity');
  },

  getApiUrl: () => {
    return '';
  },
};