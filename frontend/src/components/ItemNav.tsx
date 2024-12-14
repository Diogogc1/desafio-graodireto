import { Icon } from "@phosphor-icons/react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface ItemNavProps {
    Icon: Icon;
    href: Url;
    text: string;
}

export default function ItemNav(props: ItemNavProps) {
    return(
        <Link className="flex items-center sm:justify-start justify-center gap-2 p-2 border-2 border-white hover:bg-blue-500 rounded-lg" href={props.href}>
            <props.Icon className="sm:text-[32px] text-[28px]" color="#e3e3e3" weight="fill" />
            <p className="sm:block hidden">{props.text}</p>
        </Link>
    )
}