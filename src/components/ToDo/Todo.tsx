import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/reducers/reducer';
import styles from './Todo.module.css';
import { setList, setTitle } from '../../store/actions/actions';

interface List {
    id: string,
    value: string,
    isDone: boolean
}

const Todo: React.FC = () => {
    // const [title, setTitle] = useState('');
    // const [list, setList] = useState<List[]>([]);
    const [input, setInput] = useState('');

    const { title, list } = useSelector((state: IState) => {
        return {
            title: state.title,
            list: state.itemList
        }
    });

    const dispatch = useDispatch();

    
    

    const createId = useCallback(
        (length: number) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }, []
    )

    const submitHandlerCallback = useCallback(
        () => {
            if (input === '') {
                return;
            }
            const newList: List[] = [...list];
            const newItem: List = {
                id: createId(5),
                value: input,
                isDone: false
            }
            newList.push(newItem);
            // setList(newList);
            dispatch(setList(newList));
            setInput('');
        },
        [input, list, dispatch, setInput, createId]
    )

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                console.log('Enter Pressed');
                submitHandlerCallback();
            }
        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener('keydown', listener);
        }
    }, [submitHandlerCallback])


    const deleteItemHandler = (item: List) => {
        if (window.confirm('Are you sure you want to delete \'' + item.value + '\'?')) {
            const newList: List[] = list.filter(listItem => listItem.id !== item.id);

            // setList(newList);
            dispatch(setList(newList));
        }
    }

    const itemChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, item: List) => {
        const itemId: string = item.id;
        const newValue: string = event.target.value;

        const newList = list.map(listItem => {
            if (listItem.id === itemId) {
                listItem.value = newValue;
            }
            return listItem;
        });
        // setList(newList);
        dispatch(setList(newList));
    }

    const checkboxClickHandler = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
        const isChecked = event.currentTarget.checked;

        const newList = list.map(listItem => {
            if (listItem.id === itemId) {
                listItem.isDone = isChecked;
            }
            return listItem;
        });
        // setList(newList);
        dispatch(setList(newList));
    }

    const completedItemList = list.filter(item => item.isDone === true);
    const incompleteItemList = list.filter(item => item.isDone === false);
    return <>
        <div>
            <form>
                <input
                    className={styles.heading}
                    autoFocus
                    placeholder={'Title'}
                    value={title}
                    onChange={(event) => dispatch(setTitle(event.target.value))}
                />
                {
                    incompleteItemList.map(item => {
                        return (
                            <div className={styles.listItem} key={item.id}>
                                <input type="checkbox" id={item.id} onChange={(event) => checkboxClickHandler(event, item.id)} />
                                <label htmlFor={item.id}></label>
                                <input
                                    value={item.value}
                                    onChange={event => itemChangeHandler(event, item)}
                                    className={styles.listItemInput} />
                                <div className={styles.clearButton} onClick={() => deleteItemHandler(item)} >x</div>
                            </div>
                        )
                    })
                }

                <input
                    className={styles.itemInput}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={'+ Item'}
                />
            </form>
        </div>
        <div>
            {
                completedItemList.map(item => {
                    return (
                        <div className={styles.listItem} key={item.id}>
                            <input type="checkbox" id={item.id} checked={item.isDone} onChange={(event) => checkboxClickHandler(event, item.id)} />
                            <label htmlFor={item.id}></label>
                            <input
                                value={item.value}
                                onChange={event => itemChangeHandler(event, item)}
                                readOnly
                                className={styles.listItemInput + ' ' + styles.completedListItemInput} />
                            <div className={styles.clearButton} onClick={() => deleteItemHandler(item)} >x</div>
                        </div>
                    )
                })
            }
        </div>
    </>
}

export default Todo;