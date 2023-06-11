import {Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from './app/store'
import { Detail } from './pages/Detail/Detail'
import { Home } from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const user = useSelector((state: RootState) => state.data.user);

  return (
    <div className="w-full  justify-center flex text-white bg-no-repeat bg-cover bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230416/pngtree-game-space-blue-planet-image_2408931.jpg')] " >
      <Routes>
        <Route path='/' element={<Home />}  />
       {user.level && user.name ?  <Route path='/detail/:name/:id' element={<Detail />}  /> : <></> } 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
