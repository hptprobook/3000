import ProfileSidebar from "@/components/layouts/ProfileSidebar/ProfileSidebar";
import { Grid } from "@mui/material";

export default function ProfileLayout({ children }) {
    return (
        <Grid container className="appContainer__profile">
            <Grid item xs={2.5}>
                <ProfileSidebar />
            </Grid>
            <Grid item xs={9.5}>
                {children}
            </Grid>
        </Grid>
    );
}
