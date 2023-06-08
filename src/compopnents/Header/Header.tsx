import React, { SyntheticEvent, useState } from "react";
import { useMainStore } from "../../stores/MainContext";

import cn from "classnames";

import * as S from "./Header.scss";

interface IProps {
	changeCity: (city: string) => void;
}


function Header({changeCity}: IProps) {
	// const [inputVal, setInput] = useState<string | number | readonly string[]>('');
	const mainStore = useMainStore();
	const [isMenuOpen, toggleMenu] = useState<Boolean>(false);

	// const onChange = (val: React.ChangeEvent<HTMLInputElement>) => {
	// 	const {value} = val.target;
		
	// 	if (typeof value === 'string')
	// 		setInput(val.target.value);
	// }

	// const onClick = (e: SyntheticEvent) => {
	// 	e.preventDefault();
	// 	changeCity(inputVal as string);
	// 	setInput("");
	// }

	return(
		<>
			<div className={S.header}>
				<p className={S.city}>{mainStore.city}</p>
				{/* <form>
					<input type="text" 
						onChange={onChange} 
						value={inputVal}
						placeholder="Find city"
						className={s.input} />
					<button 
						onClick={onClick}
						className={s.button} >
							<span>Find</span>
					</button>
				</form> */}
				<button className={S.menuBtn} onClick={() => toggleMenu(!isMenuOpen)}>Menu</button>
			</div>
			<div className={cn(S.modalMenu, isMenuOpen && S.menuOpened)}>
				<ul className={S.menuList}>
					<li>Search</li>
					<li>Saved cities</li>
				</ul>
			</div>
		</>
	)
}

export default Header;