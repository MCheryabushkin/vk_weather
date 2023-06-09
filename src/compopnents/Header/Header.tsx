import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import cn from "classnames";

import * as S from "./Header.scss";


function Header() {
	const [isMenuOpen, toggleMenu] = useState<Boolean>(false);
	const [location, setLocation] = useState<string>(window.location.pathname)
	useEffect(() => {
		setLocation(window.location.pathname);
	}, [window.location.pathname])

	return(
		<>
			<div className={S.header}>
				<p className={S.city}>{location === "/search" ? 'Search' : 'Home'}</p>
				
				<div className={S.menuBtn} onClick={() => toggleMenu(!isMenuOpen)}>
					<div className={cn(S.line, S.line1, isMenuOpen && S.lineCross)}></div>
					<div className={cn(S.line, S.line2, isMenuOpen && S.lineFadeOut)}></div>
					<div className={cn(S.line, S.line3, isMenuOpen && S.lineCross)}></div>
				</div>
			</div>
			<div className={cn(S.modalMenu, isMenuOpen && S.menuOpened)}>
				<ul className={S.menuList}>
					<li onClick={() => toggleMenu(!isMenuOpen)} className={S.link}>
						<NavLink to={location === "/search" ? '/' : '/search'} className={S.link}>
							{location === "/search" ? 'Home' : 'Search'}
						</NavLink>
					</li>
					<li>Saved cities</li>
				</ul>
			</div>
		</>
	)
}

export default Header;