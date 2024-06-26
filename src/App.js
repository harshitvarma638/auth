import './App.css';
import {React} from "react";
import {UserAuthContextProvider,useUserAuth} from "./context/UserAuthConfig";
import {Container,Row,Col} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GameRoom from './components/GameRoom';

const RenderGameRoom = () => {
    const {id} = useParams();
    const {color} = useParams();
    return <GameRoom roomId={id} PlayerColor={color}/>
}

function App() {
    const { user } = useUserAuth();
  return (
      <Router>
          <Container>
              <Row>
                  <Col> 
                      <UserAuthContextProvider>
                          <Routes>
                              <Route
                                  path="/home/*"
                                  element={
                                      <ProtectedRoute>
                                          <Home />
                                      </ProtectedRoute>
                                  }
                              />
                              <Route path = "game/:id/:color" element={user ? (<RenderGameRoom/>) : <Navigate to='/' replace/>}/>
                              <Route path="/" element={<Login />} />
                              <Route path="/signup" element={<Signup />} />
                          </Routes>
                      </UserAuthContextProvider>
                   </Col>
              </Row>
          </Container>
      </Router>
  );
}

export default App;
