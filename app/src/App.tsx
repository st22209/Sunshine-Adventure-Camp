import { Home, Create, View, Logs } from "./components";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

export const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/radio-in" element={<Create />}></Route>
					<Route path="/records" element={<View />}></Route>
					<Route path="/logs" element={<Logs />}></Route>
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
};

function App() {
	return (
		<div>
			<BrowserRouter>
				<AnimatedRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
