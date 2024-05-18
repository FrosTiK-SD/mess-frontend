"use client";

import { navbarSchema } from "@/config/Navbar";
import { Center, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { Icon123, IconQuestionMark } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export interface NavbarElementSchema {
  icon: typeof Icon123;
  label: string;
  path: string;
}

type NavbarElementProps = NavbarElementSchema & {
  active: boolean;
  onClick: () => void;
};
function NavbarElement({
  active,
  icon: Icon,
  label,
  onClick,
}: NavbarElementProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        className="flex h-[rem(50px)] w-[rem(50px)] items-center justify-center rounded-[var(--mantine-radius-md)] text-[light-dark(var(--mantine-color-gray-7),var(--mantine-color-dark-0))] hover:bg-[light-dark(var(--mantine-color-gray-0),var(--mantine-color-dark-5))] data-[active]:bg-[var(--mantine-color-grape-light)] data-[active]:text-[var(--mantine-color-grape-light-color)] data-[active]:hover:bg-[var(--mantine-color-grape-light)]"
        data-active={active || undefined}
        onClick={onClick}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Navbar() {
  const currentPath = usePathname();
  const router = useRouter();
  const elements: Array<React.ReactNode> = navbarSchema.map(
    (element, index) => (
      <NavbarElement
        key={element.path}
        {...element}
        active={element.path === currentPath}
        onClick={() => router.push(element.path)}
      />
    ),
  );
  return (
    <nav
      className={`flex w-[rem(80px)] flex-col border-r border-solid border-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))] p-1`}
    >
      <Center>
        <IconQuestionMark size={30} />
      </Center>
      <div>
        <div className="mt-[rem(50px)] flex grow flex-col items-center justify-center">
          {elements}
        </div>
      </div>
    </nav>
  );
}
