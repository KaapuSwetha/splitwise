import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { WelcomePage } from "./WelcomePage";
import { TodoItemsPage } from "./TodoItemsPage";
import { AppProvider, useApp } from "./RealmApp";
import { AppName } from "./AppName";
import atlasConfig from "../atlasConfig.json";
import chatbackground from "./chatbackground1.jpg";
import "./App.css";
import ProfilePage from "./profileform";

import { MovieContextProvider } from "./Context";
const { appId } = atlasConfig;
/* The following line can be included in your src/index.js or App.js file */



export default function ProvidedApp() {
  return (
    <AppProvider appId={appId}>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </AppProvider>
  );
}


function App() {
  const { currentUser, logOut } = useApp();

  return (
    <div className="App" style={{ backgroundImage: `url(${chatbackground})` }}>
      {/* <AppBar position='sticky'>
        <Toolbar style={{ justifyContent: 'space-evenly' }}>
          <h3>SplitWise</h3>

          {console.log(currentUser, 'currentUser')}
          {currentUser ? (
            <>
              <h3>{currentUser?._profile?.data?.email}</h3>
              <Button
                variant='contained'
                color='secondary'
                onClick={async () => {
                  await logOut();
                }}
              >
                <Typography variant='button'>Log Out</Typography>
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar> */}
      {currentUser ? <ProfilePage /> : <WelcomePage />}
    </div>
  );
}
