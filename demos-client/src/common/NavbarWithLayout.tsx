import { NavLink, Outlet } from 'react-router-dom';

export default function NavbarWithLayout() {
	return (
		<>
			<div className="row">
				<div className="col">
					<nav className="navbar navbar-expand-lg bg-light">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink
									to="/"
									className="nav-link"
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/demos"
									className="nav-link"
								>
									Demos/Experiments
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<Outlet />
		</>
	);
}
