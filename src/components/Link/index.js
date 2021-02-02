/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import NextLink from 'next/link';

// import { Container } from './styles';

function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
