import ContainerHeader from "@/components/common/header/container-header";
import type { RouteMetadataType } from "@/components/common/header/meta-data/type";
import type { NavItemType } from "@/components/common/sidebar/navigations/type";
interface Props {
    metaRoutes: RouteMetadataType[]
    navItems: NavItemType[]
}
export default function HeaderAdminManager(props: Props) {
    return <ContainerHeader metaRoutes={props.metaRoutes} navItems={props.navItems} />
}