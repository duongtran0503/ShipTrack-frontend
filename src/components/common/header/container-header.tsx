
import HeaderContent from "@/components/common/header/header";
import type { RouteMetadataType } from "@/components/common/header/meta-data/type";
import type { NavItemType } from "@/components/common/sidebar/navigations/type";
import { useLocation } from "react-router-dom";
interface Props {
    metaRoutes: RouteMetadataType[]
    navItems: NavItemType[]
}
export default function ContainerHeader({ metaRoutes, navItems }: Props) {
    const location = useLocation()
    const pathname = location.pathname;

    console.log("Current pathname:", pathname);
    const metadataType: RouteMetadataType = metaRoutes.find((item) => item.href === pathname) || {
        href: pathname,
        title: "Trang quản trị",
        description: "Quản lý các hoạt động của cửa hàng và người bán."
    };
    return <HeaderContent title={metadataType.title} description={metadataType.description} navItems={navItems} />
}