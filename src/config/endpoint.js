const RESOURCES = {
  users: 'users',
  posts: 'posts',
  signatures: 'signatures',
  friends: 'friends',
  bookmarks: 'bookmarks',
};

export const ENDPOINT = {
  users: {
    index: `${RESOURCES.users}`,
    register: `${RESOURCES.users}/register`,
    login: `${RESOURCES.users}/login`,
    logout: `${RESOURCES.users}/logout`,
    changePassword: `${RESOURCES.users}/change-password`,
    search: `${RESOURCES.users}/search`,
  },
  posts: {
    index: `${RESOURCES.posts}`,
    public: `${RESOURCES.posts}/public`,
    recommend: `${RESOURCES.posts}/recommend`,
    recyclebin: `${RESOURCES.posts}/recyclebin`,
    tags: `${RESOURCES.posts}/tags`,
    draft: `${RESOURCES.posts}/draft`,
    comments: `${RESOURCES.posts}/comments`,
    info: `${RESOURCES.posts}/info`,
  },
  signatures: {
    index: `${RESOURCES.signatures}`,
  },
  friends: {
    index: `${RESOURCES.friends}`,
    follow: `${RESOURCES.friends}/follow`,
  },
  bookmarks: {
    index: `${RESOURCES.bookmarks}`,
  },
};
