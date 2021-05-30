
import './App.css';

import Login from './components/Login/Login'
import ArtistDesc from './components/ArtistDesc/ArtistDesc'
import Account from './components/Account/Account'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import BuyNow from './components/BuyNow/BuyNow'
import {LoginProvider} from './Context/LoginContext'
import {UserDetailsProvider} from './Context/UserDetailsContext'
import Payment from './components/Payment/Payment'
import Albums from './components/Albums/Albums'
import Charts from './components/Charts/Charts'
import SGDetails from './components/SGDetails/SGDetails'
function App() {
  return (
    
    <Router>
    <div className="App">
      {/* <Button className='btn btn-danger'>Test Button</Button>
       */}
     
      
       <Switch>
       <LoginProvider>
         <UserDetailsProvider>
        
       <Route path="/kpopMerch" exact component={Home}/>
       
       {/* <Route path="/kpopMerch" exact component={Parallax}/>  */}
         <Route path="/kpopMerch/Login" exact component={Login}></Route>
         <Route path="/kpopMerch/getArtistByName/:id"  component={ArtistDesc}/>
         <Route path="/kpopMerch/createAccount"  component={Account}/>
          <Route path="/kpopMerch/orderNow/:id"  component={BuyNow}/>
          <Route path="/kpopMerch/Payment/"  component={Payment}/>
          <Route path="/kpopMerch/Albums/"  component={Albums}/>
          <Route path="/kpopMerch/Charts/"  component={Charts}/>
          <Route path="/kpopMerch/SeasonGreeting/"  component={SGDetails}/>
          </UserDetailsProvider>
          </LoginProvider>
       </Switch>
  
    </div></Router>     
  );
}

export default App;


