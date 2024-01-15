import {
    ADMIN_ROUTE,
    BASKET_ROUTE, GAME_ROUTE,
    GAMES_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, OTHER_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    USERS_ROUTE
} from "./utils/consts";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import GamesConfig from "./pages/GamesConfig";
import Game from "./pages/Game";
import Basket from "./pages/Basket";
import Profile from "./pages/Profile";
import OtherConfig from "./pages/OtherConfig";


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GAME_ROUTE + "/:articul",
        Component: Game
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USERS_ROUTE,
        Component: Users
    },
    {
        path: GAMES_ROUTE,
        Component: GamesConfig
    },
    {
        path: OTHER_ROUTE,
        Component: OtherConfig
    }
]