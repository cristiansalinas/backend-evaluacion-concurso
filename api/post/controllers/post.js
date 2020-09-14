'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const buildPost = async (posts) => {
  const response = [];
  for (const post of posts) {
    const { id, title, content, music_url, category } = post;
    console.log(strapi.services);
    const literaryReviews = await strapi.services['literary-review'].find({"post.id": id}, ['user', 'rating']);
    const musicalReviews = await strapi.services['musical-review'].find({"post.id": id}, ['user', 'rating1', 'rating2', 'rating3', 'rating4', 'rating5', 'rating6', 'rating7']);

    const newPost = {
      id,
      title,
      content,
      music_url,
      literaryReviews,
      musicalReviews,
      category
    };

    response.push(newPost);
  }


  return response;
};

module.exports = {
  async find(ctx) {
    let posts = await strapi.services.post.find();
    const response = await buildPost(posts);
    return response;
  },
};

