import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { TodoContextProvider } from "./TodoContext";

Enzyme.configure({ adapter: new Adapter() });

const mountTodoContextProvider = () => shallow(<TodoContextProvider />);

describe("<TodoInputDialog />", () => {
  it("初期Stateが正しい", () => {
    const wrapper = mountTodoContextProvider();
    const state = wrapper.state();

    // State
    expect(state.todoInputDialogShow).toBe(false);
    expect(state.todoTitleInput).toBe("");

    // Methods
    expect(typeof state.addTodo).toBe("function");
    expect(typeof state.deleteTodo).toBe("function");
    expect(typeof state.toggleDialog).toBe("function");
    expect(typeof state.updateTitleInput).toBe("function");
    wrapper.unmount();
  });

  it("Todoが正しく追加される", () => {
    const wrapper = mountTodoContextProvider();
    wrapper.instance().addTodo({ title: "MyTodo" });
    const state = wrapper.state();
    expect(state.todos[1].id).toBe(2);
    expect(state.todos[1].title).toBe("MyTodo");
    wrapper.unmount();
  });

  it("Todoが正しく削除される", () => {
    const wrapper = mountTodoContextProvider();
    const targetId = wrapper.state().todos[0].id;
    wrapper.instance().deleteTodo(targetId);
    expect(wrapper.state().todos.length).toBe(0);
    wrapper.unmount();
  });

  it("ダイアログの表示・非表示が正しく更新される", () => {
    const wrapper = mountTodoContextProvider();
    wrapper.instance().toggleDialog();
    expect(wrapper.state().todoInputDialogShow).toBe(true);
    wrapper.unmount();
  });

  it("Todoの追加テキストが正しく更新される", () => {
    const wrapper = mountTodoContextProvider();
    wrapper.instance().updateTitleInput("Hello");
    expect(wrapper.state().todoTitleInput).toBe("Hello");
    wrapper.unmount();
  });
});
