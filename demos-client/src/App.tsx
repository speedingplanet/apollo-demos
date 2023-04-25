import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavbarWithLayout from './common/NavbarWithLayout';
import DemosManager from './demos/DemosManager';
import Home from './Home';

// Apollo Client
const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<main className="container">
			<header className="row">
				<div className="col">
					<h1>React Playground</h1>
					<hr />
				</div>
			</header>
			{/* Apollo Client's provider component */}
			<ApolloProvider client={client}>
				<Router>
					<Routes>
						<Route
							path="/"
							element={<NavbarWithLayout />}
						>
							<Route
								index
								element={<Home />}
							/>
							<Route
								path="demos/*"
								element={<DemosManager />}
							/>
						</Route>
					</Routes>
				</Router>
			</ApolloProvider>
		</main>
	);
}

export default App;
