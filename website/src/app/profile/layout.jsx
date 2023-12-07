import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import ProfileSidebar from "@/components/layouts/ProfileSidebar/ProfileSidebar";
import { Grid } from "@mui/material";

export const metadata = {
    title: "Thông tin người dùng",
    description: "Thông tin người dùng website 3000",
    icons: "/3000i_logo_transparent_100x100.png",
};

export default function ProfileLayout({ children }) {
    return (
        <Grid container className="appContainer__profile" columnSpacing={2}>
            <Grid item xs={12}>
                <Breadcrumb />
            </Grid>
            <Grid item xs={3}>
                <ProfileSidebar />
            </Grid>
            <Grid item xs={9}>
                {children}
            </Grid>
        </Grid>
    );
}
