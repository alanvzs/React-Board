import * as React from 'react';
import styles from './Board.module.scss';
import List from '../components/List/List';
import Button from '../components/Button/Button';

class Board extends React.Component {
	state = {};

	componentDidMount() {}

	render() {
		const { items, index, label, onButtonClick } = this.props;
		return (
			<div className={styles.main}>
				<List items={items} index={index} />
				<Button label={label} onClick={onButtonClick} />
			</div>
		);
	}
}

export default Board;
