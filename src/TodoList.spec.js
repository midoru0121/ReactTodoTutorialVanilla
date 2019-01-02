import React from "react";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { TodoContextProvider } from "./TodoContext";
import { TodoList } from "./TodoList";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.resetModules();
});

const mountTodoList = () =>
  mount(
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  );

describe("<TodoList />", () => {
  it("TodoListが正しくレンダリングされる。", () => {
    const wrapper = mountTodoList();

    expect(wrapper.state().todos.length).toBe(1);
    expect(wrapper.find("li.spec-list-item").length).toBe(1);
    expect(wrapper.text()).toBe("1st Todo");
  });

  it("TodoListが正しく更新される。", () => {
    const wrapper = mountTodoList();

    const closeButton = wrapper.find("svg.spec-close-btn");
    closeButton.simulate("click");
    expect(wrapper.state().todos.length).toBe(0);
    expect(wrapper.find("li.spec-list-item").length).toBe(0);
  });
});
