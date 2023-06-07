import React, { SyntheticEvent, useState } from "react";
import * as s from "./Header.scss";

interface IProps {
	name: String;
	changeCity: (city: string) => void;
}

function Header({name, changeCity}: IProps) {
	const [inputVal, setInput] = useState<string | number | readonly string[]>('');

	const onChange = (val: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = val.target;
		
		if (typeof value === 'string')
			setInput(val.target.value);
	}

	const onClick = (e: SyntheticEvent) => {
		e.preventDefault();
		changeCity(inputVal as string);
		setInput("");
	}

	return(
		<div className={s.header}>
			<p className={s.city}>{name}</p>
			<form>
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
			</form>
		</div>
	)
}

export default Header;