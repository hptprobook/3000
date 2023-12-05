import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RouteChangeHandler = ({ children }) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const handleRouteChange = () => {
            setIsActive(true);
        };

        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, []);

    return children({ isActive });
};

export default RouteChangeHandler;
