import React from "react";
import styled from "styled-components";

// TodoContextからTodoConSumerをインポート
import { TodoConsumer } from "./TodoContext";

const ListItemWrapper = styled.div`
  margin-bottom: 40px;
`;

const ListItem = styled.li`
  align-items: center;
  border: 1px solid #ccc;
  border-top: 0;
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 12px 24px;

  /* firstがtrueかfalseでスタイルを切り替える。 */
  ${props => (props.first ? "border-top: 1px solid #ccc;" : "")}
`;

const CloseIcon = props => (
  // https://github.com/google/material-design-icons/blob/master/LICENSE
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={props.onClick}
    className="spec-close-btn"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const isFirst = index => index === 0;

const ListItems = props => {
  /* 
    Stateに渡されたtodos (配列) をmap()でループさせて
    <ListItem>を複数レンダリングする。

    https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  */
  return props.todos.map((todo, index) => (
    /* React要素をmapでループさせるとき (Virtual DOM) 描画時の差分計算のためユニークなkeyを指定する */
    <ListItem key={todo.id} first={isFirst(index)} className="spec-list-item">
      {todo.title}
      <CloseIcon
        onClick={() => {
          // 指定したIDを持つTodoをTodoリストから削除する。
          props.deleteTodo(todo.id);
        }}
      />
    </ListItem>
  ));
};

export const TodoList = () => (
  /*TodoConsumerで囲むことで、TodoContextで定義しているStateを購読できる。 */
  <TodoConsumer>
    {val => (
      <ListItemWrapper>
        {/* valをpropsとしてそのままListItemsに渡す。 */}
        <ListItems {...val} />
      </ListItemWrapper>
    )}
  </TodoConsumer>
);
