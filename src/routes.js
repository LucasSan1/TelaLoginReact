import React, { useContext } from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login/login'
import Home from "./pages/home/home";
import Cadastro from './pages/cadastro/cadastro'
import { AuthProvider, AuthContext } from "./contexts/auth";

const AppRotas = () => {

    // Função para privar rotas (recebe children do contexto)
    const Private = ({children}) => {
        // Resgata authenticated e carregando do contexto
        const { authenticated, carregando } = useContext(AuthContext);

        // Verifica se as informações estão prontas para serem exibidas e se o usuario esta autenticado
        if(carregando) {
            return(<div className="carregando"><h2>Carregando....</h2></div>);
        }
        if(!authenticated) {
            return(
                <Navigate to="/login" />
            );
        }    
        return(children);
    };
   
    // Definição das rotas do app
    // Usa envolve a rota com a função private para que ela só seja acessada caso o usuario esteja autenticado
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Private> <Home /> </Private>} />
                    <Route exact path="/cadastro" element={ <Cadastro /> } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRotas;
