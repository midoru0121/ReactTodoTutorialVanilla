import React from "react";
import ReactDOM from "react-dom";

// styled-componentsをimport
import styled, { createGlobalStyle } from "styled-components";

// アプリ全体のStateを管理するTodoContextをインポート
import { TodoContextProvider } from "./TodoContext";

// Todoを追加するためのダイアログコンポーネント
import { TodoInputDialog } from "./TodoInputDialog";

// Todoを表示するためのTODOリスト
import { TodoList } from "./TodoList";

// ダイアログ表示のためのボタン
import { AddTodoBtn } from "./AddTodoBtn";

// styled-componentsでスタイル付きのdiv要素をコンポーネントとして定義
const AppWrappper = styled.div`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  height: 100%;
  margin: 20px auto;
  max-width: 500px;
  padding: 20px 40px;
  position: relative;
  width: 100%;
`;

// styled-componentsでスタイル付きのh1要素をコンポーネントとして定義
const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weght: normal;
  color: #009688;
  margin-bottom: 32px;
`;

// styled-componentsでグローバルなに展開されるCSSを定義。
const GlobalStyle = createGlobalStyle`
  html,body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  main {
    display: block;
  }
`;

const App = props => (
  <AppWrappper>
    {/* styled-componentsでCSSをグローバルな名前空間に出力する。 */}
    <GlobalStyle />
    <header>
      <HeaderTitle>TodoApp</HeaderTitle>
    </header>
    <main>
      {/* 
        TodoContext.jsx内部で定義しているProviderで囲む。
        Providerで囲むことにより
        子孫コンポーネントで、
        Consumerを通じたデータの購読が可能となる。
       */}
      <TodoContextProvider>
        {/* ダイアログ表示用のボタン */}
        <AddTodoBtn />
        {/* Todo表示用のリスト */}
        <TodoList />
        {/* Todo入力用のダイアログ */}
        <TodoInputDialog />
      </TodoContextProvider>
    </main>
  </AppWrappper>
);

// idがrootである要素にReactアプリをマウントする。
ReactDOM.render(<App />, document.getElementById("root"));
