import { useState } from 'react'
import imageGame from './assets/game_image.png';
import './App-custom.css'
import TableGames from './pages/detail-positions';
import PageJudges from './pages/judges-index';
import PageGames from './pages/up-games';
import PageError from './pages/error404';
import CreateVoto from './pages/createVoto';
import ViewVoto from './pages/viewVoto';
import LoginJudge from './pages/login';
import Logout from './pages/logout';
import AllGames from './pages/viewAllGames';
import ViewGame from './pages/viewGame';
import FormVotarJuego from './pages/createFormGame';
import ViewVotoScore from './pages/viewVoteScore'
import RoutePrivate from './components/RoutePrivate';

import {createBrowserRouter, RouterProvider, Outlet, Link} from 'react-router-dom'

const Background = () =>{
  return(
  <div className='bg-logo'>
    <img src={imageGame} alt="imagen Game Jam" />
  </div>
)}

const Nav = () =>{
  const menuLinks = [
    {url:'/position',name:'Posiciones'},
    {url:'/all-games',name:'Ver todos los juegos'},
    {url:'/sumar-juego',name:'Sumá tu juego'},
    {url:'/judges',name:'Jueces'},
  ];

  return(

    <header>
      <div className='content-header'>
        <div>
        <Link to="/position">
          <img src={imageGame} alt="Game Jam Logo" />
        </Link>
        </div>
      <div>
        <nav className='nav-bar'>
          <div> 
            <ul className='items-menu'>
              {menuLinks.map((element, index)=>
              <li key={index}>
                <Link to={element.url}><span>{element.name}</span></Link>
              </li>)}
            </ul>
          </div>
        </nav>
      </div>
      </div>
    </header>
)}

function AppHome() {
  return (
  <div>
    <Nav />
    <Outlet />
  </div>
)}

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppHome />,
    errorElement: <PageError />,
    children:[
      {
        path:"sumar-juego",
        element: <PageGames />
      },
      {
        path: "position",
        element: <TableGames />
      },
      {
        path: "login",
        element: <LoginJudge />
      },
      {
        path:"all-games",
        element: <Outlet />,
        children:[
          {
            path: "",
            element: <AllGames />,
          },
          {
            path: ":idItem",
            element: <ViewGame />,
          }
        ]
      },
      {
        path:"judges",
        element: <RoutePrivate><Outlet /></RoutePrivate>,
        errorElement: <PageError />,
        children:[
          {
            path: "",
            element: <PageJudges />
          },
          {
            path: "logout",
            element: <Logout />
          },
          {
            path: "votar-juego",
            element: <CreateVoto />
          },
          {
            path: "votar-juego/:idGame",
            element: <FormVotarJuego />
          },
          {
            path: "mis-votos",
            element: <ViewVoto />
          },
          {
            path: "mis-votos/:idGameView",
            element: <ViewVotoScore />
          }
        ]
      }
    ]
  }
])

function App(){
  return(
  <div>
    <RouterProvider router={route} />
  </div>
)}

export{
  Background,
  Nav,
  AppHome,
  App
}

export default App
