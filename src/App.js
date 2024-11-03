import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import ScreenLoader from "./component/screenLoader"


import Index from './pages/Routes';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {isApploading} =useAuthContext()
  return (<>
 {!isApploading?  <Index/>
 :<ScreenLoader/>
   
}
</>
  );
}

export default App;
