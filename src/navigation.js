import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Steps',
      href: getPermalink('/#steps'),
    },
    {
      text: 'Features',
      href: getPermalink('/#features'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/#pricing'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/#features' },
        { text: 'Pricing', href: '/#pricing' },
        { text: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Company',
      links: [{ text: 'About', href: '/about' }],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/bsampera97' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/bernatsampera/astromvp' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline text-muted" href="https://bernatsampera.com/"> bernatsampera</a> · All rights reserved.
  `,
};
