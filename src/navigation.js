import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/#pricing'),
    },
    {
      text: 'Projects',
      href: getPermalink('/#projects'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
};

export const footerData = {
  links: [
    { text: 'Services', href: getPermalink('/#services') },
    { text: 'Pricing', href: getPermalink('/#pricing') },
    { text: 'Projects', href: getPermalink('/#projects') },
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  socialLinks: [
    { text: 'Twitter', href: 'https://twitter.com/username' },
    { text: 'LinkedIn', href: 'https://linkedin.com/in/username' },
    { text: 'GitHub', href: 'https://github.com/username' },
  ],
};
