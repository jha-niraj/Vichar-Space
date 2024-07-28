import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashbaord';
import Blog from './pages/Blog';
import Publish from './pages/Publish';

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/blog/:id" element={<Blog />} />
			<Route path="/publish" element={<Publish />} />
		</Routes>
	)
}

export default App;
