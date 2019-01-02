import React from "react";

// 各TodoタスクのIDを定義。Todoを追加するごとにカウントがインクリメントされます。
let idCount = 1;

// React.creeateContexxtでコンテキストを作成
const TodoContext = React.createContext();

/* 
  ContextからConsumerを生成してエクスポート。
  このConsumerを介して、Providerの子孫コンポーネントでデータを購読する。
*/
export const TodoConsumer = TodoContext.Consumer;

/* 
  TodoContextProviderを定義する。
  このコンポーネントの子孫コンポーネントではTodoConsumerを介して
  データ (this.state) を購読することができる。
*/
export class TodoContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ◊alues */

      // todoタスク
      todos: [
        {
          id: idCount,
          title: "1st Todo"
        }
      ],

      // todo追加用のダイアログが表示されているかどうか
      todoInputDialogShow: false,

      // todo追加用のダイアログに入力されている文字列
      todoTitleInput: "",

      /* Methods */

      // todoの追加処理するメソッド
      addTodo: this.addTodo,

      // todoの削除処理するメソッド
      deleteTodo: this.deleteTodo,

      // ダイアログの表示を切り替えるメソッド
      toggleDialog: this.toggleDialog,

      // todo追加用ダイアログ内部のテキスト入力の値を更新するメソッド
      updateTitleInput: this.updateTitleInput
    };
  }

  // 自身のstateに新しいtodoを追加する。
  addTodo = ({ title }) => {
    // {...}はスプレッド構文
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: (idCount += 1),
          title
        }
      ]
    });
  };

  // idで指定したtodoをstateの中から削除する。
  deleteTodo = id => {
    // filterメソッドについてはこちら
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  // todo追加用のダイアログ表示を切り替える。
  toggleDialog = () => {
    this.setState({
      todoInputDialogShow: !this.state.todoInputDialogShow
    });
  };

  // todo追加用のダイアログ中の入力テキストを更新する。
  updateTitleInput = text => {
    this.setState({
      todoTitleInput: text
    });
  };

  render() {
    return (
      <TodoContext.Provider value={this.state}>
        {/* Contextから作成されたProviderのvalueに自身のstateをセットすることで、 */}
        {/* 子孫コンポーネントでstateを読めるようにする。 */}
        {/* this.props.childrenを返すことで、渡された子孫コンポーネントをレンダリング */}
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
