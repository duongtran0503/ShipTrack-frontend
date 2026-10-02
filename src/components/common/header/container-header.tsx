'use client'

import HeaderContent from "@/components/common/header/header";
import { ADMIN_ROUTE_METADATA, type RouteMetadataType } from "@/components/common/header/meta-router";
import { useLocation } from "react-router-dom";

export default function ContainerHeader() {
    const location = useLocation()
    const pathname = location.pathname;

    console.log("Current pathname:", pathname);
    const metadataType: RouteMetadataType = ADMIN_ROUTE_METADATA.find((item) => item.href === pathname) || {
        href: pathname,
        title: "Trang quản trị",
        description: "Quản lý các hoạt động của cửa hàng và người bán."
    };
    return <HeaderContent title={metadataType.title} description={metadataType.description} />
}