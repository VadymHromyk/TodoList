import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../../AppWithRedux'

let todoListId1: string
let todoListId2: string
let startState: Array<TodolistType>
let newTodolistTitle: string

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    newTodolistTitle = 'New Todolist';
    startState = [
        {todoListId: todoListId1, title: 'What to learn', filter: 'all'},
        {todoListId: todoListId2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todolist should be added', () => {

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todoListId).toBe(todoListId2);
});

test('correct todolist should change its name', () => {

    const endState = todoListsReducer(startState, changeTitleTodolistAC(todoListId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeFilterTodolistAC(todoListId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
