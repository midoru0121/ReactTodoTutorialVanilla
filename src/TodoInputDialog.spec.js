import React from "react";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { TodoContextProvider } from "./TodoContext";
import { TodoInputDialog } from "./TodoInputDialog";

Enzyme.configure({ adapter: new Adapter() });

const mountTodoInputDialog = () =>
  mount(
    <TodoContextProvider>
      <TodoInputDialog />
    </TodoContextProvider>
  );

describe("<TodoInputDialog />", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("TodoInputDialogが正しくレンダリングされる。", () => {
    const wrapper = mountTodoInputDialog();
    wrapper.instance().toggleDialog();
    wrapper.instance().updateTitleInput("Hello");
    wrapper.update();
    expect(wrapper.find("input.spec-title-input").props().value).toBe("Hello");
  });

  it("Todoが正しく追加される。", () => {
    const wrapper = mountTodoInputDialog();
    wrapper.instance().toggleDialog();
    wrapper.instance().updateTitleInput("Hello");
    wrapper.update();
    const addButton = wrapper.find("button.spec-dialog-btn");
    addButton.simulate("click");
    expect(wrapper.state().todos.length).toBe(2);
  });
});
