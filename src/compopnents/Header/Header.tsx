import React, { SyntheticEvent, useState } from "react";
import { useMainStore } from "../../stores/MainContext";

import cn from "classnames";

import * as S from "./Header.scss";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";


function Header() {
	const mainStore = useMainStore();
	const [isMenuOpen, toggleMenu] = useState<Boolean>(false);	

	return(
		<>
			<div className={S.header}>
				<p className={S.city}>{mainStore.city}</p>
				
				<button className={S.menuBtn} onClick={() => toggleMenu(!isMenuOpen)}>Menu</button>
			</div>
			<div className={cn(S.modalMenu, isMenuOpen && S.menuOpened)}>
				<ul className={S.menuList}>
					<li onClick={() => toggleMenu(!isMenuOpen)}>
						<NavLink to="/search">Search</NavLink>
					</li>
					<li>Saved cities</li>
				</ul>
			</div>
		</>
	)
}

export default observer(Header);