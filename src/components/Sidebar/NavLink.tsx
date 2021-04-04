import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import Link from 'next/link'
import { ActiveLink } from "../ActiveLink";

interface INavLinkProps extends ChakraLinkProps {
  children: string;
  icon: IconType; // OR icon: ElementType do react
  href: string;
}

export function NavLink({children, icon, href, ...rest}: INavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}