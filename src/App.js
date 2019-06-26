import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		cities: {
			items: [],
			index: 0,
			input:''
		},
		drinks: {
			items: [],
			index: 0,
			input:''
		},
		friends: {
			items: [],
			index: 0,
			input:''
		}
		
	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (object) => {
		const nextState = produce(this.state, (draft) => {
			draft[object].items = draft[object].items.concat(draft[object].input);
			draft[object].records = draft[object].items.length;
			draft[object].input = '';
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (object) => {
		const nextState = produce(this.state, (draft) => {
			draft[object].items.splice(draft[object].input-1, 1);
		});
		this.setState(nextState);
	};

	onInputChange = (event,object) => {
		console.log('TCL: App -> onInputChange -> value', event.target.value);
		console.log('object',object);
		const nextState = produce(this.state, (draft) => {
			draft[object].input = event.target.value;
		});
		this.setState(nextState);
	};

	render() {
		const { cities, drinks, friends } = this.state;
		return (
			<div>
				<p className={styles.title}>¡Bienvenidos al curso de programación de cómputo móvil!</p>
				<div className={styles.container_boards}>
					<div className={styles.container_add}>
						<Input value={cities.input} onChange={(event) => this.onInputChange(event,'cities')} />
						<Button label={'Agregar'} onClick={(input) => this.onAddButtonClick('cities')} />
						<Button label={'Eliminar'} onClick={() => this.onRemoveButtonClick('cities')} />
						
					</div>

					<div className={styles.container_add}>
						<Input value={drinks.input} onChange={(event) => this.onInputChange(event,'drinks')} />
						<Button label={'Agregar'} onClick={() => this.onAddButtonClick('drinks')} />
						<Button label={'Eliminar'} onClick={() => this.onRemoveButtonClick('drinks')} />
						
					</div>

					<div className={styles.container_add}>
						<Input value={friends.input} onChange={(event) => this.onInputChange(event,'friends')} />
						<Button label={'Agregar'} onClick={() => this.onAddButtonClick('friends')} />
						<Button label={'Eliminar'} onClick={() => this.onRemoveButtonClick('friends')} />
						
					</div>
					<div className={styles.container_boards}>			
						<p><Board items={cities.items} index={cities.index} label={'Ciudades'} onButtonClick={() => this.onHandleButton('cities')} /></p>			
						<p><Board items={drinks.items} index={drinks.index} label={'Bebidas'} onButtonClick={() => this.onHandleButton('drinks')} /></p>						
						<p><Board items={friends.items} index={friends.index} label={'Amigos'} onButtonClick={() => this.onHandleButton('friends')} /></p>
					
					</div>
					
					
				</div>
				<div>
					<p>Ciudades:{cities.items.length}</p>
					<p>Bebidas:{drinks.items.length}</p>
					<p>Amigos:{friends.items.length}</p>
				</div>	
			</div>
		);
	}
}

export default App;
