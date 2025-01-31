export enum NavLink {
  Root = '/',
  Platform = '/p',
  Posts = '/p/posts'
}

export const navItems = [
  { name: 'Write', link: NavLink.Platform },
  { name: 'Posts', link: NavLink.Posts }
];
