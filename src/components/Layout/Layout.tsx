import * as React from 'react';
import styles from './Layout.module.css';
import Todo from '../ToDo/Todo';

const Layout: React.FC = () => {
    return <div className={styles.Layout}>
        <Todo />
    </div>
}

export default Layout;