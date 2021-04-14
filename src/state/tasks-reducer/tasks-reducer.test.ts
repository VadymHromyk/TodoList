import {
    addTaskAC,
    removeTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../../AppWithRedux'
import {addTodolistAC, removeTodolistAC} from '../todolists-reducer/todolists-reducer';

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todoListId1': [
            {taskId: '1', title: 'CSS', isDone: false},
            {taskId: '2', title: 'JS', isDone: true},
            {taskId: '3', title: 'React', isDone: false}
        ],
        'todoListId2': [
            {taskId: '1', title: 'bread', isDone: false},
            {taskId: '2', title: 'milk', isDone: true},
            {taskId: '3', title: 'tea', isDone: false}
        ]
    };
})

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('todoListId1', 'Redux'))

    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId1'][2].title).toBe('React')
    expect(endState['todoListId1'][3].title).toBe('Redux')
    expect(endState['todoListId1'][3].isDone).toBe(false)
    expect(endState['todoListId1'][3].taskId).toBeDefined()
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todoListId2', '2'))

    expect(startState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'][0].title).toBe('bread')
    expect(endState['todoListId2'][1].title).toBe('tea')
})

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('todoListId1', '2', 'TypeScript'))

    expect(endState['todoListId1'].length).toBe(3)
    expect(startState['todoListId1'][1].title).toBe('JS')
    expect(endState['todoListId1'][1].title).toBe('TypeScript')
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todoListId1', '3', true))

    expect(endState["todolistId1"][2].isDone).toBeTruthy();
})

test('new property with new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC('What to play on PC'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('propertry with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC('todoListId1'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todoListId1']).toBeUndefined()
})