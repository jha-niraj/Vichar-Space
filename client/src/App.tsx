import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashbaord';
import Blog from './pages/Blog';
import Publish from './pages/Publish';
import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/Profile';
import { UserContextProvider } from './context/UserContext';

const App = () => {

	return (
		<UserContextProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<LandingPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="blog/:id" element={<Blog />} />
					<Route path="publish" element={<Publish />} />
					<Route path="profile" element={<ProfilePage />} />
					{/* <Route path="*" element={<PageNotFound />} /> */}
				</Route>
			</Routes>
		</UserContextProvider>
	)
}

export default App;
