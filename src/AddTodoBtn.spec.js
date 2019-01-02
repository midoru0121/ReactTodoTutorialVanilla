import React from "react";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { TodoContextProvider } from "./TodoContext";
import { AddTodoBtn } from "./AddTodoBtn";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.resetModules();
});

const mountAddTodoBtn = () =>
  mount(
    <TodoContextProvider>
      <AddTodoBtn />
    </TodoContextProvider>
  );

describe("<AddTodoBtn />", () => {
  it("AddTodoBtnが正常にレンダリングされる", () => {
    const wrapper = mountAddTodoBtn();
    expect(wrapper.find("button.spec-add-todo-btn").length).toBe(1);
  });

  it("AddTodoBtnクリック時にtodoInputDialogShowが切り替わる", () => {
    const wrapper = mountAddTodoBtn();
    const closeButton = wrapper.find("button.spec-add-todo-btn");
    closeButton.simulate("click");
    expect(wrapper.state().todoInputDialogShow).toBe(true);
    closeButton.simulate("click");
    expect(wrapper.state().todoInputDialogShow).toBe(false);
  });
});
